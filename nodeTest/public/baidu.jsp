<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

<title>My JSP 'test.jsp' starting page</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link
	href="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.css"
	rel="stylesheet" type="text/css" />
</head>
<body>
	<div id="container"
		style="margin:0px auto; width:700px; height:600px; padding-bottom: -40px; overflow: hidden;">
		<div id="panel"
			style="height:30px; width:100%; display:none; background: #6485ed;">
			<span>X</span>
		</div>
		<div id="istmap" style="width:100%; height:640px;"></div>
	</div>
	<div id="infoDiv" style="margin:0px auto; width:700px; height:600px; ">
		<span id="spn"></span>
	</div>

	<table id="typeTbl" style=" " border="1" rules="all" cellpadding="0"
		cellspacing="0">
		<tr>
			<td func="default" class='tdback'>默认地图</td>
		</tr>
		<tr>
			<td func='scrollWheel'>放大缩小</td>
		</tr>
		<tr>
			<td func='getPoint'>点击获坐标</td>
		</tr>
		<tr>
			<td func='guiJi'>轨迹回放</td>
		</tr>
		<tr>
			<td func='lineArea'>圈画区域</td>
		</tr>
		<tr>
			<td func='circleSearch'>中心点范围搜索</td>
		</tr>
		<tr>
			<td func='toCity'>定位城市</td>
		</tr>
		<tr>
			<td func='liveSearch'>生活服务搜索</td>
		</tr>
		<tr>
			<td func='markerLoca'>标注定位</td>
		</tr>
		<tr>
			<td func='pointAddr'>经纬度获取地址</td>
		</tr>
		<tr>
			<td func='mapTools'>地图工具</td>
		</tr>
		<tr>
			<td func='full'>地图全屏</td>
		</tr>
		<tr>
			<td func='realTraffic'>实时路况</td>
		</tr>
		<tr>
			<td func='trafPanel'>诱导屏</td>
		</tr>
		<tr>
			<td func='InPolygon'>是否在区域内</td>
		</tr>
		<tr>
			<td func='crossPoint'>经过点公交线</td>
		</tr>
		<tr>
			<td func='control'>地图控件</td>
		</tr>
	</table>

	<div id="buttons" style="position:absolute; top:0px; left:0px; ">
		<button id="playbtn">播放</button>
		<button id="pausebtn">暂停</button>
		<button id="resetbtn">重置</button>

		<button id="gonEnable">编辑</button>
		<button id="gonDisable">禁止</button>

		<button id="quanzhou">泉州</button>
		<button id="xiamen">厦门</button>

		<button id="hotel">酒店</button>
		<button id="bank">银行</button>
		<button id="ills">加油站</button>

		<button id="distance">测距</button>
		<button id="area">面积</button>
		<button id="print">打印</button>

		<button id="closeTrafic">关闭</button>
		<button id="openTrafic">开启</button>
		<button id="myTool">打招呼</button>
		<!-- 路况 -->
	</div>




  	<script charset="utf-8" type="text/javascript" src="jspub/jquery/1.11.3/jquery-1.11.3.min.js"></script>
	<script charset="utf-8" type="text/javascript" src="scriptsm/wind/wind-all-0.7.3.js"></script>
	<script charset="utf-8" type="text/javascript" src="jspub/lodash/lodash.compat.min.js"></script>
	<script charset="utf-8" type="text/javascript" src="jspub/handlebars/handlebars-v4.0.2.js"></script>
	<script charset="utf-8" type="text/javascript" src="jspub/dhxsin/4.5/dhtmlx-editor.js"></script>
	<script charset="utf-8" type="text/javascript" src="scriptsm/bootstrap/3.3.5/js/bootstrap.js"></script>
	<script charset="utf-8" type="text/javascript" src="scriptsm/angular/angular.min.js"></script>
	<script charset="utf-8" type="text/javascript" src="jspub/GisMap/GeoUtils.js"></script>
	<script charset="utf-8" type="text/javascript" src="jspub/GisMap/ZMap.js"></script>
	<script charset="utf-8" type="text/javascript" src="jspub/react/react.js"></script>
	<script charset="utf-8" type="text/javascript" src="jspub/react/react-dom.js"></script>
	<script charset="utf-8" type="text/javascript" src="jspub/react/browser.min.js"></script>
	<script type="text/javascript"
		src="http://api.map.baidu.com/api?v=1.2&services=true"></script>
	<script type="text/javascript"
		src="http://api.map.baidu.com/library/DistanceTool/1.2/src/DistanceTool_min.js"></script>
	<script type="text/javascript"
		src="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.js"></script>
	<script charset="utf-8" type="text/javascript" src="MyMap.js"></script>
</body>
</html>
