<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="java.net.URLDecoder"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String FilePath = request.getParameter("path");
FilePath = URLDecoder.decode(FilePath);
//System.out.println(FilePath);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>文件上传</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="/LyUIApi/WebUploader/css/webuploader.css">
	<script type="text/javascript" src="SysDefUtil/Origin.js"></script>
	<script type="text/javascript" src="WebUploader/JavsScript/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="WebUploader/JavsScript/jquery-ui-1.11.4.js"></script>
	<script type="text/javascript" src="WebUploader/JavsScript/webuploader.js"></script>
	<script type="text/javascript" src="WebUploader/JavsScript/WEBUP.js"></script>
	<script type="text/javascript">
		var basePath = '<%=basePath%>'; 
		var FilePath = '<%=FilePath%>';
		var CWJDX = '100';
	</script>
	<style type="text/css">
		body {
			background-color: white;
		}
	</style>
  </head>
  <body onload="webup.Init();">
    	<div id="uploader" class="wu-example" style="margin: 5px;">
    		<div id="thelist" class="uploader-list" ></div>
    		<div class="btns">
    			<div id="picker">文件选择</div>
    			<div id="fileList" style="height:320px;overflow: auto;"></div>
    		</div>
    	</div>
    	<div style="text-align: right;"><input id="getSure" style="margin-right:10px;" class="btn" type="button" value="确认上传" onclick="webup.Sure();"/></div>
  </body>
</html>
