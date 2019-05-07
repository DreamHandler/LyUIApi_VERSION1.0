<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.model.Aperator"%>
<%@page import="com.MFuns.MFuns"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
HttpSession  Session = request.getSession();
//获得操作员对象
Aperator apr = (Aperator)Session.getAttribute("opr");
%>
<!DOCTYPE html>
<html>
	<head>
		<title>Grid - Ace Admin</title>


		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="assets/css/bootstrap.min.css" />
		<link rel="stylesheet" href="assets/font-awesome/4.5.0/css/font-awesome.min.css" />

		<!-- page specific plugin styles -->

		<!-- text fonts -->
		<link rel="stylesheet" href="assets/css/fonts.googleapis.com.css" />

		<!-- ace styles -->
		<link rel="stylesheet" href="assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />

		<!--[if lte IE 9]>
			<link rel="stylesheet" href="assets/css/ace-part2.min.css" class="ace-main-stylesheet" />
		<![endif]-->
		<link rel="stylesheet" href="assets/css/ace-skins.min.css" />
		<link rel="stylesheet" href="assets/css/ace-rtl.min.css" />

		<!--[if lte IE 9]>
		  <link rel="stylesheet" href="assets/css/ace-ie.min.css" />
		<![endif]-->
<script src="/LyUIApi/main/JavaScript/main.js"></script>
<script type="text/javascript">
			function changeFrameHeight(){//自动调整iframe页面尺寸
				var ifm = document.getElementById("iframe_menu02");
				var mainmenu = document.getElementById("mainmenu");
				var win = window.innerHeight;
				var navbar = $('#navbar')[0].scrollHeight;
				var footer = 0;
				try{
					var bHeight=win-navbar-footer-10;
					ifm.height = bHeight;
					$(mainmenu).css('max-height',(bHeight-20)+'px')
				}catch(ex){}
			 }
			 function onteFn(){
				$('#iframe_menu02').contents().scroll(function(){
					var top = $('#iframe_menu02').contents().scrollTop();
					$('#mainmenu').css({'top':' -'+top+'px'});
				})
			 } 
			 window.onresize = function(){//页面收缩时调用
				changeFrameHeight();
				var iframe = document.getElementById("iframe_menu02");
				var height = $('#mainmenu').height();
				var maxhe = $('#mainmenu').css('max-height');
				if(height>=parseInt(maxhe)){
					if(!$._data(iframe,'events')||!$._data(iframe,'events')['load']){
						$(iframe).load(function(){
								$('#iframe_menu02').contents().scroll(function(){
									var top = $('#iframe_menu02').contents().scrollTop();
									$('#mainmenu').css({'top':' -'+top+'px'});
							})
						})
					}
					if(!$._data($('#iframe_menu02').contents()[0],'events')||!$._data($('#iframe_menu02').contents()[0],'events')['scroll']){
						$('#iframe_menu02').contents().scroll(function(){
								var top = $('#iframe_menu02').contents().scrollTop();
								$('#mainmenu').css({'top':' -'+top+'px'});
							})
					}
				}else{
					if($._data(iframe,'events')&&$._data(iframe,'events')['load']){
						$(iframe).unbind();
						$('#iframe_menu02').contents().unbind();
					}
				}
			 }  
		</script>
		<!-- inline styles related to this page -->
		<style>
			/* styling the grid page's grid elements */
.center {
	text-align: center;
}
.center [class*="col-"] {
	margin-top: 2px;
	margin-bottom: 2px;

	position: relative;
	text-overflow: ellipsis;
}
.center [class*="col-"]  div{
  position: relative;
  z-index: 2;
  
  	padding-top: 4px;
	padding-bottom: 4px;
	
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  width: 100%;
}
.center [class*="col-"]  div span{
  position: relative;
  z-index: 2;
}
.center [class*="col-"] div:before {
	display: block;
	content: "";
	
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1;
	
	border: 1px solid #DDD;
}

