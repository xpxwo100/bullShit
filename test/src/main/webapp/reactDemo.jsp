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
    <title></title>
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
  	<div id="demo1">ppp</div>
 	 <div id="demo2">222</div>
 	  <div id="demo3">222</div>
 	   <div id="demo4">222</div>
 	    <div id="demo5">222</div>
 	     <div id="demo6">222</div>
 	      <div id="demo7">222</div>
  
    <%@include file="/templates/test_js.jsp"%>
    <script charset="utf-8" type="text/babel" src="test/reactDemo.js"></script> 
  </body>
</html>
