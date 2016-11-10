<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

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





	<%@include file="/templates/test_js.jsp"%>
	<script type="text/javascript"
		src="http://api.map.baidu.com/api?v=1.2&services=true"></script>
	<script type="text/javascript"
		src="http://api.map.baidu.com/library/DistanceTool/1.2/src/DistanceTool_min.js"></script>
	<script type="text/javascript"
		src="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.js"></script>
	<script charset="utf-8" type="text/javascript" src="test/test.js"></script>
	<script charset="utf-8" type="text/javascript" src="test/MyMap.js"></script>
</body>
</html>
