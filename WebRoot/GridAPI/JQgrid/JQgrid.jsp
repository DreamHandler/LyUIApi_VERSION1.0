<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<head>
		<base href="<%=basePath%>">
    	<title>jqGrid/测试demo</title>
		<!-- <script type="text/javascript" src="SysDefUtil/Origin.js"></script> -->
		
		<!-- jqGrid组件基础样式包-必要 -->
		<link rel="stylesheet" href="../../../LyUI/Origin/Widget/Grid/jqGrid/css/ui.jqgrid.css" />
		<!-- jqGrid主题包-非必要 --> 
		<!-- 这个是所有jquery插件的基础，首先第一个引入 -->
		<script type="text/javascript" src="../../../LyUI/Origin/jQuery/jquery-1.11.3.min.js"></script>
		<!-- 在jqgrid/css/css这个目录下还有其他的主题包，可以尝试更换看效果 -->
		<link rel="stylesheet" href="../../../LyUI/Origin/Widget/Grid/jqGrid/css/jquery-ui-1.8.16.custom.css" />
		<!-- jqGrid插件包-必要 -->
		<script type="text/javascript" src="../../../LyUI/Origin/Widget/Grid/jqGrid.js"></script>
		<!-- jqGrid插件的多语言包-非必要 -->
		<!-- 在jqgrid/js/i18n下还有其他的多语言包，可以尝试更换看效果 -->
		<script type="text/javascript" src="../../../LyUI/Origin/Widget/Grid/jqGrid/i18n/grid.locale-cn.js"></script>
		<script type="text/javascript" src="GridAPI/JQgrid/JavaScript/JQgrid.js"></script>
		
		<!-- /*
 * jqGrid组件基础样式包-必要
 * */
//InitCompriseCss(ModuleUrl+"Grid/jqGrid/css/ui.jqgrid.css");
/*
* jqGrid主题包-非必要 
* 在jqgrid/css/css这个目录下还有其他的主题包，可以尝试更换看效果
**/
//InitCompriseCss(ModuleUrl+"Grid/jqGrid/css/jquery-ui-1.8.16.custom.css"); -->
		
		
		<script type="text/javascript">
			//本页面初始化用到的js包，创建jqGrid的代码就在里面 
			//InitComprise(ModuleUrl+"Grid/jqGrid.js");
			/*
			 * 在jqgrid/js/i18n下还有其他的多语言包，可以尝试更换看效果
			 * */
			//InitComprise(ModuleUrl+"Grid/jqGrid/i18n/grid.locale-cn.js");
			//InitComprise("GridAPI/JQgrid/JavaScript/JQgrid.js");
		</script>
		<style>  
			#list2, #pager2 {  
			    font-size: 75%;  
			}  
		</style>  
	</head>
	<body>
		<div style="margin-left:20px;margin-top:20px;">
			<table id="list2"></table> 
			<div id="pager2"></div>
			<br>
			<h2>以上为创建jqGrid的简单例子。想了解全功能api，请移步<a href="http://blog.mn886.net/jqGrid">http://blog.mn886.net/jqGrid</a></h2></h2>
		</div>
	</body>
</html>