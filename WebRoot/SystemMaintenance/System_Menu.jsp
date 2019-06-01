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
		InitComprise(ModuleUrl+"Tree/zTree.js");
		InitComprise(ModuleUrl+"Loading/Loading.js");
		InitComprise("SystemMaintenance/JavaScript/System_Menu.js");
		InitCompriseCss("SystemMaintenance/Css/System_Menu.css");
	</script>
  </head>
  
  <body onload="SM.initLoad();">
  	<div id="content" class="container-fluid" style="overflow:hidden;">
  		<!-- group_div start -->
  		<div id="system_div">
			<div class="widget-header">
				<h4 class="widget-title">系统</h4>
			</div>
			<div class="widget-body">
				<div id="system_grid" class="widget-main">
					<div id="nr_grid">
						<div id="system_qry">
							筛选：<input id="system_info" type="text" onkeyup="SM.QrySystemData()"/>
						</div>
						<div id="system_grid_data">
							<table id="system_list" ></table>
						</div>
						<div id="system_grid_input">
							<div id="system_middle" class="col-xs-12">
								<div class="col-xs-6">
									编码：<input id="system_VSYSNO" type="text" disabled>
								</div>
								<div class="col-xs-6">
									名称：<input id="system_VNAME" type="text" disabled>
								</div>
							</div>
						</div>
					</div>
					<div id="system_btn" align="right">
						<button id="system_btn_add" class="btn btn-sm btn-primary" type="button" onclick="SM.system_btn_add()" >
							新增
						</button>
						<button id="system_btn_update" class="btn btn-sm btn-primary" type="button" onclick="SM.system_btn_update()" >
							修改
						</button>
						<button id="system_btn_delete" class="btn btn-sm btn-primary" type="button" onclick="SM.system_btn_delete()" >
							删除
						</button>
						<button id="system_btn_save" class="btn btn-sm btn-primary" type="button" onclick="SM.system_btn_save()" >
							 保存
						</button>
						<button id="system_btn_cancel" class="btn btn-sm btn-primary" type="button" onclick="SM.system_btn_cancel()" >
							取消
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- group_div end -->
		<!-- admin_div start -->
  		<div id="menu_div">
			<div class="widget-header">
				<h4 class="widget-title">菜单</h4>
			</div>
			<div class="widget-body">
				<div id="menu_main" class="widget-main">
					<div id="menu_content">
						<div id="menu_tree">
							<ul id="menu_treeData" class="ztree"></ul>
						</div>
						<div id="menu_input">
							<div class="col-xs-12">
								编码：<input id="menu_VNum" class="input_width" type="text" disabled>
							</div>
							<div class="col-xs-12">
								名称：<input id="menu_VName" class="input_width" type="text" disabled>
							</div>
							<div class="col-xs-12">
								链接：<input id="menu_VSRC" class="input_width" type="text" disabled>
							</div>
							<div class="col-xs-12">
								图标：<input id="menu_VPIC" class="input_width" type="text" disabled>
							</div>
						</div>
					</div>
					<div id="menu_btn" align="right">
						<button id="menu_btn_update" class="btn btn-sm btn-primary" type="button" onclick="SM.menu_btn_update()" >
							修改
						</button>
						<button id="menu_btn_save" class="btn btn-sm btn-primary" type="button" onclick="SM.menu_btn_save()" >
							 保存
						</button>
						<button id="menu_btn_cancel" class="btn btn-sm btn-primary" type="button" onclick="SM.menu_btn_cancel()" >
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
