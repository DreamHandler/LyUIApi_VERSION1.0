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
		$("#content").height(Height - 5);
		//操作员组信息
		$("#group_div").height($("#content").height() - 10);
		$("#group_grid").height($("#group_div").height() - 35);
		$("#nr_grid,#group_btn").width($("#group_grid").width() - 10);
		$("#group_qry,#group_grid_data,#group_grid_input").width($("#nr_grid").width());
		$("#nr_grid").height($("#group_grid").height() - $("#group_btn").height() - 15);
		$("#group_grid_data").height(($("#nr_grid").height() - $("#group_qry").height())/3*2);
		$("#group_grid_input").height($("#nr_grid").height() - $("#group_qry").height() - $("#group_grid_data").height() - 15);
		GU.initGroupGrid();
		//管理员信息
		$("#admin_div").width($("#content").width() - $("#group_div").width() - 15);
		$("#admin_div").height($("#content").height() - 10);
		$("#admin_grid").height($("#admin_div").height() - 35);
		$("#admin_nr_grid,#admin_btn").width($("#admin_grid").width() - 10);
		$("#admin_qry,#admin_grid_data,#admin_grid_input").width($("#admin_nr_grid").width() - 5);
		$("#admin_nr_grid").height($("#admin_grid").height() - $("#admin_btn").height() - 15);
		$("#admin_grid_data,#admin_grid_input").height(($("#admin_nr_grid").height() - $("#admin_qry").height())/2 - 5);
		
		GU.initAdminGrid();
	},
	/**
	 * 初始化管理员组grid
	 */
	group_grid : null,
	initGroupGrid : function(){
		GU.group_grid = $("#group_list").jqGrid({
			data: [],
			datatype: "local",
			height: $("#group_grid_data").height() - 40,
			width:$("#group_grid_data").width(),
			colNames:['编码','名称'],
			colModel:[
				{name:'VascNum',index:'VascNum', width:60},
				{name:'VascName',index:'VascName',width:90}
			]
		});
		GU.QryGroupData();
	},
	/**
     * 查询管理员组信息
     */
	QryGroupData : function(){
		var QryJson={};
		ajaxCall(QryJson,"SystemMaintenance.Group_User","QryGroupData",GU.QryGroupDataHandler,false);
	},
	QryGroupDataHandler : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			var nodeJson = XmlToJson(node);
			$("#group_list").jqGrid('setGridParam',{data:nodeJson}).trigger("reloadGrid");
		}
	},
	/**
	 * 初始化管理员grid
	 */
	admin_grid : null,
	initAdminGrid : function(){
		GU.admin_grid = $("#admin_list").jqGrid({
			data: [],
			datatype: "local",
			height: $("#admin_grid_data").height() - 140,
			width:$("#admin_grid_data").width() - 100,
			colNames:['编码','名称','登录账号'],
			colModel:[
				{name:'VJOBNUM',index:'VJOBNUM', width:60},
				{name:'VNAME',index:'VNAME',width:90},
				{name:'VUSER',index:'VUSER',width:90}
			]
		});
		GU.QryAdminData();
	},
	/**
     * 查询管理员信息
     */
	QryAdminData : function(){
		var QryJson={};
		ajaxCall(QryJson,"SystemMaintenance.Group_User","QryAdminData",GU.QryAdminDataHandler,false);
	},
	QryAdminDataHandler : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			var nodeJson = XmlToJson(node);
			$("#admin_list").jqGrid('setGridParam',{data:nodeJson}).trigger("reloadGrid");
		}
	}
});
var GU = new Group_User();