var Group_User = Class.create();
Group_User.prototype = Object.extend(new LBase(), {
	last_group_rowId : 0,   //管理员组选中行号
	group_VascNum : "",    //管理员选中行的VascNum值
	last_admin_rowId : 0,  //管理员选中行号
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
		//信息录入部分垂直居中
		var group_middle = ($("#group_grid_input").height() - $("#group_middle").height())/2
		$("#group_middle").css("margin-top",group_middle+"px");
		GU.initGroupGrid();
		//管理员信息
		$("#admin_div").width($("#content").width() - $("#group_div").width() - 15);
		$("#admin_div").height($("#content").height() - 10);
		$("#admin_grid").height($("#admin_div").height() - 35);
		$("#admin_nr_grid,#admin_btn").width($("#admin_grid").width() - 10);
		$("#admin_qry,#admin_grid_data,#admin_grid_input").width($("#admin_nr_grid").width() - 5);
		$("#admin_nr_grid").height($("#admin_grid").height() - $("#admin_btn").height() - 15);
		$("#admin_grid_data,#admin_grid_input").height(($("#admin_nr_grid").height() - $("#admin_qry").height())/2 - 5);
		//信息录入部分垂直居中
		var admin_middle = ($("#admin_grid_input").height() - $("#admin_middle").height())/2
		$("#admin_middle").css("margin-top",admin_middle+"px");
		GU.initAdminGrid();
	},
	/**
	 * 初始化管理员组grid
	 */
	initGroupGrid : function(){
		$("#group_list").jqGrid({
			data: [],
			datatype: "local",
			height: $("#group_grid_data").height() - 40,
			width:$("#group_grid_data").width(),
			colNames:['编码','名称'],
			colModel:[
				{name:'VascNum',index:'VascNum', width:60},
				{name:'VascName',index:'VascName',width:90}
			],
			onSelectRow : GU.grid_onSelectRow
		});
		GU.QryGroupData();
	},
	/**
	 * 管理员组行选中
	 */
	grid_onSelectRow : function(rowid,status){
		if(GU.last_group_rowId != rowid){
			GU.last_group_rowId = rowid;
			var rowData=jQuery("#group_list").jqGrid("getRowData",GU.last_group_rowId);
			$("#group_VascNum").val(rowData.VascNum);
			$("#group_VascName").val(rowData.VascName);
			//查询管理员信息
			GU.group_VascNum = rowData.VascNum;
			GU.QryAdminData();
		}
	},
	/**
     * 查询管理员组信息
     */
	QryGroupData : function(){
		var QryJson={"group_info":$("#group_info").val()};
		ajaxCall(QryJson,"SystemMaintenance.Group_User","QryGroupData",GU.QryGroupDataHandler,false);
	},
	QryGroupDataHandler : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			//清空管理员组信息
			$("#group_list").jqGrid("clearGridData");
			var nodeJson = XmlToJson(node);
			$("#group_list").jqGrid('setGridParam',{data:nodeJson}).trigger("reloadGrid");
			GU.last_group_rowId = 0;
			if(nodeJson.length > 0) {
				$("#group_list").jqGrid('setSelection',1,true);
			} else {//清空admin_grid_input数据
				GU.emptyValue("group_grid_input");
				//清空管理员信息
				GU.emptyValue("admin_grid_input");
				$("#admin_list").jqGrid("clearGridData");
			}
		}
	},
	/**
	 * 初始化管理员grid
	 */
	initAdminGrid : function(){
		$("#admin_list").jqGrid({
			data: [],
			datatype: "local",
			height: $("#admin_grid_data").height() - 140,
			width:$("#admin_grid_data").width(),
			colNames:['编码','名称','账号','VascNum','VascName','VPSWD'],
			colModel:[
				{name:'VJOBNUM',index:'VJOBNUM', width:90},
				{name:'VNAME',index:'VNAME',width:90},
				{name:'VUSER',index:'VUSER',width:90},
				{name:'VascNum',index:'VascNum',width:90,hidden:true},
				{name:'VascName',index:'VascName',width:90,hidden:true},
				{name:'VPSWD',index:'VPSWD',width:90,hidden:true}
			],
			onSelectRow : GU.admin_onSelectRow
		});
	},
	/**
	 * 管理员行选中
	 */
	admin_onSelectRow : function(rowid,status){
		if(GU.last_admin_rowId != rowid){
			GU.last_admin_rowId = rowid;
			var rowData=jQuery("#admin_list").jqGrid("getRowData",GU.last_admin_rowId);
			for(var key in rowData){
				$("#admin_"+key).val(rowData[key]);
			}
		}
	},
	/**
     * 查询管理员信息
     */
	QryAdminData : function(){
		var QryJson={"VascNum":GU.group_VascNum,"admin_info":$("#admin_info").val()};
		ajaxCall(QryJson,"SystemMaintenance.Group_User","QryAdminData",GU.QryAdminDataHandler,true);
	},
	QryAdminDataHandler : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			//清空管理员信息
			$("#admin_list").jqGrid("clearGridData");
			var nodeJson = XmlToJson(node);
			$("#admin_list").jqGrid('setGridParam',{data:nodeJson}).trigger("reloadGrid");
			GU.last_admin_rowId = 0;
			if(nodeJson.length > 0){
				$("#admin_list").jqGrid('setSelection',1,true);
			}else {//清空admin_grid_input数据
				GU.emptyValue("admin_grid_input");
			}
		}
	},
	/**
	 * 清空id下的input数据
	 */
	emptyValue : function(id){
		$("#"+ id +" input").each(function(i,n){
		      $("#"+ n.id).val("");
	    });
	}
});
var GU = new Group_User();