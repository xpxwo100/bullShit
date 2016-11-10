/**
 * 百度地图 api 功能整合
 * @author	Gloot
 * @email	glootz@gmail.com
 * @QQ		345268267
 * @blog	http://www.cnblogs.com/editor
 * @dependency :<link href="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.css" rel="stylesheet" type="text/css" />
 * <script type="text/javascript" src="http://api.map.baidu.com/api?v=1.2&services=true"></script>
 * <script type="text/javascript" src="http://api.map.baidu.com/library/DistanceTool/1.2/src/DistanceTool_min.js"></script>
 * <script type="text/javascript" src="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.js"></script>  
 * <script type="text/javascript" src="/devices/scripts/GeoUtils.js"></script>
 */
ZMap = {
	mapObj : null,
	mapId : '',
	opts: ''
};

ZMap.createMap = function(mapId, opts) {
	
	if (ZMap.mapObj) {
		ZMap.mapObj.clearOverlay();
	}
	
	ZMap.mapObj = new BMap.Map(mapId);
	ZMap.mapId = mapId;
	ZMap.opts = opts;
	//debugger;
	if (opts) {
		var level = opts.level || 15;
		if (opts.lng && opts.lat) {
			var point = new BMap.Point(opts.lng, opts.lat);
			ZMap.mapObj.centerAndZoom(point, level);
		} else if(opts.addr){
			ZMap.mapObj.centerAndZoom(opts.addr, level);
		} else {
			ZMap.mapObj.centerAndZoom('北京', 15);
		}
	}
	
	setTimeout(function() { //删除版权
		$('#'+mapId).find('.anchorBL').remove();
	}, 1000);
};

ZMap.enables = {
	scrollWheel: function() {
		ZMap.mapObj.enableScrollWheelZoom();
	}
};

ZMap.controls = {
	addNavi : function(opts) {
		ZMap.mapObj.addControl(new BMap.NavigationControl(opts));
	},
	addScale : function(opts) {
		ZMap.mapObj.addControl(new BMap.ScaleControl(opts));
	},
	addOverview : function(opts) {
		ZMap.mapObj.addControl(new BMap.OverviewMapControl(opts));
	},
	addMapType : function(opts) {
		ZMap.mapObj.addControl(new BMap.MapTypeControl(opts));
	},
	addGeolocation : function(opts) { //mobi
		try {
			ZMap.mapObj.addControl(new BMap.GeolocationControl(opts));
		}catch(e) {}
	}
};

ZMap.iconMarker = function(icon, point) {
	var micon = new BMap.Icon(icon.img, new BMap.Size(icon.width, icon.height));
	var marker = new BMap.Marker(point, {icon: micon});
	ZMap.mapObj.addOverlay(marker);
	return marker;
};

ZMap.labelMarker = function(msg, point) {
	var lbl = new BMap.Label(msg, {});
	var marker = new BMap.Marker(point);
	marker.setLabel(lbl);
	ZMap.mapObj.addOverlay(marker);
	return marker;
};

ZMap.marker = function(point) {
	var marker = new BMap.Marker(point, {});
	ZMap.mapObj.addOverlay(marker);
	return marker;
};

ZMap.markerCallback = function(point, callback) {
	var marker = ZMap.marker(point);
	ZMap.addListener(marker, 'click', callback);
};


ZMap.getMap = function() {
	return ZMap.mapObj;
};

ZMap.addListener = function(obj,type,callback) {
	obj.addEventListener(type, function(e) {
		callback(e);
	});
};

ZMap.msgAlert = function(opts, msg, pObj, point) {
	var infoWindow = new BMap.InfoWindow(msg, opts);
	pObj.openInfoWindow(infoWindow, point);
};

ZMap.setZoom = function(level) {
	ZMap.mapObj.setZoom(level);
};

ZMap.panTo = function(point) {
	ZMap.mapObj.panTo(point);
};

ZMap.init = function() {
	if (ZMap.mapObj) {
		ZMap.mapObj.clearOverlay();
	}
	
	var evts = ['click', 'dblclick', 'dragend'];
	
	for (itm in evts) {
		ZMap.mapObj.removeEventListener(evts[itm]);
	}
};

/**
 * 轨迹回放
 * @param opts
 * @returns {ZMap.GuiJiPlay}
 */
ZMap.GuiJiPlay = function(opts, flag) {
	if (flag) {
		ZMap.createMap(ZMap.mapId, ZMap.opts);
	}
	opts = opts || {};
	this.points = [];
	this.centerPoint = null;
	this.index = 0;
	this.timer = null;
	this.polyline = null;
	this.runlines = [];
	
	this.potlen = 0;
	this.marker = {
		marker : null,
		label: '',
		icon: {
			width: 50,
			height: 50
		}
	};
	
	if (opts.label && opts.label != '') {
		this.marker.label = opts.label;
	}
	
	if (opts.icon) {
		this.marker.icon = opts.icon;
	}
};

