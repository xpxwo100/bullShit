﻿<%@ page isELIgnored="false"  language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<base href="<%=basePath %>">

	<script type="text/javascript" src="${staticUrl}/extjs/extend/shared/include-ext.js"></script>
<!-- Grid过滤样式 -->
<link rel="stylesheet" type="text/css" href="${staticUrl}/extjs/extend/ux/grid/css/GridFilters.css" />
<link rel="stylesheet" type="text/css" href="${staticUrl}/extjs/extend/ux/grid/css/RangeMenu.css" />
<link rel="stylesheet" type="text/css" href="${staticUrl}/extjs/extend/shared/example.css" />
<link rel="stylesheet" type="text/css" href="jspub/myflow-min/lib/jquery-ui-1.8.4.custom/css/smoothness/jquery-ui-1.8.4.custom.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="jspub/myflow-min/css/app.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="css/scm/wrokFlowEdit.css" rel="stylesheet" />
</head>
<body class="mybody">

<div id="myflow_tools"
	style="position: absolute; top: 10; left: 10; background-color: #fff; width: 80px; cursor: default; padding: 3px;"
	class="ui-widget-content">
<div id="myflow_tools_handle" style="text-align: center;"
	class="ui-widget-header">工具集</div>

	<div class="node" id="myflow_save"><img src="jspub/myflow-min/img/save.gif" />&nbsp;&nbsp;保存</div>
	<div><hr /></div>
	
	<div class="node selectable" id="pointer">
		<img src="jspub/myflow-min/img/select16.gif" />&nbsp;&nbsp;选择</div>
	<div class="node selectable" id="path">
		<img src="jspub/myflow-min/img/16/flow_sequence.png" />&nbsp;&nbsp;流转</div>
	<div><hr /></div>
	
	<div class="node state" id="start" type="start">
		<img src="jspub/myflow-min/img/16/start_event_empty.png" />&nbsp;&nbsp;开始</div>
	<div class="node state" id="end" type="end">
		<img src="jspub/myflow-min/img/16/end_event_terminate.png" />&nbsp;&nbsp;结束</div>
	<div class="node state" id="task" type="task">
		<img src="jspub/myflow-min/img/16/task_empty.png" />&nbsp;&nbsp;审批任务</div>
	<div class="node state" id="firstTask" type="firstTask">
		<img src="jspub/myflow-min/img/16/task_empty.png" />&nbsp;&nbsp;起草节点</div>
	<div class="node state" id="acTask" type="acTask">
		<img src="jspub/myflow-min/img/16/task_empty.png" />&nbsp;&nbsp;人工决策</div>
	<div class="node state" id="sendMsgTask" type="sendMsgTask">
		<img src="jspub/myflow-min/img/16/task_empty.png" />&nbsp;&nbsp;抄送节点</div>
	<div class="node state" id="decision" type="decision">
		<img src="jspub/myflow-min/img/16/gateway_exclusive.png" />&nbsp;&nbsp;判断</div>
	<div class="node state" id="fork" type="fork">
		<img src="jspub/myflow-min/img/16/gateway_parallel.png" />&nbsp;&nbsp;分支</div>
	<div class="node state" id="join" type="join">
		<img src="jspub/myflow-min/img/16/gateway_parallel.png" />&nbsp;&nbsp;合并</div>
</div>

<div id="myflow_props"
	style="position: absolute; top: 30; right: 50; background-color: #fff; width: 300px; padding: 3px;display: none;"
	class="ui-widget-content">
<div id="myflow_props_handle" class="ui-widget-header">属性</div>
<table border="1" width="100%" cellpadding="0" cellspacing="0">

</table>
</div>
<div id="myflow"></div>
	<script type="text/javascript" src="${staticUrl}/extjs/extend/shared/examples.js"></script>
	<script type="text/javascript" src="template/js/extux/ReferField.js"></script>
	<script type="text/javascript" src="template/js/base/common.js"></script>
	<script type="text/javascript" src="jspub/myflow-min/lib/raphael-min.js"></script>
	<script type="text/javascript" src="jspub/myflow-min/lib/jquery-ui-1.8.4.custom/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="jspub/myflow-min/lib/jquery-ui-1.8.4.custom/js/jquery-ui-1.8.4.custom.min.js"></script>
	<script type="text/javascript" src="jspub/myflow-min/myflow-debug.js?srmVersion=${SRMVersion}"></script>
	<script type="text/javascript" src="jspub/myflow-min/myflow.jpdl4.js?srmVersion=${SRMVersion}"></script>
	<script type="text/javascript" src="jspub/myflow-min/myflow.editors.js?srmVersion=${SRMVersion}"></script>
	<script type="text/javascript">
	var id = "${id}";
	var cunrrentSourceData = "${cunrrentSourceData}";
	var staticUrl = "${staticUrl}";
	</script>
	<script type="text/javascript" src="jspub/myflow-min/workFlowEdit.js?srmVersion=${SRMVersion}"></script>
</body>
</html>