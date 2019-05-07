var MAIN={
	bwidth : null,
	bheight : null,
	NowXH : "",
	InLoad : function(){
		MAIN.bwidth=document.body.clientWidth;
		MAIN.bheight=document.body.clientHeight;
		MAIN.InCss();
//		MAIN.Inmenu2();
		var cs = "<xml><Rows><Row CBM='111' CMC='dsdasd' /></Rows></xml>";
		var Doc = StrToXml(cs);
//		alert(Doc.documentElement.selectSingleNode("Rows/Row").getAttribute("CMC"));
		$("#Pageframe").attr("src","home.jsp");
		ajaxCall({},"operation.YHGL.YHGLSet","QryAll",MAIN.DataHander,false);
	},
	DataHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			var eles= node.documentElement.selectSingleNode("FieldsValue").childNodes
			if(eles.length>0){
				if(window.confirm("有"+eles.length+"条养护信息需要处理，是否现在处理？")){
					$("#Pageframe").attr("src","YHPage/YHGL.jsp");
				}
			}
		}
	},
	InCss : function(){
		$(".con").width(MAIN.bwidth);
		$(".con").height(MAIN.bheight);
		
		$(".head").width(MAIN.bwidth);
		
		$(".content_left").height(MAIN.bheight-151);
		
		$("#Pageframe").height(MAIN.bheight-151);
		$("#Pageframe").width(MAIN.bwidth-192);
	},
	Inmenu2 : function(){
		var inhtml = "<div class='MenuChild' onmouseover='MAIN.MenuCStyle(this,1);' onmouseout='MAIN.MenuCStyle(this,2);'><div class='menu2txt'>原药库管理</div></div>" +
				"<div class='MenuChild' onmouseover='MAIN.MenuCStyle(this,1);' onmouseout='MAIN.MenuCStyle(this,2);'><div class='menu2txt'>中间库管理</div></div>";
		document.getElementById("menu2").innerHTML=inhtml;
	},
	Menu1Style : function(obj,sta){
		if(sta==1){
			$(obj).css("background-image","url('CssSourse/images/menu1_bg.jpg')");
			$(obj).css("color","#FFFFFF");
		}else{
			$(obj).css("background-image","");
			$(obj).css("color","#ECE9D5");
		}
	},
	MenuCStyle : function(obj,sta){
		if(sta==1){
			$(obj).css("background-image","url('CssSourse/images/left_btn_ck.png')");
		}else{
			$(obj).css("background-image","url('CssSourse/images/left_btn.png')");
		}
	},
	Menu1Click : function(obj){
//		if(MAIN.NowXH!=""){
			$(".Menu2Div").hide();
			MAIN.NowXH = obj.getAttribute("IXH");
			$("#menu2Div_"+obj.getAttribute("IXH")).show();
//		}
	},
	Menu2Click : function(obj){
		$("#Pageframe").attr("src",obj.getAttribute("URLDZ"));
	}
}