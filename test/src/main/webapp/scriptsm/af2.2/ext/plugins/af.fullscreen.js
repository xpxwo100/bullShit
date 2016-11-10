/**
 * 全屏处理,基于jq \jq.css3animate
 * 
 */
(function ($) {

	/*
	 *	默认参数
	 */
	var defaultOpt =
	{
			/*
			 *	是否有效
			 */
			enable: false,
			/*
			 *	是否显示底部栏
			 */
			showbottom: false,
			/*
			 *	是否显示头部标题栏
			 */
			showtop: true
	};
	/*
	 *	停止事件冒泡
	 *	allowDefault:是否允许执行默认的事件行为，如text selection,
	 *     radio-button clicking
	 */
	var stopEvent = function (event, allowDefault) {

		if (!allowDefault) {
			if (event.preventDefault) {
				event.preventDefault();                
			} else {
				event.returnValue = false;
			}
		}

		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	};
	$.fn["fullscreen"] = function (opts) {
		var tmp;
		for (var i = 0; i < this.length; i++) {
			tmp = new fullscreen(this[i], opts);
		}
		return this.length == 1 ? tmp : this;
	};
	var fullscreen = (function () {
		var fullscreen = function (containerEl, opts) {
			if (typeof containerEl === "string" || containerEl instanceof String) {
				this.container = document.getElementById(containerEl);
			} else {
				this.container = containerEl;
			}

			try {

				this.init(opts);
			} catch (e) {
				console.log("加载fullscreen组件失败 " + e);
			}
		};
		fullscreen.prototype =
		{
				
				/*
				 * 动画时间
				 */
				antime:'500ms',
				/*
				 *	是否有效
				 */
				enable: false,
				/*
				 *	是否显示底部栏
				 */
				showbottom: false,
				/*
				 *	是否显示头部标题栏
				 */
				showtop: true,
				topEm: null,
				bottomEm: null,
				button: null,
				fullState: false,
				/*
				 * 延时全屏的timeoutId
				 */
				_delayFullId:-1,

				/*
				 *	初始化
				 */
				init: function (_opts) {
					var that = this;
					_opts = _opts || {};
					this.enable = _opts.enable != undefined ? _opts.enable : defaultOpt.enable;
					this.showbottom = _opts.showbottom != undefined ? _opts.showbottom : defaultOpt.showbottom;
					this.showtop = _opts.showtop != undefined ? _opts.showtop : defaultOpt.showtop;

					this.topEm = $(this.container).find('.fullscreen_top');
					this.topEm.get(0).parentElement.removeChild(this.topEm.get(0));
					document.body.appendChild(this.topEm.get(0));
					this.topEm = $(this.topEm);
					this.topEm.bind('click', function (e) {
						that.topEm_click(e);
					});
					this.bottomEm = $(this.container).find('.fullscreen_bottom');
					this.bottomEm.get(0).parentElement.removeChild(this.bottomEm.get(0));
					document.body.appendChild(this.bottomEm.get(0));
					this.bottomEm = $(this.bottomEm);
					this.bottomEm.bind('click', function (e) {
						that.bottomEm_click(e);
					});

					this.button = $(this.container).find('.fullscreen_btn');
					this.button.get(0).parentElement.removeChild(this.button.get(0));
					document.body.appendChild(this.button.get(0));
					this.button = $(this.button);

					if (this.showtop) {
						this.topEm.show();
					} else {
						this.topEm.height();
					}
					if (this.showbottom) {
						this.bottomEm.show();
					} else {
						this.bottomEm.height();
					}

					//绑定事件
					this.button.bind('click', function (e) {
						//console.info("full_click"+new Date());
						return that.btn_click(e);
					});
					var touchend_full=new Date();
					this.button.bind('touchend', function (e) {
						//console.info("full_touchend"+(new Date()));
						touchend_full=new Date();
						return that.btn_click(e);
					});
					this.container = $(this.container);

					this.container.bind('click', function (e) {
						if((new Date()-touchend_full)<500)
						{
							/*
	        		解决android 4.11 点击全屏按钮后马上会触发该事件 照成退出全屏又马上被切换到非全屏的问题
							 */
							return;
						}
						return that.body_click(e);
					});
					this.container.bind('touchstart',function(e){
						//console.info("body_touchstart"+(new Date()-touchend_full));
						if((new Date()-touchend_full)<500)
						{
							/*
		        		解决android 4.11 点击全屏按钮后马上会触发该事件 照成退出全屏又马上被切换到非全屏的问题
							 */
							return;
						}
						return that.body_click(e);
					});

					//设置为全屏状态
					this.full(true);
					if (this.enable) {
						this.show();
					} else {
						this.hide();
					}

				},
				/*
		    状态控制逻辑
				 */
				/*
				 *	显示
				 *unfull:是否设置为非全屏状态
				 */
				show: function (unfull) {
					unfull=(unfull==undefined?true:unfull);
					this.enable = true;
					if (this.showbottom) {
						this.bottomEm.show();

					}
					if (this.showtop) {
						this.topEm.show();
					}
					
					if(unfull)
					{
						this.unfull(true);
					}else
					{
						this.full(true);
					}

					console.info("show");

				},
				/*
		    隐藏
				 */
				hide: function () {
					clearTimeout(this._delayFullId);
					this.enable = false;
					$(this.container).hide();
					this.button.hide();
					this.topEm.hide();
					this.bottomEm.hide();
					console.info('hide');

				},
				/*
				 *	全屏
				 *	animate:是否动画效果
				 ** delay:延迟全屏的毫秒数，不设置不延时
				 */
				full: function (animate,delay) {
					if (this.fullState||!this.enable) {
						return;
					}
					delay=delay||0;
					clearTimeout(this._delayFullId);
					/*
					 * 延时执行
					 */
					var that=this;
					this._delayFullId=setTimeout(function(){

						if (that.fullState||!that.enable) {
							return;
						}
						that.fullState = true;

						//按钮显示
						that.button.show();
						that.container.hide();
						if (!animate) {
							that.topEm.hide();
							that.bottomEm.hide();
						}
						else {
							//用动画隐藏
							that.topToHideAni();
							that.bottomToHideAni();

						}
						console.info('full '+animate);
					},delay);
				},
				/*
				 *	退出全屏
				 *	animate:是否动画效果

				 */
				unfull: function (animate,delay) {
					if (!this.fullState||!this.enable) {
						return;
					}
					clearTimeout(this._delayFullId);									

					this.fullState = false;
					this.button.hide();
					this.container.show();
					if (!animate) {
						if (this.showbottom) {
							try{
								jq.ui.clearAnimations(this.bottomEm);

							}catch(e){}
							this.bottomEm.show();
						}
						if (this.showtop) {
							try{
								jq.ui.clearAnimations(this.topEm);
							}catch(e){}
							this.topEm.show();
						}
					} else {
						if (this.showbottom) {
							//动画显示
							this.bottomToShowAni();
						}
						if (this.showtop) {
							//动画显示
							this.topToShowAni();
						}
					}
					console.info('unfull '+animate);
				},
				//---------------动画部分
				topToShowAni: function () {

					this.topEm.show();
					var opt = { y: 0 + 'px', time: this.antime };
					jq.ui.css3animate(this.topEm, opt);


				},
				topToHideAni: function () {
					var that = this;
					var opt = { y: -this.topEm.height() + 'px', time: this.antime };
					this.topEm.show();
					jq.ui.css3animate(this.topEm, opt);

				},
				bottomToShowAni: function () {

					this.bottomEm.show();

				},
				bottomToHideAni: function () {
					this.bottomEm.hide();
				},
				//---------------事件逻辑
				btn_click: function (e) {
					stopEvent(e);

					this.unfull(true);

				},
				body_click: function (e) {
					// stopEvent(e);

					if (this.enable) {
						this.full(true);
					}
					return true;

				},
				topEm_click: function (e) {
					stopEvent(e);
					this.full(true);
				},
				bottomEm: function (e) {
					stopEvent(e);
					this.full(true);

				}

		};
		return fullscreen;
	})();
}
)(jq);