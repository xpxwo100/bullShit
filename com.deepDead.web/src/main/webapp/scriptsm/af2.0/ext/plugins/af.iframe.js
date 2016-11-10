/*
 *基于jq.ui扩展iframe，实现超时设置，可终止加载页面等
 */
(function ($) {
	/*
	 * 默认参数
	 */
	var defaultOpt =
	{
			/*
			 * 超时时间，小于1将不做超时处理
			 */
			timeOut: 4000,
			/*
			 *	空白页，用来
			 */
			blankPage: "blank.html",
			/*
			 * 加载是的loading信息：请稍后……
			 */
			loadingText: "\u8BF7\u7A0D\u540E\u2026\u2026",
			/*
			 * iframe加载完成
			 */
			onLoad: function (uuid) {
			},
			/*
			 * iframe加载超时
			 */
			onTimeOut:function(uuid){}


	};

	$.fn.iframe = function (opts) {
		var tmp;
		for (var i = 0; i < this.length; i++) {
			tmp = new iframe(this[i], opts);
		}
		return this.length == 1 ? tmp : this;
	};
	var iframe = (function () {
		var iframe = function (containerEl, opts) {
			if (typeof containerEl === "string" || containerEl instanceof String) {
				this.dom = document.getElementById(containerEl);
			} else {
				this.dom = containerEl;
			}
			try {
				this.init(opts);
			} catch (e) {
				/*
				加载iframe组件失败
				*/
				console.log("\u52A0\u8F7Diframe\u7EC4\u4EF6\u5931\u8D25" + e);
			}
		};
		iframe.prototype =
		{
				opt: {},
				unid: null,
				timeOutId: -1,
				/*
				 *	处理iframe的load事件
				 */
				iframeLoad: function () {
					console.info("iframeLoad src:"+$(this.dom).attr('src'));
					if (this.timeOutId != -1) {
						clearTimeout(this.timeOutId);
					}
					if(this.opt.blankPage==$(this.dom).attr('src'))
					{
						return;
					}
					
					$(this.dom).css('background', 'rgb(255,255,255)');
					$(this.dom).show();
					if (this.opt.onLoad) {
						this.opt.onLoad(this.uuid);
					}
				},
				init: function (opts) {
					this.opt = jq.extend(defaultOpt, opts || {});
					var that = this;
					/*
					 *	注册iframe的load事件
					 */
					if (this.dom.attachEvent) {
						this.dom.attachEvent("onload", function (e) {
							that.iframeLoad();

						});
					} else {
						this.dom.onload = function (e) {
							that.iframeLoad();

						};
					}
				},
				/*
				 *	url:url
				 * timeOut:超时时间
				 * forceUpdate:是否强制更新,默认true
				 */
				load: function (url, timeOut,nocache) {

					this.stop();
					jq.ui.showMask(defaultOpt.loadingText);
					this.unid = jq.uuid();
					var that = this;
					if (this.opt.timeOut > 0) {
						this.timeOutId = setTimeout(function () {
							console.info('iframe load timeout');
							//超时
							//that.stop();
							that.reset();
							if (that.opt.onTimeOut) {
								that.opt.onTimeOut(that.uuid);
							}
						}, timeOut||this.opt.timeOut);
					}
					nocache=(nocache==undefined?true:nocache);
					if(nocache)
					{
						url=this.getRanUrl(url);
					}
					$(this.dom).attr('src', url);
					console.info("load:" + url);
					return this.uuid;
				},
				/*
				 *	停止加载
				 */
				stop: function () {
					if (this.timeOutId != -1) {
						clearTimeout(this.timeOutId);
					}
					/*以下停止iframe的代码会导致跨域错误
		        if (this.dom.contentWindow.stop != undefined) {
		            this.dom.contentWindow.stop();
		        } else {
		            this.dom.contentWindow.document.execCommand('Stop')
		        }
					 */
					$(this.dom).attr('src', this.opt.blankPage);
					console.info("iframe stop load");

					$(this.dom).hide();
				},
				/*
				 *	重置ifrmae
				 */
				reset: function () {
					this.stop();
					$(this.dom).hide();
					jq.ui.hideMask();
				},
				getRanUrl:function(url)
				{
					if(url.indexOf("?")>0)
					{
						return url+"&irandom=" + this.unid;
					}
					else
					{
						return url+"?irandom=" + this.unid;
					}
				}
		};
		return iframe;

	})();

})(jq);