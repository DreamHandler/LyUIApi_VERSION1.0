<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>管理中心登陆</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<link rel="stylesheet" type="text/css" href="CssSourse/css/Login.css">
	<style type="text/css">
		.SavBTN{
			width:70px;
			height:18px;
			border:0px;
			background-image:url(images/bt_login.gif);
		}
	</style>
  </head>
  <body style="overflow: none;">
<table width="100%" height="100%" cellpadding="0" cellspacing="0">
	<tr>
		<td align="center">
			<div>
				<table class="bg_table" cellpadding="0" cellspacing="0" style="">
					<tr class="bg_table_tr1">
						<td colspan="2"><div class="bg_table_title"></div></td>
					</tr>
					<tr class="bg_table_tr2">
						<td colspan="2"></td>
					</tr>
					<tr class="bg_table_tr3">
						<td>
							<table width="100%" height="100%" cellpadding="0" cellspacing="0">
								<tr>
									<td class="img_tr1"></td>
									<td class="img_tr2" align="center">
										<form name="form1" method="post" action="http.do">
											<table width="100%" height="80%" cellpadding="0" cellspacing="0">
												<tr class="login_table_tr1" valign="bottom" align="center">
													<td><div class="login_table_title"></div></td>
												</tr>
												<tr><td align="center" class="login_user">用户名：<input id="u" class="ipt_login" type="text" name="username" size="18" maxlength="50"></td></tr>
												<tr><td align="center" class="login_psword">密&nbsp;&nbsp;码：<input id="p" class="ipt_login" type="password" name="password" size="18" maxlength="200"></td></tr>
												<tr>
													<td align="center">
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
														<input type="submit" id="SavBTN" class="SavBTN" value="登  录" />
													</td>
												</tr>
											</table>
										</form>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr class="bg_table_tr4">
						<td colspan="2"></td>
					</tr>
					<tr class="bg_table_tr5">
						<td colspan="2">
							
						</td>
					</tr>
				</table>
			</div>
		</td>
	</tr>
</table>
  </body>
</html>
<script>
var password = document.getElementById("p");
var username = document.getElementById("u");
var isIE = navigator.userAgent.indexOf('MSIE') != -1;  
function init(){
	//权限检测
	//if(!browerTest())
	//	return;
	username.focus();
}
init();
function login(){
    document.form.submit();
}
function rewrite(){    
	password.value = "";
	password.focus();
}
</script>