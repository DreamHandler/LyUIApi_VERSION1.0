var Group_User = Class.create();
Group_User.prototype = Object.extend(new LBase(), {
	/**
     * 初始化
     */
	initLoad : function(){
		GU.initPage();
	},
	/**
     * 初始化页面布局
     */
	initPage : function(){
		var Height =$(window).height();
		var Width =$(window).width();
		$("#content").height(Height - 35)
		//操作员组信息
		$("#group_div").height($("#content").height() - 10)
		$("#group_grid").height($("#group_div").height() - 40)
		$("#nr_grid,#group_btn").width($("#group_grid").width() - 10)
		$("#nr_grid").height($("#group_grid").height() - $("#group_btn").height() - 15)
	}
});
var GU = new Group_User();