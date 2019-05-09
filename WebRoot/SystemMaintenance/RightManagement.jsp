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
  	<div id="leftDiv" style="float:left;width:150px;margin:10px;border:1px red solid;overflow:auto;">
		<ul id="treeData" class="ztree" style="border:0px blue solid"></ul>
   	</div>
   	<!-- leftDiv end -->
   	<!-- rightDiv start -->
   	<div id="rightDiv" style="float:left;margin:10px;margin-left:0px;border:1px blue solid;">
   		<div id="XTXX" style="height:200px;">
   			<!-- xt_left start -->
   			<div id="xt_left" class="widget-box" style="float:left;margin:0px;border-right:0px;">
				<div class="widget-header">
					<h4 class="widget-title">未分配系统</h4>
				</div>
				<div class="widget-body">
					<div id="nr_left" class="widget-main" style="padding:0px;overflow:auto;">
						<select multiple="multiple" size="10" id="noUse_system" style="border:0px;">
							<option value="option1">Option 1</option>
							
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
					<h4 class="widget-title">已分配系统</h4>
				</div>
				<div class="widget-body" >
					<div id="nr_right" class="widget-main" style="padding:0px;overflow:auto;">
						<select multiple="multiple" id="Use_system" style="border:0px;padding:0px;">
							
						</select>
					</div>
				</div>
   			</div>
   			<!-- xt_right end -->
   		</div>
   		<!-- rightDiv end -->
   	</div>
  </body>
</html>
