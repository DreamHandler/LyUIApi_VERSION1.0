<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="SOA.YxProGlob.HisOpr.TBCZY"%>
<%@page import="SOA.YxProGlob.HisOpr.TMenu"%>
<%@page import ="SOA.YxProGlob.Busy.SerchDog"%>
<%@page import="YxBI.basic.SysDefStr"%>
<%@page import="YxBI.MFuns.MFuns"%>
<%@page import=" SOA.YxProGlob.Parameter.GetXTCS"%>
<%@ taglib uri="Yx.soft.taglib" prefix="z" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="ctx" value="${opr.YSPATH}"/>
<!DOCTYPE HTML>
<html lang="zh-CN">
<z:head ctx="${pageContext.request.contextPath}">
<title><%=SysDefStr.Welcome %></title>
		<link rel="stylesheet" href="BOOTJSFW/css/bootstrap.min.css" />
		<link rel="stylesheet" href="BOOTJSFW/font-awesome/4.5.0/css/font-awesome.min.css" />
		<link rel="stylesheet" href="BOOTJSFW/css/fonts.googleapis.com.css" />
		<link rel="stylesheet" href="BOOTJSFW/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" />
		<link rel="stylesheet" href="BOOTJSFW/css/ace-skins.min.css" />
		<link rel="stylesheet" href="BOOTJSFW/css/ace-rtl.min.css" />
		
		<script src="SysDefUtil/Source.js"></script>
		<script src="BOOTJSFW/js/ace-extra.min.js"></script>
		<%
			String BITYCXN = GetXTCS.GetDefParamter("BITYCXN", "2016");//BI开始查询年
			String BISJCSLX = GetXTCS.GetDefParamter("BISJCSLX", "0");//BI时间查询类型
			String[] BISJCSLXS = BISJCSLX.split("\\|");
			String showtype = "0";//0日|1月|2季|3年|4段
			String beginTime = "";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar cal = Calendar.getInstance();
			switch(BISJCSLXS[0]){
				case "0": 
				beginTime = sdf.format(new Date());
				showtype = "0";
				break;
				case "1":
				cal.setTime(new Date());
				cal.add(Calendar.DAY_OF_MONTH,-1);
				beginTime = sdf.format(cal.getTime());
				showtype = "0";
				break;
				case "2":
				cal.setTime(new Date());
				cal.set(Calendar.DAY_OF_MONTH, 1);
				beginTime = sdf.format(cal.getTime());
				showtype = "1";
				break;
				case "3":
				cal.setTime(new Date());
				cal.set(Calendar.DAY_OF_MONTH, 1);
				cal.add(Calendar.MONTH, -1);
				beginTime = sdf.format(cal.getTime());
				showtype = "1";
				break;
				case "4":
				cal.setTime(new Date());
				cal.set(Calendar.MONTH, 0);
				cal.set(Calendar.DAY_OF_MONTH, 1);
				beginTime = sdf.format(cal.getTime());
				showtype = "3";
				break;
				case "5":
				showtype = BISJCSLXS[1];
				beginTime = BISJCSLXS[2];
				break;
			}
			session.setAttribute("beginTime", beginTime);
			session.setAttribute("showtype", showtype);
			session.setAttribute("bitycxn", BITYCXN);
		%>
		<script type="text/javascript">
			 include("${ctx}/js/main.js");
			 include(baseModule + "Dialog/jQDialog.js");
			 function changeFrameHeight(){
				var ifm = document.getElementById("accordion");
				var mainmenu = document.getElementById("mainmenu");
				var win = window.innerHeight;
				var navbar = $('#navbar')[0].scrollHeight;
				var breadcrumbs = $('#breadcrumbs')[0].scrollHeight;
				var footer = 0;
				try{
					var bHeight=win-navbar-breadcrumbs-footer-10;
					ifm.height = bHeight;
					$(mainmenu).css('max-height',(bHeight-20)+'px')
				}catch(ex){}
			}
			function onteFn(){
				$('#accordion').contents().scroll(function(){
					var top = $('#accordion').contents().scrollTop();
					$('#mainmenu').css({'top':' -'+top+'px'});
				})
			} 
			window.onresize = function(){
				changeFrameHeight();
				var iframe = document.getElementById("accordion");
				var height = $('#mainmenu').height();
				var maxhe = $('#mainmenu').css('max-height');
				if(height>=parseInt(maxhe)){
					if(!$._data(iframe,'events')||!$._data(iframe,'events')['load']){
						$(iframe).load(function(){
								$('#accordion').contents().scroll(function(){
									var top = $('#accordion').contents().scrollTop();
									$('#mainmenu').css({'top':' -'+top+'px'});
							})
						})
					}
					if(!$._data($('#accordion').contents()[0],'events')||!$._data($('#accordion').contents()[0],'events')['scroll']){
						$('#accordion').contents().scroll(function(){
								var top = $('#accordion').contents().scrollTop();
								$('#mainmenu').css({'top':' -'+top+'px'});
							})
					}
				}else{
					if($._data(iframe,'events')&&$._data(iframe,'events')['load']){
						$(iframe).unbind();
						$('#accordion').contents().unbind();
					}
				}
			} 
		</script>
		 <style>
		 	.settings-item{
		 		padding-top:10px;
		 	}
		 	body{
		 		overflow: hidden;
		 	}
		 	#mainmenu{
			 	overflow:visible;
			 	position: relative;
			 	z-index: 1;
		 	}
		 	#sidebar-shortcuts{
		 		z-index: 30;
		 		position: relative;
		 	}
		 	#navbar{
		 		z-index: 30;
		 		position: relative;
		 	}
		 </style>