ZMap.GuiJiPlay.prototype.set = function(pointArr) {
	var me = this;
	
	for (itm in pointArr) {
		var one = pointArr[itm];
		var point = null;
		try {
			eval("point=new BMap.Point("+one+");");
		}catch(e) {}
		
		if (point) {
			me.points.push(point);
		}
	}
	
	me.potlen = me.points.length;
	
	me.init();
};

ZMap.GuiJiPlay.prototype.init = function() {
	var me = this;
	me.clear();
	
	me.centerPoint = new BMap.Point((me.points[0].lng + me.points[me.potlen - 1].lng) / 2, (me.points[0].lat + me.points[me.potlen - 1].lat) / 2);
	ZMap.mapObj.panTo(me.centerPoint);  
	
	me.polyline = new BMap.Polyline(me.points, {strokeColor: "blue", strokeWeight: 5, strokeOpacity: 1});
	ZMap.mapObj.addOverlay(me.polyline);  
	
	if (!me.marker.icon) {
		me.marker.marker = ZMap.iconMarker(me.marker.icon, me.points[0]);
	} else if (me.marker.label != '') {
		me.marker.marker = ZMap.labelMarker(me.marker.label, me.points[0]);
	} else {
		me.marker.marker = ZMap.marker(me.points[0]);
	}
	
};

ZMap.GuiJiPlay.prototype.reset = function() {
	var me = this;
	me.index = 0;
	if (me.marker.marker && me.points.length > 0) {
		me.marker.marker.setPosition(me.points[0]);  
	}
	
	if (me.timer) {
		window.clearTimeout(me.timer);  
	}
	me.timer = null;
};

ZMap.GuiJiPlay.prototype.clear = function() {
	var me = this;
	if (me.polyline) {
		ZMap.mapObj.removeOverlay(me.polyline);
	}

	for (itm in me.runlines) {
		var line = me.runlines[itm];
		ZMap.mapObj.removeOverlay(line);
	}
	me.polyline = null;
	me.runlines = [];
	me.reset();
};

ZMap.GuiJiPlay.prototype.play = function() {
	var me = this;
	var point = me.points[me.index];  
	
	if(me.index > 0) {  
		var cline = new BMap.Polyline([me.points[me.index - 1], point], {strokeColor: "red", strokeWeight: 1, strokeOpacity: 1});
        ZMap.mapObj.addOverlay(cline);  
        me.runlines.push(cline);
    }  
    
	me.marker.marker.setPosition(point);  
    me.index++;  
    if(true) {  
        ZMap.mapObj.panTo(point);  
    }  
    if(me.index < me.points.length) {  
        me.timer = window.setTimeout(function() {
        	me.play();
        }, 1000);  
    } else {
    	ZMap.mapObj.panTo(point);  
    }
};

/**
 * 圈画区域,并可编辑
 * @param flag
 * @returns {ZMap.lineArea}
 */
ZMap.lineArea = function(opts, flag) {
	if (flag) {
		ZMap.createMap(ZMap.mapId, ZMap.opts);
	}
	
	this.polygon = null;
	this.historys = [];
	this.callback = opts.callback || null;
	this.linecolor = opts.color || 'blue';
	this.init();
};

ZMap.lineArea.prototype.init = function() {
	var me = this;
	
	ZMap.mapObj.addEventListener('click', function(e) {
		if (me.polygon) {
			ZMap.mapObj.removeOverlay(me.polygon);
		}
		
		me.historys.push(e.point);
		var len = me.historys.length;
		if (len > 0) {
			me.polygon = new BMap.Polygon(me.historys, {strokeColor: me.linecolor, strokeWeight: 5, strokeOpacity: 0.5});
			
			ZMap.mapObj.addOverlay(me.polygon);
		}
		
		me.callback(me.historys, me.polygon);
	});
};

ZMap.lineArea.prototype.edit = function() {
	var me = this;
	me.polygon.enableEditing();
};

ZMap.lineArea.prototype.disable = function() {
	var me = this;
	me.polygon.disableEditing();
};


/**
 * 是否在圆圈范围内
 * @param flag
 * @param pointArr
 * @param opts
 * @returns {Array}
 */
