<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'firstpage.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	
  </head>
  <script src="UItest/JavaScript/firstpage.js"></script>
  <body>
    <div>
    	This is my firstpage JSP page. <br>
		<div style="color:blue">测试文件上传</div>
	    <input type="button" value="上传文件" id="oldWJ" onclick="firstpage.testUploadFile()" style="width: 80px;float: left;height: 20px;margin-left: 5px;margin-top: 5px;"/>
	    <input type="text"/>
	</div>
  </body>
</html>
