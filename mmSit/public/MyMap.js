$(document).ready(function() {
			defaultMap();

			$('#typeTbl').css({
						left : '60px',
						top : '100px',
						'border-collapse' : 'collapse',
						position : 'absolute',
						width : '130px',
						background : '#fff'
					}).find('tr td').css({
						'text-align' : 'center',
						height : '27px',
						'line-height' : '27px'
					}).click(function() {
						var cls = $.trim($(this).attr('func'));
						try {
							eval(cls + 'Map();');
						} catch (e) {
							$('#istmap').html('');
						}
					}).mousedown(function() {
						$('#typeTbl tr td').removeClass('tdback');
						$(this).addClass('tdback');
					});

			initbuttons();

		});

function initbuttons() {
	var _left = $('#typeTbl').css('left').replace('px', '');
	var _top = $('#typeTbl').css('top').replace('px', '');
	var _tdhgt = $('#typeTbl tr').find('td:eq(0)').height();
	_tdhgt = parseInt(_tdhgt) + 1;
	var _tblwidth = $('#typeTbl').width();
	// alert(_left+'-'+_top+'-'+_tdhgt+'-'+_tblwidth);
	// alert(_left+_tblwidth + 40);

	$('#playbtn').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15) + 'px',
				top : (parseInt(_top) + _tdhgt * 3 + 3) + 'px'
			}).click(function() {
				guiji.play();
			});

	$('#pausebtn').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15 + 60) + 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 3 + 3) + 'px'
			}).click(function() {
				if (guiji.timer) {
					window.clearTimeout(guiji.timer);
				}
			});

	$('#resetbtn').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15 + 60 + 60)
						+ 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 3 + 3) + 'px'
			}).click(function() {
				guiji.reset();
			});

	$('#gonEnable').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15) + 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 4 + 4) + 'px'
			}).click(function() {
				linearea.edit();

			});

	$('#gonDisable').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15 + 60) + 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 4 + 4) + 'px'
			}).click(function() {
				linearea.disable();
			});

	$('#quanzhou').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15) + 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 6 + 6) + 'px'
			}).click(function() {
				$('#spn').html('定位泉州');
				ZMap.locaCity({
							city : '泉州'
						});
			});

	$('#xiamen').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15 + 60) + 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 6 + 6) + 'px'
			}).click(function() {
				$('#spn').html('定位厦门');
				ZMap.locaCity({
							city : '厦门'
						});
			});

	$('#hotel').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15) + 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 7 + 7) + 'px'
			}).click(function() {
				$('#spn').html('查询酒店.....');
				livesearch.search(['酒店']);
			});

	$('#bank').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15 + 60) + 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 7 + 7) + 'px'
			}).click(function() {
				$('#spn').html('查询银行.....');
				livesearch.search(['银行']);
			});

	$('#ills').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15 + 60 + 60)
						+ 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 7 + 7) + 'px'
			}).click(function() {
				$('#spn').html('查询加油站.....');
				livesearch.search(['加油站']);
			});

	$('#distance').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15) + 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 10 + 10) + 'px'
			}).click(function() {
				ZMap.tools.distance.open();
			});

	$('#area').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15 + 60) + 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 10 + 10) + 'px'
			}).click(function() {

		var arrs = ['116.403722,39.915284', '116.40303,39.91482',
				'116.402455,39.915138', '116.402105,39.915464',
				'116.403308,39.915706', '116.405392,39.914654'];

		ZMap.tools.area(arrs);
	});

	$('#print').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15 + 60 + 60)
						+ 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 10 + 10) + 'px'
			}).click(function() {
				ZMap.tools.print({
							url : '/devices/print.do'
						});

			});

	$('#panel span').click(function() {
				fullmap.toOrigi();
			});

	$('#closeTrafic').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15) + 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 12 + 12) + 'px'
			}).click(function() {
				realtrafic.hide();
			});

	$('#openTrafic').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15 + 60) + 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 12 + 12) + 'px'
			}).click(function() {
				realtrafic.show();
			});
	$('#myTool').css({
				position : 'absolute',
				left : (parseInt(_left) + parseInt(_tblwidth) + 15 + 60) + 'px',
				top : (parseInt(_top) + parseInt(_tdhgt) * 12 + 12) + 'px'
			}).click(function(){
				//ZMap.tools.myTool();
				var z = new ZMap.extend();
				alert(z.getMapObj());
				alert(z.getMapId());
				alert(z.getOpts());
			});	
}
	
function defaultMap() {
	ZMap.createMap('istmap', {
				lng : 116.404,
				lat : 39.915,
				level : 15
			});
}

function Map() {
	$('#istmap').html('');
}

function scrollWheelMap() {
	ZMap.enables.scrollWheel();
}

function controlMap() {
	ZMap.controls.addNavi({});
	ZMap.controls.addScale({
				offset : new BMap.Size(0, 40)
			});
	ZMap.controls.addOverview({
				isOpen : true,
				offset : new BMap.Size(0, 40)
			});
	ZMap.controls.addMapType({});
}