ZMap.inCircleSearch = function(pointArr, opts, flag) {
	if (flag) {
		ZMap.createMap(ZMap.mapId, ZMap.opts);
	}
	
	if (!opts.distance) {
		opts.distance = 500;
	}
	
	var inCircles = [];
	var point = ZMap.mapObj.getCenter();
	
	for (itm in pointArr) {
		var one = pointArr[itm];
		var _point = null;
		try {
			eval("_point=new BMap.Point("+one+");");
		}catch(e) {}
		
		if (_point) {
			
			var distence = (ZMap.mapObj.getDistance(point,_point)).toFixed(2);
			
			var sign = 'No';
			if (distence <= opts.distance) {
				inCircles.push(_point);
				sign = 'Yes';
			}
			
			if (opts.callback) {
				opts.callback(sign, _point);
			} else {
				if (opts.markered) {
					ZMap.labelMarker(sign, _point);
				}
				
			}
		}
		
	}
	
	return inCircles;
};

/**
 * 定位城市
 * @param opts
 * @param flag
 */
ZMap.locaCity = function(opts, flag) {
	if (flag) {
		ZMap.createMap(ZMap.mapId, ZMap.opts);
	}
	
	if (!opts.city) {
		opts.city = '北京';
	}
	if (!opts.level) {
		opts.level = 12;
	}
	
	ZMap.mapObj.centerAndZoom(opts.city, opts.level);
};

/**
 * 生活服务查询
 * @param opts
 * @param flag
 * @returns {ZMap.liveSearch}
 */
ZMap.liveSearch = function(opts, flag) {
	if (flag) {
		ZMap.createMap(ZMap.mapId, ZMap.opts);
	}
	
	this.local = new BMap.LocalSearch(ZMap.mapObj, {renderOptions: {map: ZMap.mapObj, autoViewport: true}});
	this.callback = opts.callback;
	this.init();
};

ZMap.liveSearch.prototype.init = function(){
	var me = this;
	me.local.setSearchCompleteCallback(function(rs) {
    	if (me.local.getStatus() == BMAP_STATUS_SUCCESS) {
    		//var poi = rs.getPoi(0);
    		//var point = poi.point;
    		me.callback && me.callback(rs);
    	}
    });
};

ZMap.liveSearch.prototype.search = function(items) {//items 数组 ['酒店','银行'...]
	var me = this;
	var bo = ZMap.mapObj.getBounds();
	me.local.searchInBounds(items ,bo);
};

/**
 * 根据坐标返回地址信息;
 * @param opts
 * @param flag
 */
ZMap.pointToAdds = function(opts, flag) {
	if (flag) {
		ZMap.createMap(ZMap.mapId, ZMap.opts);
	}
	
	var gc = new BMap.Geocoder();
	
	ZMap.addListener(ZMap.mapObj, 'click', function(e) {
		
		if (e.overlay != null) {
    		return;
    	}
		
		var marker = ZMap.marker(e.point);
		marker.enableDragging();
		ZMap.addListener(marker, 'click', function(ep) {
			gc.getLocation(ep.point, function(rs){  
				opts.callback && opts.callback(ep.point, rs, marker);
			});
		});
		ZMap.addListener(marker, 'dragend', function(ep) {
			gc.getLocation(ep.point, function(rs){  
				opts.callback && opts.callback(ep.point, rs, marker);
			});
		});
		ZMap.addListener(marker, 'dblclick', function(ep) {
			ZMap.mapObj.removeOverlay(marker);
		});
	});
};

/**
 * 地图工具,测距,面积,打印
 */
ZMap.tools = {
	distance : {
		open : function() {
			if (!this.disTool) {
				this.disTool = new BMapLib.DistanceTool(ZMap.mapObj);
			}
			this.disTool.open();
		},
		close: function() {
			if (this.disTool) {
				this.disTool.close();
			}
		}
	},
	area : function(pointArr, flag) {
		if (flag) {
			ZMap.createMap(ZMap.mapId, ZMap.opts);
		}
		
		var historys = [];
		
		for (itm in pointArr) {
			var one = pointArr[itm];
			
			var _point = null;
			try {
				eval("_point=new BMap.Point("+one+")");
			}catch(e) {}
			
			if (_point) {
				historys.push(_point);
			}
		}
		
		
		var _polygon = new BMap.Polygon(historys, {strokeColor: "blue", strokeWeight: 5, strokeOpacity: 0.5});
		
		ZMap.mapObj.addOverlay(_polygon);
		
		ZMap.addListener(_polygon, 'click', function(e) {
			var resultArea = BMapLib.GeoUtils.getPolygonArea(_polygon);
			
			var result = "面积为: " + resultArea.toFixed(2) + "平方米";
			ZMap.msgAlert({width:200, height:150, title:'区域面积'},result, ZMap.mapObj, e.point);
		});
	},
	print : function(opts) {
		var pot = ZMap.mapObj.getCenter();
		var zoom = ZMap.mapObj.getZoom();
		
		opts.width = opts.width || 700;
		opts.height = opts.height || 600;
		
		window.open(opts.url + '?lng='+pot.lng+'&lat='+pot.lat+'&zoom='+zoom, '打印地图', "height="+opts.height+", width="+opts.width+", top=10, left=10,toolbar=yes, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no");
	},
	myTool : function(){
		alert('你好');
	}
};


