<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>管理员维护</title>
	<script type="text/javascript" src="SysDefUtil/Origin.js"></script>
	<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/font-awesome/4.5.0/css/font-awesome.css" />
	<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" />
	<script type="text/javascript">
		InitComprise(ModuleUrl+"Grid/jqGrid.js");
		InitComprise(ModuleUrl+"Loading/Loading.js");//Loading.js效果不佳，弹出框效果不好
		InitComprise("SystemMaintenance/JavaScript/Group_User.js");
		InitCompriseCss("SystemMaintenance/Css/Group_User.css");
	</script>
	
  </head>
  
  <body onload="GU.initLoad();">
  	<div id="content" class="container-fluid">
  		<!-- group_div start -->
  		<div id="group_div">
			<div class="widget-header">
				<h4 class="widget-title">管理员组</h4>
			</div>
			<div class="widget-body">
				<div id="group_grid" class="widget-main">
					<div id="nr_grid" style="float:left;border:1px red solid;margin:5px;">
						
					</div>
					<div id="group_btn" align="right" style="float:left;border:1px red solid;margin-left:5px;">
						<button id="group_btn_add" class="btn btn-sm btn-primary" type="button" onclick="GU.group_btn_add()" >
							新增
						</button>
						<button id="group_btn_update" class="btn btn-sm btn-primary" type="button" onclick="GU.group_btn_update()" >
							修改
						</button>
						<button id="group_btn_delete" class="btn btn-sm btn-primary" type="button" onclick="GU.group_btn_delete()" >
							删除
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- group_div end -->
  	</div>
  </body>
</html>