function getPointMap() {
	ZMap.addListener(ZMap.mapObj, 'click', function(e) {
				$('#spn').html("");
				$('#spn').html(_ll + '-' + e.point.lng + ',' + e.point.lat);
			});
}

var guiji;
function guiJiMap() {
	guiji = new ZMap.GuiJiPlay({
				marker : {
					marker : null,
					label : '车'
				}
			});
	var pointsStr = '116.401072,39.913859-116.401242,39.913859-116.401431,39.913873-116.401844,39.913886-116.402257,39.9139-116.402608,39.9139-116.402994,39.913914-116.403416,39.913928-116.403784,39.913942-116.404135,39.913949-116.404557,39.913962-116.405015,39.913997-116.405455,39.914004-116.405815,39.914011-116.406228,39.914045-116.406587,39.914045-116.406955,39.914059-116.407719,39.914052-116.40886,39.914108-116.408788,39.914101-116.409192,39.914101-116.409462,39.914108-116.409848,39.914115-116.410297,39.914163-116.410953,39.914239';
	var arrs = pointsStr.split('-');
	guiji.set(arrs);
}

var linearea;
function lineAreaMap() {
	linearea = new ZMap.lineArea({
				color : 'red',
				callback : function(points, gon) {

				}
			});
}

function circleSearchMap() {
	var cars = ['116.40329,39.915851', '116.403757,39.915816',
			'116.403722,39.915284', '116.40303,39.91482',
			'116.402455,39.915138', '116.402105,39.915464',
			'116.403308,39.915706', '116.405392,39.914654'];

	ZMap.getMap().setZoom(18);
	ZMap.inCircleSearch(cars, {
				distance : 100,
				markered : true
			});
}

function toCityMap() {

}

var livesearch;
function liveSearchMap() {
	livesearch = new ZMap.liveSearch({
				callback : function(rs) {
					$('#spn').html('查询完毕');
				}
			});
}

function markerLocaMap() {
	var car = "京A 88888";
	var point = new BMap.Point(116.410297, 39.914163);
	var marker = ZMap.labelMarker(car, point);

	ZMap.addListener(marker, 'click', function(e) {
				var opts = {
					width : 200,
					height : 150,
					title : '显示标注'
				};
				var msg = "京A 88888: 位置:" + e.point.lng;
				ZMap.msgAlert(opts, msg, marker, e.point);
			});
}

function pointAddrMap() {
	ZMap.pointToAdds({
				callback : function(point, rs, marker) {
					showLocationInfo(point, rs, marker);
				}
			});
}

function showLocationInfo(pt, rs, marker) {
	var opts = {
		width : 250, // 信息窗口宽度
		height : 150, // 信息窗口高度
		title : "当前位置" // 信息窗口标题
	};

	var addComp = rs.addressComponents;
	var addr = "当前位置：" + addComp.province + ", " + addComp.city + ", "
			+ addComp.district + ", " + addComp.street + ", "
			+ addComp.streetNumber + "<br/>";
	addr += "纬度: " + pt.lat + ", " + "经度：" + pt.lng;

	var infoWindow = new BMap.InfoWindow(addr, opts); // 创建信息窗口对象
	marker.openInfoWindow(infoWindow);
}

function mapToolsMap() {

}

var fullmap;
function fullMap() {
	fullmap = new ZMap.fullMap({
				container : 'container',
				mapId : 'istmap',
				fullfunc : function() {
					$('#panel').css('display', 'block');
				},
				origifunc : function() {
					$('#panel').css('display', 'none');
				}
			});

	fullmap.toFull();
}

var realtrafic;
function realTrafficMap() {
	realtrafic = new ZMap.realtimeTraffic();
	realtrafic.show();
}

function trafPanelMap() {
	var point = new BMap.Point(116.403326, 39.915374);
	ZMap.iconMarker({
				width : 403,
				height : 300,
				img : '/devices/images/youdaoping.jpg'
			}, point);
	ZMap.panTo(point);
}

var inpolygon;
function InPolygonMap() {
	var arrs = ['116.403722,39.915284', '116.40303,39.91482',
			'116.402455,39.915138', '116.402105,39.915464',
			'116.403308,39.915706', '116.405392,39.914654'];

	inpolygon = new ZMap.InPolygonMap({});
	var chkIn = ['116.402455,39.915138', '116.402105,39.915464'];

	inpolygon.isIn(chkIn, true);

	ZMap.setZoom(18);
}

function crossPointMap() {
	var addrs = ["天安门", "三里屯", "百度大厦"];

	var drlen = addrs.length;
	for (var i = 0; i < drlen; i++) {
		if (i == 0) {
			continue;
		}

		var opts = {};
		if (drlen == 2) {
			opts.start = true;
			opts.end = true;
		} else {
			if ((i - 1) == 0) {
				opts.start = true;
			} else if (i == (drlen - 1)) {
				opts.end = true;
			} else {
				opts.pass = true;
			}
		}

		opts.icon = {};
		opts.icon.start = '起点';
		opts.icon.end = '终点';
		opts.icon.pass = '途经点';

		var drive = new ZMap.crossPointTraffic(opts);
		drive.search(addrs[i - 1], addrs[i]);

		ZMap.enables.scrollWheel();
	}
}
