<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
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
  </head>
  <body>
  <div id="xpx">ppp</div>
    This is my JSP page. <br>
    
  <%--   <c:forEach var ="i" items="${data}">
    <c:out value="${i}"></c:out>
    </c:forEach> --%>
    ${data}
    ${sessionScope.user}
 <div ng-app="myApp" ng-controller="personCtrl">

	<button ng-click="toggle()">隐藏/显示</button>

	<p ng-show="myVar">
		名: <input type="text" ng-model="firstName"><br>
		姓: <input type="text" ng-model="lastName"><br>
	<br>
	姓名: {{firstName + " " + lastName}}
	</p>

</div>

    <%@include file="/templates/test_js.jsp"%>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=1.2&services=true"></script>
	<script type="text/javascript" src="http://api.map.baidu.com/library/DistanceTool/1.2/src/DistanceTool_min.js"></script>
	<script type="text/javascript" src="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.js"></script>  
    <script charset="utf-8" type="text/javascript" src="test/test.js"></script> 
    <script charset="utf-8" type="text/javascript" src="test/MyMap.js"></script> 
  </body>
</html>
