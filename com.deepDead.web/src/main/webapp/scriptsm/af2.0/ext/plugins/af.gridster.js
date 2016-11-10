/*
 *	���� ���񲼾� ,����jqmobi
 *	
 */

(
		function ($) {
			/*
			 *	Ĭ�ϲ���
			 */
			var defaultOpt =
			{
					/*
					 *	��࣬���ϣ��ң���
					 *	�󣺵�һ�и��Ӿ��븸�����Ŀ��
					 *	�ϣ���һ�и��Ӿ��븸�����Ŀ�ȸ߶�
					 *	�ң����Ӽ��ˮƽ���
					 *	�£����Ӽ�Ĵ�ֱ���
					 */
					margins: [10, 10, 10, 10],
					/*
					 *	���ӵĵ�λ���
					 *������ӿ��Ϊauto,�����colNm��margins�Զ�����
					 *������Ӹ߶�Ϊauto,��Ϊ���һ����ֵ
					 */
					sizes: ['auto', 'auto'],
					/*
					 *	ȱʡ��������������û���趨data-colʱ���������ڵ��б��������Զ�����data-col
					 */
					colNm: 3

			};
			/*
			 *��ȡ���ӵ�left
			 */
			var getLeft = function (col, opt) {
				if (col == 1) {
					return opt.margins[0] ;
				}


				return (opt.margins[0] + (col - 1) * (opt.margins[2] + opt.sizes[0]));
			};
			/*
			 *��ȡ���ӵ�top
			 */

			var getTop = function (row, opt) {
				if (row == 1) {
					return opt.margins[1] ;
				}
				return (opt.margins[1] + (row - 1) * (opt.margins[3] + opt.sizes[1]));

			};
			/*
			 *����width
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
			 *	��չһ��gridster�����������Զ����񲼾���Ҫ��
			 */
			$.fn['gridster'] = function (opt) {
				opt = opt || {};
				var options = extend(opt, defaultOpt
				);
				if (options.sizes[0] == 'auto') {
					//�Զ�������ӿ��
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
					 *	�������������ĸ߶ȣ�Ҫ��Ȼjq.scroller��������
					 */
					$(this.get(j)).css("position",'relative');
					$(this.get(j)).css("height",totallHeight+'px');
					
				}



			};
		}
)(jq);