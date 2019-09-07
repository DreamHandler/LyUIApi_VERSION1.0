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
		InitComprise(BassModuleUrlB+"js/jquery.jqGrid.js");
		InitComprise(BassModuleUrl+"Loading/Loading.js");
		InitComprise("ToolManagement/JavaScript/EpboxManagement.js");
		InitCompriseCss("ToolManagement/Css/EpboxManagement.css");
	</script>
  </head>
  
  <body onload="EpM.initLoad();">
  	<div id="content" class="container-fluid" style="overflow:hidden;">
  		<!-- group_div start -->
  		<div id="Epbox_div">
			<div class="widget-header">
				<h4 class="widget-title">Epbox信息</h4>
			</div>
			<div class="widget-body">
				<div id="Epbox_grid" class="widget-main">
					<div id="nr_grid">
						<div id="Epbox_qry">
							筛选：<input id="Epbox_info" type="text" onkeyup="EpM.QryEpboxData()"/>
						</div>
						<div id="Epbox_grid_data">
							<table id="Epbox_list" ></table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- group_div end -->
		<!-- Epbox_input_div start -->
  		<div id="Epbox_input_div">
			<div class="widget-header">
				<h4 class="widget-title">详细信息</h4>
			</div>
			<div class="widget-body">
				<div id="Epbox_main" class="widget-main">
					<div id="Epbox_content">
						<div id="Epbox_input">
							<div class="col-xs-12">
								<div class="input_name">编码：</div>
								<div class="info_input">
									<input id="Epbox_VBM" class="input_width" type="text" disabled>
								</div>
								<div class="info_explain">
									
								</div>
							</div>
							<div class="col-xs-12">
								<div class="input_name">名称：</div>
								<div class="info_input">
									<input id="Epbox_VMC" class="input_width" type="text" disabled>
								</div>
								<div class="info_explain">
									
								</div>
							</div>
							<div class="col-xs-12">
								<div class="input_name">ep名称：</div>
								<div class="info_input">
									<input id="Epbox_VDYMC" name="ep名称" class="input_width" type="text" disabled>
								</div>
								<div class="info_explain">
									*ep名称,业务系统使用控件时的识别码，不可修改
								</div>
							</div>
							<div class="col-xs-12">
								<div class="input_name">查询SQL：</div>
								<div class="info_input">
									<textarea id="Epbox_VVALUE" name="查询SQL" class="input_width" disabled="disabled"></textarea>
								</div>
								<div class="info_explain">
									*ep控件数据来源
								</div>
							</div>
							<!-- 该字段含义存储疑问，需进一步核实 -->
							<div class="col-xs-12" style="display:none">
								是否显示：<input id="Epbox_IXS" class="input_width" type="text" disabled>
							</div>
							<div class="col-xs-12">
								<div class="input_name">中文表头：</div>
								<div class="info_input">
									<input id="Epbox_VZWBT" name="中文表头" class="input_width" type="text" disabled>
								</div>
								<div class="info_explain">
									*ep控件中文表头，用“|”分隔；如：编号|操作员|拼音码
								</div>
							</div>
							<div class="col-xs-12">
								<div class="input_name">字段名称：</div>
								<div class="info_input">
									<input id="Epbox_VZDMC" name="字段名称" class="input_width" type="text" disabled>
								</div>
								<div class="info_explain">
									*ep控件数据字段名称，用“|”分隔；如：CBM|CMC|CPYM
								</div>
							</div>
							<div class="col-xs-12">
								<div class="input_name">列宽度：</div>
								<div class="info_input">
									<input id="Epbox_VLKD"  name="列宽度" class="input_width" type="text" disabled>
								</div>
								<div class="info_explain">
									*ep控件数据显示的列宽度，用“|”分隔；如：80|80|80
								</div>
							</div>
							<div class="col-xs-12">
								<div class="input_name">可用性：</div>
								<div class="info_input">
									<div id="BTATUS_radio">
										<div class="col-xs-6 radio_div">
											<label>
												<input id="Epbox_BTATUS1" value="1" name="Epbox_BTATUS" type="radio" checked disabled>可用
											</label>
										</div>
										<div class="col-xs-6 radio_div">
											<label>
												<input id="Epbox_BTATUS2" value="0" name="Epbox_BTATUS" type="radio" disabled>不可用
											</label>
										</div>
									</div>
								</div>
								<div class="info_explain">
									
								</div>
							</div>
							<div class="col-xs-12">
								<div class="input_name">备注：</div>
								<div class="info_input">
									<textarea id="Epbox_VBZ" class="input_width" disabled="disabled"></textarea>
								</div>
								<div class="info_explain">
									
								</div>
							</div>
						</div>
					</div>
					<div id="Epbox_btn" align="right">
						<button id="Epbox_btn_add" class="btn btn-sm btn-primary" type="button" onclick="EpM.Epbox_btn_add()" >
							新增
						</button>
						<button id="Epbox_btn_update" class="btn btn-sm btn-primary" type="button" onclick="EpM.Epbox_btn_update()" >
							修改
						</button>
						<button id="Epbox_btn_delete" class="btn btn-sm btn-primary" type="button" onclick="EpM.Epbox_btn_delete()" >
							删除
						</button>
						<button id="Epbox_btn_save" class="btn btn-sm btn-primary" type="button" onclick="EpM.Epbox_btn_save()" >
							 保存
						</button>
						<button id="Epbox_btn_cancel" class="btn btn-sm btn-primary" type="button" onclick="EpM.Epbox_btn_cancel()" >
							取消
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- Epbox_input_div end -->
  	</div>
  </body>
</html>
