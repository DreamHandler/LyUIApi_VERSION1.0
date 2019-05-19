<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>权限维护</title>
	<script type="text/javascript" src="SysDefUtil/Origin.js"></script>
	<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/font-awesome/4.5.0/css/font-awesome.css" />
	<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" />
	<script type="text/javascript">
		InitComprise(ModuleUrl+"Tree/zTree.js");
		InitComprise("SystemMaintenance/JavaScript/RightManagement.js");
		InitCompriseCss("SystemMaintenance/Css/RightManagement.css");
	</script>
	
  </head>
  
  <body onload="RM.initLoad();">
  	<!-- leftDiv start -->
  	<div id="leftDiv" class="widget-box">
  		<div id="group_info" class="widget-box">
			<div class="widget-header">
				<h4 class="widget-title">管理员组</h4>
			</div>
			<div class="widget-body">
				<div id="nr_tree" class="widget-main" style="padding:0px;overflow:auto;">
					<ul id="treeData" class="ztree"></ul>
				</div>
			</div>
		</div>
   	</div>
   	<!-- leftDiv end -->
   	<!-- rightDiv start -->
   	<div id="rightDiv" style="float:left;margin:5px;margin-left:0px;border:0px blue solid;">
   		<div id="XTXX" style="height:200px;">
   			<!-- xt_left start -->
   			<div id="xt_left" class="widget-box" style="float:left;margin:0px;border-right:0px;">
				<div class="widget-header">
					<h4 class="widget-title" style="color:red">未分配系统</h4>
				</div>
				<div class="widget-body">
					<div id="nr_left" class="widget-main" style="padding:0px;overflow:auto;">
						<select multiple="multiple" id="noUse_system" onchange="" style="border:0px;padding:0px;">
							
						</select>
					</div>
				</div>
			</div>
			<!-- xt_left end -->
			<!-- xt_center start -->
   			<div id="xt_center" class="widget-box" style="float:left;width:60px;margin:0px;border-left:0px;border-right:0px;">
   				<div class="widget-header">
   					
   				</div>
   				<div class="widget-body" >
   					<div id="nr_center" class="widget-header" style="padding:0px;text-align:center;border-bottom:0px;">
   						<div class="btn-group btn-group-vertical" style="padding:0px;margin-top:10px;">
							<button id="btn_right" class="btn btn-sm btn-primary" type="button" disabled="disabled">
								<i class="icon-only ace-icon fa fa-angle-right"></i>
							</button>
							<button id="btn_left" class="btn btn-sm btn-primary" type="button" disabled="disabled">
								<i class="icon-only ace-icon fa fa-angle-left"></i>
							</button>
							<button id="btn_right_all" class="btn btn-sm btn-primary" type="button" disabled="disabled">
								<i class="icon-only ace-icon fa fa-angle-double-right"></i>
							</button>
							<button id="btn_left_all" class="btn btn-sm btn-primary" type="button" disabled="disabled">
								<i class="icon-only ace-icon fa fa-angle-double-left"></i>
							</button>
						</div>
   					</div>
   				</div>
   			</div>
   			<!-- xt_center end -->
   			<!-- xt_right start -->
   			<div id="xt_right" class="widget-box"  style="float:left;margin:0px;border-left:0px;">
   				<div class="widget-header">
					<h4 class="widget-title" style="color:green">已分配系统</h4>
				</div>
				<div class="widget-body" >
					<div id="nr_right" class="widget-main" style="padding:0px;overflow:auto;">
						<select multiple="multiple" id="Use_system" onchange="RM.Use_system_change();" style="border:0px;padding:0px;">
							
						</select>
					</div>
				</div>
   			</div>
   			<!-- xt_right end -->
   		</div>
   		<!-- rightDiv end -->
   		<!-- qx_info start -->
   		<div id="qx_info" class="widget-box" style="float:left;margin:0px;">
			<div class="widget-header">
				<h4 class="widget-title">菜单权限信息</h4>
			</div>
			<div class="widget-body">
				<div id="qx_nr_tree" class="widget-main" style="padding:0px;overflow:auto;">
					<ul id="qx_treeData" class="ztree"></ul>
				</div>
				
			</div>
		</div>
		<!-- qx_info end -->
   	</div>
  </body>
</html>