/**
 * 地图全屏
 * @param opts
 * @returns {ZMap.fullMap}
 */
ZMap.fullMap = function(opts) {
	this.width = opts.width || 700;
	this.height = opts.height || 640;
	this.container = opts.container;
	this.mapId = opts.mapId;
	this.fullfunc = opts.fullfunc;
	this.origifunc = opts.origifunc;
};

ZMap.fullMap.prototype.toFull = function() {
	var me = this;
	var _width = $(window).width();
	var _height = $(window).height();
	var posi = $('#'+me.container).css('position');
	
	if (posi != 'absolute') {
		$('#'+me.container).css({
			position:'absolute',
			width: _width + 'px',
			height: _height + 'px'
		});
		
		$('#'+me.mapId).css('height', '100%');
		
		ZMap.mapObj.width = _width;
		ZMap.mapObj.height = _height;
		
		ZMap.mapObj.reset();
		
		me.fullfunc && me.fullfunc();
	}
};

ZMap.fullMap.prototype.toOrigi = function() {
	var me = this;
	var posi = $('#'+me.container).css('position');
	
	if (posi == 'absolute') {
		$('#'+me.container).css({
			position:'relative',
			width: me.width + 'px',
			height: me.height + 'px'
		});
		
		$('#'+me.mapId).css('height', me.height + 'px');
		
		ZMap.mapObj.width = me.width;
		ZMap.mapObj.height = me.height;
		
		ZMap.mapObj.reset();
		
		me.origifunc && me.origifunc();
	}
};

/**
 * 实时路况
 * @returns {ZMap.runtimeTraffic}
 */
ZMap.realtimeTraffic = function() {
	this.trafic = new BMapLib.TrafficControl({
		showPanel : true //true false 没啥区别
	});
	
	ZMap.mapObj.addControl(this.trafic); 
};

ZMap.realtimeTraffic.prototype.show = function() {
	var me = this;
	me.trafic.showTraffic();
};

ZMap.realtimeTraffic.prototype.hide = function() {
	var me = this;
	me.trafic.hideTraffic();
};

/**
 * 是否在 Polygon 区域内;
 */
ZMap.InPolygonMap = function(points) {
	this.historys = [];
	this.polygon = null;
	this.points = points;
	this.inarr = [];
	this.markers = [];
	this.chkIns = [];
	this.show = false;
	this.set();
};

ZMap.InPolygonMap.prototype.set = function(){
	var me = this;
	if (me.points && me.points.length > 0) {
		for (itm in me.points) {
			var one = me.points[itm];
			
			var _point = null;
			try {
				eval("_point=new BMap.Point("+one+")");
			}catch(e) {}
			
			if (_point) {
				me.historys.push(_point);
			}
		}
		
		
		me.polygon = new BMap.Polygon(me.historys, {strokeColor: "blue", strokeWeight: 5, strokeOpacity: 0.5}); 
		
		ZMap.mapObj.addOverlay(me.polygon);
	} else {
		ZMap.addListener(ZMap.mapObj, 'click', function(e) {
			me.crtGon(e.point);
			me.isIn(me.chkIns, me.show);
		});
	}
};

ZMap.InPolygonMap.prototype.crtGon = function(point) {
	var me = this;
	if (me.polygon) {
		ZMap.mapObj.removeOverlay(me.polygon);
	}
	
	me.historys.push(point);
	
	me.polygon = new BMap.Polygon(me.historys, {strokeColor: "blue", strokeWeight: 5, strokeOpacity: 0.5}); 
	
	ZMap.mapObj.addOverlay(me.polygon);
};

ZMap.InPolygonMap.prototype.reset = function(points) {
	var me = this;
	
	ZMap.mapObj.removeOverlay(me.polygon);
	me.historys = [];
	
	if (points instanceof Array && points.length > 0) {
		me.points = points;
	} else {
		me.points = [];
	}
	
	me.set();
};

