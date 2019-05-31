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
    <meta name="description" content="Dynamic tables and grids using jqGrid plugin" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	<script type="text/javascript" src="SysDefUtil/Origin.js"></script>
	<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/font-awesome/4.5.0/css/font-awesome.css" />
	<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" />
	<script type="text/javascript">
		InitComprise(ModuleUrl+"bootstrap/js/jquery.jqGrid.js");
		InitComprise(ModuleUrl+"Loading/Loading.js");//Loading.js效果不佳，弹出框效果不好
		InitComprise(ModuleUrl+"EpBox/EpBox.js"); //ep出现的位置还需要进一步验证计算方式，容易超出界面范围
		InitComprise(ModuleUrl+"Dialog/LyDialog.js"); //无效
		InitComprise(ModuleUrl+"Dialog/jQDialog.js"); 
		InitComprise("SystemMaintenance/JavaScript/Group_User.js");
		InitCompriseCss("SystemMaintenance/Css/Group_User.css");
	</script>
	
  </head>
  
  <body onload="GU.initLoad();">
  	<div id="content" class="container-fluid" style="overflow:hidden;">
  		<!-- group_div start -->
  		<div id="group_div">
			<div class="widget-header">
				<h4 class="widget-title">管理员组</h4>
			</div>
			<div class="widget-body">
				<div id="group_grid" class="widget-main">
					<div id="nr_grid">
						<div id="group_qry">
							筛选：<input id="group_info" type="text" onkeyup="GU.QryGroupData()"/>
						</div>
						<div id="group_grid_data">
							<table id="group_list" ></table>
						</div>
						<div id="group_grid_input">
							<div id="group_middle" class="col-xs-12">
								<div class="col-xs-6">
									编码：<input id="group_VascNum" type="text" disabled>
								</div>
								<div class="col-xs-6">
									名称：<input id="group_VascName" type="text" disabled>
								</div>
							</div>
						</div>
					</div>
					<div id="group_btn" align="right" style="float:left;border:0px red solid;margin-left:5px;">
						<button id="group_btn_add" class="btn btn-sm btn-primary" type="button" onclick="GU.group_btn_add()" >
							新增
						</button>
						<button id="group_btn_update" class="btn btn-sm btn-primary" type="button" onclick="GU.group_btn_update()" >
							修改
						</button>
						<button id="group_btn_delete" class="btn btn-sm btn-primary" type="button" onclick="GU.group_btn_delete()" >
							删除
						</button>
						<button id="group_btn_save" class="btn btn-sm btn-primary" type="button" onclick="GU.group_btn_save()" >
							 保存
						</button>
						<button id="group_btn_cancel" class="btn btn-sm btn-primary" type="button" onclick="GU.group_btn_cancel()" >
							取消
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- group_div end -->
		<!-- admin_div start -->
  		<div id="admin_div">
			<div class="widget-header">
				<h4 class="widget-title">管理员</h4>
			</div>
			<div class="widget-body">
				<div id="admin_grid" class="widget-main">
					<div id="admin_nr_grid">
						<div id="admin_qry">
							筛选：<input id="admin_info" type="text" onkeyup="GU.QryAdminData();"/>
						</div>
						<div id="admin_grid_data">
							<table id="admin_list"></table>
						</div>
						<div id="admin_grid_input">
							<div id="admin_middle" class="col-xs-12" >
								<div class="col-xs-4">
									编码：<input id="admin_VJOBNUM" name="编码" type="text" disabled>
								</div>
								<div class="col-xs-4">
									名称：<input id="admin_VNAME" name="名称" type="text" disabled>
								</div>
								<div class="col-xs-4">
									管理员组：<input id="admin_VascName" type="text" onfocus="GU.getEpBox(this)" disabled>
									<input id="admin_VascNum" hidden="hidden"/>
								</div>
								<div class="col-xs-4">
									账号：<input id="admin_VUSER" name="账号" type="text" disabled>
								</div>
								<div class="col-xs-4">
									密码：<input id="admin_VPSWD" name="密码" type="password" disabled>
								</div>
							</div>
						</div>
					</div>
					<div id="admin_btn" align="right">
						<button id="admin_btn_add" class="btn btn-sm btn-primary" type="button" onclick="GU.admin_btn_add()" >
							新增
						</button>
						<button id="admin_btn_update" class="btn btn-sm btn-primary" type="button" onclick="GU.admin_btn_update()" >
							修改
						</button>
						<button id="admin_btn_delete" class="btn btn-sm btn-primary" type="button" onclick="GU.admin_btn_delete()" >
							删除
						</button>
						<button id="admin_btn_save" class="btn btn-sm btn-primary" type="button" onclick="GU.admin_btn_save()" >
							 保存
						</button>
						<button id="admin_btn_cancel" class="btn btn-sm btn-primary" type="button" onclick="GU.admin_btn_cancel()" >
							取消
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- admin_div end -->
  	</div>
  </body>
</html>
