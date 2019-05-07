var CSSPATH = "/YxBI/resource/plugins";
includecss(CSSPATH + "/button/CSS/toolbar.css");
var ToolBar = Class.create();
ToolBar.prototype = {
	height : "26px;",
	url :  CSSPATH + "/button/image/",
	/**
	 * 初始化
	 * @param {} sAlign 按钮对齐的方向
	 */
	initialize : function(sAlign){
		this.size = toolbar.index;
		toolbar.index += 1;
		this.sAlign = sAlign !== undefined ? sAlign : "left";
		this.writeBar();
	},
	/**
	 * 先创建工具栏
	 */
	writeBar : function() {
		document.write('<table id="System_toolbar" border="0" cellpadding="0" cellspacing="0" width="100%;" class="toolbar">'
						 + '<tr>'
						 	+ '<td>'
								+ '<table border="0" cellpadding="0" align="' + this.sAlign + '" cellspacing="0">'
									+ '<tr id="Tbur' + this.size + '">'
										+ '<td align="middle">&nbsp;</td>'
										+ '<td id="toolBar_bottom" align="middle">&nbsp;</td>'
									+ '</tr>'
								+ '</table>'
							+ '</td>'
						 + '</tr>' 
					 + '</table>');
	},
	/**
	 * 创建button
	 * @param {} id			按钮id或按钮对象
	 * @param {} name		图片名称|按钮名称
	 * @param {} sj	    	按钮单击事件 
	 * @param {} disabled  	是否可用
	 */
	add : function(json) { 				//创建button
		var id = json.id;				//按钮ID
		var name = json.name == undefined ? "" : json.name;	//按钮显示值
		var image = json.image;			//按钮图片名称
		var nameClass = json.nameClass;			//bootstrap 样式 
		var click = json.click;			//按钮的单击事件
		var disabled = json.disabled ? "disabled" : "";	//按钮是否可用
		var sj = "";					//事件
		sj = typeof(click) == "string" ? click : undefined;
		var buttonHTML = this.getHtml(id, name, nameClass,sj, image, disabled);
		$("#toolBar_bottom").before("<td>" + buttonHTML + "</td>");
		//绑定事件
		if(typeof(click) == "function"){
			$("#" + id).click(click);
		}
	},
	/**
	 * 返回按钮的HTML
	 * @param {} id		
	 * @param {} name
	 * @param {} sj		单击事件
	 * @param {} img	图片名称
	 * @param {} disabled
	 * @return {}
	 */
	getHtml : function(id, name, nameClass, sj, img, disabled) {
		if (img != "" && img != undefined) {
			if(img.indexOf(".") == -1){	//在特定图片中截取
				var sLeft = img.split(":")[0] * 1;
				var sLeft = 100 + sLeft * 30;
				if(navigator.userAgent.indexOf("MSIE") > -1){		//IE
					name = "<span style=\"background-image:url('" + this.url + "ico.gif" 
					 + "');background-position:-" + sLeft + "px -120px;width:16px;height:16px;\"></span>"
					 + "&nbsp;" +name;
				}else{			//Chrome、Safari、Firefox
					name = "<div style=\"background-image:url('" + this.url + "ico.gif" 
					 + "');background-position:-" + sLeft + "px -120px;width:16px;height:16px;float: left\"></div>"
					 + "&nbsp;" +name;
				}
			}else{							
				name = "<img src= '" + this.url + img + "' />&nbsp;" + name;
			}
		}else if(nameClass != "" && nameClass != undefined){//bootstrap样式
			name = "<span class= '" + nameClass + "' aria-hidden='true' />&nbsp;" + name;
		}
		sj = sj != null ? " onclick=\"" + sj + "\"" : "";
		var Str = "<table border=0 cellpadding=0 cellspacing=0 onmouseover='toolbar.over(\"" + id + "\")' onmouseout='toolbar.destroy(\"" + id + "\")' onmousedown='toolbar.down(\"" + id + "\")' onmouseup='toolbar.destroy(\"" + id + "\")'>" +
			"<tr><td id='left_" + id + "' style='width:3px;'></td>" +
			"<td onmouseover='toolbar.over(\"" + id + "\")' onmouseout='toolbar.destroy(\"" + id + "\")' onmousedown='toolbar.down(\"" + id + "\")' onmouseup='toolbar.destroy(\"" + id + "\")' id='middle_" + id + "'>" +
			"<button " + disabled + " id='" + id + "'" + sj + "' class='toolButton'>" + name + "</button></td>" +
			"<td id='right_" + id + "' style='width:3px;'></td></tr></table>";
		return Str;
	},
	/**
	 * 是否启用控件
	 * @param {} id
	 * @param {} isTrue
	 */
	disabled : function(id,isTrue){
		isTrue = isTrue == undefined ? true : isTrue;
		$("#" + id)[0].disabled = isTrue;
	},
	/**
	 * 是否隐藏控件
	 * @param {} id
	 * @param {} isShow
	 */
	display : function(id,isShow){
		isShow = isShow == undefined ? "none" : isShow;
		if(isShow == "none"){
			$("#" + id).parent().parent().hide();
		}else{
			$("#" + id).parent().parent().show();
		}
	}
}

var toolbar = {
	index : 0,
	url : CSSPATH + "/button/image/",
	over : function(id) {
		$("#left_" + id)[0].style.cssText = 'width:3px;background-image:url("' + this.url + 'Over_1.png");';
		$("#middle_" + id)[0].style.cssText = 'background-image:url("' + this.url + 'Over_2.png");';
		$("#right_" + id)[0].style.cssText = 'width:3px;background-image:url("' + this.url + 'Over_3.png");';
	},
	destroy : function(id) {
		$("#left_" + id)[0].style.cssText = 'width:3px;';
		$("#middle_" + id)[0].style.cssText = '';
		$("#right_" + id)[0].style.cssText = 'width:3px;';
	},
	down : function(id) {
		$("#left_" + id)[0].style.cssText = 'width:3px;background-image:url("' + this.url + 'Click_1.png");';
		$("#middle_" + id)[0].style.cssText = 'background-image:url("' + this.url + 'Click_2.png");';
		$("#right_" + id)[0].style.cssText = 'width:3px;background-image:url("' + this.url + 'Click_3.png");';
	}
}