</z:head>
<z:body onload="main.InitLoad();">
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
					<a href="Main.jsp" class="navbar-brand">
						<small>
							<!-- <i class="fa fa-leaf"></i> -->
							<img src='resource/default/images/logo.png' style='height:25px;padding-bottom: 5px'>
							决策支持系统
						</small>
					</a>
				</div>

				<div class="navbar-buttons navbar-header pull-right" role="navigation">
					<ul class="nav ace-nav">
						
						<li class="light-blue dropdown-modal">
							<a data-toggle="dropdown" href="#" class="dropdown-toggle">
								<img class="nav-user-photo" src="BOOTJSFW/images/avatars/user.jpg" alt="Jason's Photo" />
								<span class="user-info">
									<%
										TBCZY inOpr = (TBCZY)session.getAttribute("opr");
										if(inOpr == null){
											return;
										}
									%>
									<small><%=SerchDog.GetInfo("0000") %></small>
									<%=inOpr.getCXM() %>
								</span>

								<i class="ace-icon fa fa-caret-down"></i>
							</a>

							<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
								<li>
									<a onclick='main.goLocation(this,1);' href="RZCX\log.jsp" patch="登录日志" data-toggle="modal">
										<i class="ace-icon fa fa-sticky-note"></i>
										登录日志
									</a>
								</li>
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
					out.write(funs.getMenu(inOpr,request.getSession().getId()));
				%>				
			<!-- 菜单完 -->

				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>
			</div>

			<div class="main-content">
				<div class="main-content-inner">
					<div class="breadcrumbs ace-save-state" id="breadcrumbs">
						<div style="width:250px;float:left;padding:0px">
							<ul class="breadcrumb" id='pagetitle'>
								<li>
									<i class="ace-icon glyphicon glyphicon-map-marker"></i>
									首页
								</li>
							</ul>
						</div>
						
						<div style="float:right;padding:0px">*说明:<font style="color:#337ab7">蓝色</font>字体可以点击到下钻页面</div>
						
					</div>
					<!-- 路径导航结束 -->
					<div class="page-content" style="padding:0px;">
						<div class="row" style="margin-left: 0px;margin-right:0px;;padding: 0px;">
							<iframe id="accordion" src="Main/Main.jsp" width="100%"  onload="changeFrameHeight()" allowtransparency="true" scrolling="auto" frameborder="0"></iframe>
						</div>
						<!-- 跳转结束 -->
					</div><!-- /.page-content -->
				</div>
			</div><!-- /.main-content -->
		</div><!-- /.main-container -->
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='BOOTJSFW/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="BOOTJSFW/js/bootstrap.min.js"></script>
		<!-- ace scripts -->
		<script src="BOOTJSFW/js/ace-elements.min.js"></script>
		<script src="BOOTJSFW/js/ace.min.js"></script>
</z:body>
</html>