.center [class*="col-"] div:hover:before {
	background-color: #FCE6A6;
	border-color: #EFD27A;
}

		</style>
		<!-- ace settings handler -->
		<script src="assets/js/ace-extra.min.js"></script>
	</head>

	<body class="no-skin" onload="main.InitLoad();">
	<!-- 页面头部  -->
	<div id="navbar" class="navbar navbar-default ace-save-state" >
			<div class="navbar-container ace-save-state" id="navbar-container">
				<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
					<span class="sr-only">Toggle sidebar</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>

				<div class="navbar-header pull-left">
					<a href="main.jsp" class="navbar-brand">
						<small>
							<!-- <img src='resource/default/images/logo.png' style='height:25px;padding-bottom: 5px'> -->
							<i class="fa fa-leaf"></i>
							bootstrap ui 后台2
						</small>
					</a>
				</div>

				<div class="navbar-buttons navbar-header pull-right" role="navigation">
					<ul class="nav ace-nav">
						<li class="light-blue dropdown-modal">
							<a data-toggle="dropdown" href="#" class="dropdown-toggle">
								<img class="nav-user-photo" src="/LyUI/plugins/bootstrap/images/avatars/user.jpg" alt="Jason's Photo" />
								<span class="user-info">
									<%
										if(apr == null){
											return;
										}
									%>
									<small><%=apr.getVascname()%></small>
									<%=apr.getAperator("VNAME")%>
								</span>
								<i class="ace-icon fa fa-caret-down"></i>
							</a>

							<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
								<!-- <li>
									<a onclick='main.goLocation(this,1);' href="RZCX\log.jsp" patch="登录日志" data-toggle="modal">
										<i class="ace-icon fa fa-sticky-note"></i>
										登录日志
									</a>
								</li> -->
								<li>
									<a href="#set-modal" data-toggle="modal">
										<i class="ace-icon fa fa-cog"></i>
										设置
									</a>
								</li>
								<li class="divider">
								<li>
									<a href="#">
										<i class="ace-icon fa fa-power-off"></i>
										注销
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!-- /.navbar-container -->
		</div>
		<div id='set-modal' class="modal fade" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h3 class="smaller lighter blue no-margin">设置页面样式</h3>
					</div>
					<div class="row modal-body" style='margin-left: 0px;margin-right: 0px;'>
						<div class="pull-left width-50">
							   <div class="settings-item">
								   <div class="pull-left">
										<select id="skin-colorpicker" class="hide">
											<option data-skin="no-skin" value="#438EB9">#438EB9</option>
											<option data-skin="skin-1" value="#222A2D">#222A2D</option>
											<option data-skin="skin-2" value="#C6487E">#C6487E</option>
											<option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>
										</select>
									</div>
									<span>&nbsp; 选择皮肤</span>
								</div>
								<div class="settings-item">
									<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-rtl" autocomplete="off" />
									<label class="lbl" for="ace-settings-rtl">  右变左(逻辑展示)</label>
								</div>

								<div class="settings-item">
									<input type="checkbox" class="ace ace-checkbox-2 ace-save-state" id="ace-settings-add-container" autocomplete="off" />
									<label class="lbl" for="ace-settings-add-container">
										容器
										<b>居中</b>
									</label>
								</div>
							</div><!-- /.pull-left -->

							<div class="pull-left width-50">
								<div class="settings-item">
									<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-hover" autocomplete="on" checked="checked" />
									<label class="lbl" for="ace-settings-hover"> 子菜单上徘徊</label>
								</div>

								<div class="settings-item">
									<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-compact" autocomplete="on" checked="checked" />
									<label class="lbl" for="ace-settings-compact"> 侧边框紧凑</label>
								</div>

								<div class="settings-item">
									<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-highlight" autocomplete="off" />
									<label class="lbl" for="ace-settings-highlight">Alt.活动项目</label>
								</div>
							</div><!-- /.pull-left -->
					</div>
					<div class="modal-footer">
						<button class="btn btn-sm btn-danger pull-right" data-dismiss="modal">
							<i class="ace-icon fa fa-times"></i>
							关闭
						</button>
					</div>
				</div><!-- /.modal-content -->
			</div>
		</div>
		<!-- 头部结束 -->
		<div class="main-container ace-save-state" id="main-container">
			<script type="text/javascript">
				try{ace.settings.loadState('main-container')}catch(e){}
			</script>

			<div id="sidebar" class="sidebar responsive ace-save-state compact">
				<script type="text/javascript">
					try{ace.settings.loadState('sidebar')}catch(e){}
				</script>

				<div class="sidebar-shortcuts" id="sidebar-shortcuts">
					<!-- 导航头部 -->
					<div class="sidebar-shortcuts-large" style='line-height:20px;margin-top:5px;width:105px;'>
						 <span class="input-icon">
							<input type="text" placeholder="菜单查询 "  onpropertychange="main.QryMenu(this)" style='width:100px;' />
							 <i class="ace-icon fa fa-search nav-search-icon"></i>
						</span>
					</div>
					<!-- 导航头部小分辨率 -->
					 <div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
						<button class="btn btn-info" style='font-size:14px;'>
							<i class="ace-icon fa fa-search"></i>
						</button>
					</div> 
				</div><!-- /.sidebar-shortcuts -->
				<%
					MFuns funs= new MFuns(); 
					out.write(funs.getMenu(apr,request.getSession().getId()));
				%>				
				
				<!-- 菜单收缩、展开 -->
				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>
			</div>
			<!-- 菜单栏完 -->
			<div class="main-content">
				<div class="main-content-inner">
					<div class="widget-box transparent" id="recent-box">
						<div class="widget-header">
							<div class="widget-toolbar no-border" style="float:left">
								<ul class="nav nav-tabs" id="recent-tab">
									<li id="li_menu02" class="li_menu02 active">
										<a data-toggle="tab" href="#li_menu02-tab">
											<i class="menu-icon glyphicon glyphicon-home"></i>
											首页
										</a>
									</li>
								</ul>
							</div>
						</div>
						<!-- 路径导航结束 -->
						<div class="widget-body" style="padding:0px">
							<div class="widget-main padding-4" style="padding:0px">
								<div id="menu_iframe" class="tab-content padding-8" style="padding:0px">
									<div id="li_menu02-tab" class="tab-pane active">
										<iframe id="iframe_menu02" src="UItest/indexTest.jsp" width="100%" 
										allowtransparency="true" onload="changeFrameHeight(this)" 
										 scrolling="auto" frameborder="0">
										</iframe>
									</div>
								</div>
							</div><!-- /.widget-main -->
						</div><!-- /.widget-body -->
					</div><!-- /.widget-box -->
				</div>
			</div><!-- /.main-content -->
		</div><!-- /.main-container -->

		
		<script src="assets/js/jquery-2.1.4.min.js"></script>

		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="assets/js/bootstrap.min.js"></script>

		<!-- ace scripts -->
		<script src="assets/js/ace-elements.min.js"></script>
		<script src="assets/js/ace.min.js"></script>

	</body>
</html>
