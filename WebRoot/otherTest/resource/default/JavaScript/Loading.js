/**
 * 进行后台处理显示正在加载
 */
var Loading = Class.create();
Loading.prototype = Object.extend(new TBase(), {
	run : function(sSM) {
		sSM = sSM == null ? "数据处理中..." : sSM;
		if (this.div == undefined) {
			this.div = $("<div align='center' style='position: absolute;background-color: #D7D7D7;width: 200px;height: 70px;z-index: 1000;top:"+ (window.screen.height / 4) + "px;left:"+(document.body.clientWidth / 2-80) + "px;'>");
			divHTML = $("<br><i class='ace-icon fa fa-spinner fa-spin black bigger-200'></i><br><span id='_load_Msg'>"+ sSM +"</span>");
			divHTML.appendTo(this.div);
			this.oldDiv = $("<div class='col-xs-12' style='position: absolute;top: 0px;left: 0px;FILTER: alpha(opacity=40);opacity: 0.4;BACKGROUND-COLOR: #EEEEEE;height:100%;'>");
			this.div.appendTo("body");
			this.oldDiv.insertBefore(this.div);
		}
		$(this.div).css({"display": ""});
		$(this.oldDiv).css({"display": ""});
		$(this.oldDiv).css("zIndex","1000");
	},
	stop : function() {
		if (this.div != undefined) {
			$(this.div).css({"display": "none"});
			$(this.oldDiv).css({"display": "none"});
			this.div = undefined;
		}
	}
});
var load = new Loading();