ZMap.InPolygonMap.prototype.isIn = function(potarr, show) {
	var me = this;
	
	me.chkIns = potarr.slice(0);
	me.show = show;
	
	me.inarr = [];
	
	if (me.markers.length > 0) {
		for (itm in me.markers) {
			var mke = me.markers[itm];
			ZMap.mapObj.removeOverlay(mke);
		}
	}
	
	me.markers = [];
	
	for (itm in potarr) {
		var one = potarr[itm];
		
		var _point = null;
		try {
			eval("_point=new BMap.Point("+one+")");
		}catch(e) {}
		
		if (_point) {
			
			var nf = ZMap.isInsizePolygon(_point, me.historys);
			
			if (nf) {
				me.inarr.push(_point);
			}
			
			if (show) {
				var marker = ZMap.labelMarker((nf? 'In':'NotId'), _point);
				me.markers.push(marker);
			}
		}
	}
	
	return me.inarr;
};

ZMap.isInsizePolygon = function(point, gonPoints) {
	for (var c = false, i = -1, l = gonPoints.length, j = l - 1; ++i < l; j = i)   
        ((gonPoints[i].lat <= point.lat && point.lat < gonPoints[j].lat) || (gonPoints[j].lat <= point.lat && point.lat < gonPoints[i].lat)) &&  
        (point.lng < (gonPoints[j].lng - gonPoints[i].lng) * (point.lat - gonPoints[i].lat) / (gonPoints[j].lat - gonPoints[i].lat) + gonPoints[i].lng) &&  
        (c = !c);  
    return c;  
};

/***
 * 公交方案, 途经点
 * @returns {ZMap.crossPointTraffic}
 */
ZMap.crossPointTraffic = function(opts) {
	this.driving = new BMap.DrivingRoute(ZMap.mapObj, {renderOptions:{enableDragging: true,autoViewport: true}}); //renderOptions 下 map 会出现 起点,终点图标
	this.start = opts.start;
	this.end = opts.end;
	this.pass = opts.pass;
	this.icon = opts.icon;
	this.mkrType = opts.type || 'Label';
	this.polylines = [];
	
	this.init();
};

ZMap.crossPointTraffic.prototype.init = function() {
	var me = this;
	
	//me.reset();
	
	me.driving.setSearchCompleteCallback(function() {
		var pts = me.driving.getResults().getPlan(0).getRoute(0).getPath(); 
		var polyline = new BMap.Polyline(pts);       
		
		me.polylines.push(polyline);
		ZMap.mapObj.addOverlay(polyline);  
        
        if (me.start && me.end) {
        	me.mkrType == 'Label' ? ZMap.labelMarker(me.icon.start, pts[0]) : ZMap.iconMarker(me.icon.start, pts[0]);
        	me.mkrType == 'Label' ? ZMap.labelMarker(me.icon.end, pts[pts.length - 1]) : ZMap.iconMarker(me.icon.end, pts[pts.length - 1]);
        } else {
        	if (me.start) {
        		me.mkrType == 'Label' ? ZMap.labelMarker(me.icon.start, pts[0]) : ZMap.iconMarker(me.icon.start, pts[0]);
        		me.mkrType == 'Label' ? ZMap.labelMarker(me.icon.pass, pts[pts.length - 1]) : ZMap.iconMarker(me.icon.pass, pts[pts.length - 1]);
        	} else if (me.pass) {
        		me.mkrType == 'Label' ? ZMap.labelMarker(me.icon.pass, pts[pts.length - 1]) : ZMap.iconMarker(me.icon.pass, pts[pts.length - 1]);
        	} else {
        		me.mkrType == 'Label' ? ZMap.labelMarker(me.icon.end, pts[pts.length - 1]) : ZMap.iconMarker(me.icon.end, pts[pts.length - 1]);
        	}
        	
        }
	});
};

ZMap.crossPointTraffic.prototype.reset = function() {
	var me = this;
	if (me.polylines.length > 0) {
		for (itm in me.polylines){
			var line = me.polylines[itm];
			ZMap.mapObj.removeOverlay(line);
		}
		
		me.polylines = [];
	};
	me.start = false;
	me.pass = false;
	me.end = false;
};

ZMap.crossPointTraffic.prototype.search = function(start, end) {
	var me = this;
	me.driving.search(start, end);
};
/**
 * 自己的拓展（组合构造函数及原型模式）
 */
ZMap.extend = function(){
	this.mapObj = ZMap.mapObj;
    this.opts = ZMap.opts;
    this.mapId = ZMap.mapId;
    this.lessons = [];
}
ZMap.extend.prototype = {
	constructor :  ZMap.extend,
	getMapObj : function (){
		 return this.mapObj;
	},
	getMapId : function (){
		 return this.mapId;
	},
	getOpts : function (){
		 return this.opts;
	}
}