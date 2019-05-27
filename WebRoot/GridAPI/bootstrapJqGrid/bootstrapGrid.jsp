<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
	<head>
		<base href="<%=basePath%>">
		<title>bootstrap jqgrid demo</title>
		
		<meta name="description" content="Dynamic tables and grids using jqGrid plugin" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		
		<script type="text/javascript" src="SysDefUtil/Origin.js"></script>
		<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/font-awesome/4.5.0/css/font-awesome.css" />
		<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" />
	
		<script type="text/javascript">
			InitComprise(ModuleUrl+"bootstrap/js/jquery.jqGrid.js");
			InitComprise("GridAPI/bootstrapJqGrid/JavaScript/bootstrapGrid.js");
		</script>
		<style>
			body{
				background:white;
			}
		</style>
	</head>

	<body>
		<div class="container-fluid" style="margin-top:20px;">
			<div class="row">
				<div class="col-xs-12">
					<table id="grid-table"></table>
					<div id="grid-pager"></div>
				</div>
			</div>
		</div>
	</body>
</html>

