/*
 *	处理 网格布局 ,基于jqmobi
 *	
 */

(
		function ($) {
			/*
			 *	默认参数
			 */
			var defaultOpt =
			{
					/*
					 *	间距，左，上，右，下
					 *	左：第一列格子距离父容器的宽度
					 *	上：第一行格子距离父容器的宽度高度
					 *	右：格子间的水平间距
					 *	下：格子间的垂直间距
					 */
					margins: [10, 10, 10, 10],
					/*
					 *	格子的单位宽高
					 *如果格子宽度为auto,则根据colNm和margins自动计算
					 *如果格子高度为auto,则为宽度一样的值
					 */
					sizes: ['auto', 'auto'],
					/*
					 *	缺省的列数，当格子没有设定data-col时，用其所在的列表索引来自动计算data-col
					 */
					colNm: 3

			};
			/*
			 *获取格子的left
			 */
			var getLeft = function (col, opt) {
				if (col == 1) {
					return opt.margins[0] ;
				}


				return (opt.margins[0] + (col - 1) * (opt.margins[2] + opt.sizes[0]));
			};
			/*
			 *获取格子的top
			 */

			var getTop = function (row, opt) {
				if (row == 1) {
					return opt.margins[1] ;
				}
				return (opt.margins[1] + (row - 1) * (opt.margins[3] + opt.sizes[1]));

			};
			/*
			 *计算width
			 */
			var getWidth = function (sizex, opt) {
				if (sizex == undefined) {
					sizex = 1;
				}
				return (sizex * opt.sizes[0] + (sizex - 1) * opt.margins[2]);
			}
			var getHeight = function (sizey, opt) {
				if (sizey == undefined) {
					sizey = 1;
				}
				return (sizey * opt.sizes[1] + (sizey - 1) * opt.margins[3]);
			}
			var extend = function (target, source) {

				for (var v in source) {
					if (target[v] == undefined) {
						target[v] = source[v];
					}
				}
				return target;
			};
			/*
			 *	扩展一个gridster方法，用于自动网格布局子要素
			 */
			$.fn['gridster'] = function (opt) {
				opt = opt || {};
				var options = extend(opt, defaultOpt
				);
				if (options.sizes[0] == 'auto') {
					//自动计算格子宽度
					var clientWidth = this.get(0).clientWidth || document.documentElement.clientWidth;
					options.sizes[0] = (clientWidth - 2 * options.margins[0] + options.margins[2]) / options.colNm - options.margins[2];
				}
				if (options.sizes[1] == 'auto') {
					options.sizes[1] = options.sizes[0];
				}
				for(var j=0;j<this.length;j++)
				{
					var c = this.get(j).children;
					var totallHeight = 0;
					for (var i = 0; i < c.length; i++) {
						var grid = $(c[i]);
						grid.css("position", "absolute");

						grid.css('width', getWidth(grid.data('sizex'), options)+'px');

						var h = getHeight(grid.data('sizey'), options);
						grid.css('height', h + 'px');

						grid.css('left', getLeft((grid.data('col') || (i) % options.colNm + 1), options)+'px');
						var top = getTop((grid.data('row') || parseInt((i) / options.colNm) + 1), options);
						grid.css('top', top + 'px');
						if (totallHeight < (top +h+ options.margins[3])) {
							totallHeight = top +h+ options.margins[3];
						}
					}
					/*
					 *	设置网管容器的高度，要不然jq.scroller不起作用
					 */
					$(this.get(j)).css("position",'relative');
					$(this.get(j)).css("height",totallHeight+'px');
					
				}



			};
		}
)(jq);