<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
		<title>bootstrap  UI 测试</title>
		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/css/bootstrap.css" />
		<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/font-awesome/4.5.0/css/font-awesome.css" />
		<!-- text fonts -->
		<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/css/fonts.googleapis.com.css" />
		<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" />
		<!-- 背景切换样式 -->
		<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/css/ace-skins.css" />
		<link rel="stylesheet" href="/LyUI/Origin/Widget/bootstrap/css/ace-rtl.css" />
		<!-- basic scripts -->
		<script src="/LyUI/Origin/jQuery/jquery-2.1.4.js"></script>
		<!-- ace settings handler -->
		<script src="/LyUI/Origin/Widget/bootstrap/js/ace-extra.js"></script>
		<script src="main/JavaScript/main.js"></script>
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
	</head>
	<body class="no-skin" style="overflow:hidden">
		<div id="navbar" class="navbar navbar-default ace-save-state">
			<div class="navbar-container ace-save-state" id="navbar-container">
				<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
					<span class="sr-only">Toggle sidebar</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<div class="navbar-header pull-left">
					<a href="#" class="navbar-brand">
						<small>
							<i class="fa fa-leaf"></i>
							bootstrap ui 后台
						</small>
					</a>
				</div>
				<!-- 全局功能列表 -->
				<div class="navbar-buttons navbar-header pull-right" role="navigation" style="margin-right:35px">
					<ul class="nav ace-nav">
						<li class="light-blue dropdown-modal">
							<a data-toggle="dropdown" href="#" class="dropdown-toggle">
								<img class="nav-user-photo" src="/LyUI/Origin/Widget/bootstrap/images/avatars/user.jpg" alt="Jason's Photo" />
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
								<li>
									<a href="#">
										<i class="ace-icon fa fa-cog"></i>
										设置
									</a>
								</li>
								<li class="divider"></li>
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
				<div class="ace-settings-container" id="ace-settings-container">
							<div class="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
								<i class="ace-icon fa fa-cog bigger-130"></i>
							</div>
							<div class="ace-settings-box clearfix" id="ace-settings-box">
								<div class="pull-left width-50">
									<div class="ace-settings-item">
										<div class="pull-left">
											<select id="skin-colorpicker" class="hide">
												<option data-skin="no-skin" value="#438EB9">#438EB9</option>
												<option data-skin="skin-1" value="#222A2D">#222A2D</option>
												<option data-skin="skin-2" value="#C6487E">#C6487E</option>
												<option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>
											</select>
										</div>
										<span>&nbsp; Choose Skin</span>
									</div>

									<div class="ace-settings-item">
										<input type="checkbox" class="ace ace-checkbox-2 ace-save-state" id="ace-settings-navbar" autocomplete="off" />
										<label class="lbl" for="ace-settings-navbar"> Fixed Navbar</label>
									</div>

									<div class="ace-settings-item">
										<input type="checkbox" class="ace ace-checkbox-2 ace-save-state" id="ace-settings-sidebar" autocomplete="off" />
										<label class="lbl" for="ace-settings-sidebar"> Fixed Sidebar</label>
									</div>

									<div class="ace-settings-item">
										<input type="checkbox" class="ace ace-checkbox-2 ace-save-state" id="ace-settings-breadcrumbs" autocomplete="off" />
										<label class="lbl" for="ace-settings-breadcrumbs"> Fixed Breadcrumbs</label>
									</div>

									<div class="ace-settings-item">
										<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-rtl" autocomplete="off" />
										<label class="lbl" for="ace-settings-rtl"> Right To Left (rtl)</label>
									</div>

									<div class="ace-settings-item">
										<input type="checkbox" class="ace ace-checkbox-2 ace-save-state" id="ace-settings-add-container" autocomplete="off" />
										<label class="lbl" for="ace-settings-add-container">
											Inside
											<b>.container</b>
										</label>
									</div>
								</div><!-- /.pull-left -->

								<div class="pull-left width-50">
									<div class="ace-settings-item">
										<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-hover" autocomplete="off" />
										<label class="lbl" for="ace-settings-hover"> Submenu on Hover</label>
									</div>

									<div class="ace-settings-item">
										<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-compact" autocomplete="off" />
										<label class="lbl" for="ace-settings-compact"> Compact Sidebar</label>
									</div>

									<div class="ace-settings-item">
										<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-highlight" autocomplete="off" />
										<label class="lbl" for="ace-settings-highlight"> Alt. Active Item</label>
									</div>
								</div><!-- /.pull-left -->
							</div><!-- /.ace-settings-box -->
						</div><!-- /.ace-settings-container -->
			</div><!-- /.navbar-container -->
		</div>
		
		<!-- 头部结束 -->
		<div class="main-container ace-save-state" id="main-container">
			<script type="text/javascript">
				try{ace.settings.loadState('main-container')}catch(e){}
			</script>
			<div id="sidebar" class="sidebar responsive ace-save-state">
				<script type="text/javascript">
					try{ace.settings.loadState('sidebar')}catch(e){}
				</script>
				<%
					MFuns funs= new MFuns(); 
					out.write(funs.getMenu(apr,request.getSession().getId()));
				%>
				<!-- 菜单收缩、展开 -->
				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>
			</div>
			<div class="main-content">
				<div class="main-content-inner">
					<div class="row">
						<div class="col-sm-12">
							<div class="widget-box transparent" id="recent-box">
								<div class="widget-header">
									<div class="widget-toolbar no-border" style="float:left">
										<ul class="nav nav-tabs" id="recent-tab">
											<li id="li_menu02" class="li_menu02 active">
												<a data-toggle="tab" href="#li_menu02-tab">
													首页
												</a>
											</li>
										</ul>
									</div>
								</div>
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
						</div><!-- /.col -->
					</div><!-- /.row -->
				</div>
			</div><!-- /.main-content -->
		</div><!-- /.main-container -->
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) 
				document.write("<script src='/LyUI/Origin/Widget/bootstrap/js/jquery.mobile.custom.js'>"+"<"+"/script>");
		</script>
		<script src="/LyUI/Origin/Widget/bootstrap/js/bootstrap.js"></script>
		<script src="/LyUI/Origin/Widget/bootstrap/js/ace-elements.js"></script>
		<script src="/LyUI/Origin/Widget/bootstrap/js/ace.js"></script>
	</body>
</html>

