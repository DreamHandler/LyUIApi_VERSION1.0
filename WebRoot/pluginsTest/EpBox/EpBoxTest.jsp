<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>EpBox测试demo</title>
	<script type="text/javascript" src="SysDefUtil/Origin.js"></script>
	<script type="text/javascript">
		InitComprise(BassModuleUrl+"EpBox/EpBox.js");
		InitComprise(BassModuleUrl+"EpBox/MoreEpBox.js");
		InitComprise("pluginsTest/EpBox/JavaScript/EpBoxTest.js");
		InitCompriseCss("../LyUIApi/albbsltTest/iconfont.css");
	</script>
  </head>
  
  <body onload="ep.initLoad();">
  	<div style="margin-top:10px;margin-left:10px;">
  		<h1>
  			<i class="iconfont icon-jiuhuche" style="font-size: 116px;color:red;"></i>
    		<span>EpBox测试demo</span>
  		</h1>
   	</div>
   	<div style="margin-top:120px">
   		EpBox编码：<input id="firstEpBoxBM" disabled>
   		EpBox:<input id="firstEpBox" onclick="ep.getFirstEpBox(this)" >
   		
   	</div>
   	<div style="margin-top:120px">
   		MoreEpBox编码：<input id="firstMoreEpBoxBM" disabled >
   		MoreEpBox:<input id="firstMoreEpBox" value2="" oldValue="" onclick="ep.getFirstMoreEpBox(this)" >
   		<button class="btn btn-primary btn-xs" onclick="ep.getFirstMoreEpBoxBM(this)" >获取MoreEpBox的编码</button>
   	</div>
  </body>
</html>
