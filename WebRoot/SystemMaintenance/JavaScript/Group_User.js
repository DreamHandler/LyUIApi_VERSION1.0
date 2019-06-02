var Group_User = Class.create();
Group_User.prototype = Object.extend(new LBase(), {
	last_group_rowId : 1,   //管理员组选中行号
	group_btn_status : 0,   //管理员组按钮状态
	group_status : 0,      //管理员组操作状态；0-查询，1-新增，2-修改，3-删除
	last_admin_rowId : 1,  //管理员选中行号
	admin_btn_status : 0,   //管理员按钮状态
	admin_status : 0,      //管理员操作状态；0-查询，1-新增，2-修改，3-删除
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
			onSelectRow : GU.group_onSelectRow,
			beforeSelectRow : GU.grid_disabled
		});
		GU.QryGroupData();
	},
	/**
	 * 管理员组行选中
	 */
	group_onSelectRow : function(rowid,status){
		GU.last_group_rowId = rowid;
		GU.group_btn(0);
		var rowData = jQuery("#group_list").jqGrid("getRowData",GU.last_group_rowId);
		$("#group_VascNum").val(rowData.VascNum);
		$("#group_VascName").val(rowData.VascName);
		//查询管理员信息
		GU.QryAdminData();
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
			if(nodeJson.length > 0) {
				if(GU.group_status == 3){ //删除状态
					GU.last_group_rowId = GU.last_group_rowId==1?GU.last_group_rowId:GU.last_group_rowId-1;
				}
				$("#group_list").jqGrid('setSelection',GU.last_group_rowId,true);
			} else {//清空admin_grid_input数据
				GU.emptyValue("group_grid_input");
				GU.group_btn(2);
				//清空管理员信息
				GU.emptyValue("admin_grid_input");
				$("#admin_list").jqGrid("clearGridData");
			}
			GU.group_status = 0;
			GU.info_disabled(false);
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
			onSelectRow : GU.admin_onSelectRow,
			beforeSelectRow : GU.grid_disabled
		});
	},
	/**
	 * 管理员行选中
	 */
	admin_onSelectRow : function(rowid,status){
		GU.last_admin_rowId = rowid;
		GU.admin_btn(0);
		var rowData = jQuery("#admin_list").jqGrid("getRowData",GU.last_admin_rowId);
		for(var key in rowData){
			$("#admin_"+key).val(rowData[key]);
		}
	},
	/**
     * 查询管理员信息
     */
	QryAdminData : function(){
		var group_VascNum = jQuery("#group_list").jqGrid("getRowData",GU.last_group_rowId).VascNum;
		var QryJson={"VascNum":group_VascNum,"admin_info":$("#admin_info").val()};
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
			if(nodeJson.length > 0){
				if(GU.admin_status == 3){ //删除状态
					GU.last_admin_rowId = GU.last_admin_rowId==1?GU.last_admin_rowId:GU.last_admin_rowId-1;
				}
				$("#admin_list").jqGrid('setSelection',GU.last_admin_rowId,true);
			}else {//清空admin_grid_input数据
				GU.emptyValue("admin_grid_input");
				GU.admin_btn(2);
			}
			GU.admin_status = 0;
			GU.info_disabled(false);
		}
	},
	/**
	 * 清空id下的input数据
	 */
	emptyValue : function(id){
		$("#"+ id +" input").each(function(i,n){
		      $("#"+ n.id).val("");
	    });
	},
	/**
	 * 管理员组按钮控制
	 */
	group_btn : function(flag){
		GU.group_btn_status = flag;
		if(GU.group_btn_status == 0){//新增、修改、删除可用，保存、取消不可用
			$("#group_btn_add,#group_btn_update,#group_btn_delete").each(function(i,n){
			      n.disabled = false;
		    });
			$("#group_btn_save,#group_btn_cancel").each(function(i,n){
			      n.disabled = true;
		    });
		}else if(GU.group_btn_status == 1){//保存、取消可用，新增、修改、删除不可用
			$("#group_btn_save,#group_btn_cancel").each(function(i,n){
			      n.disabled = false;
		    });
			$("#group_btn_add,#group_btn_update,#group_btn_delete").each(function(i,n){
			      n.disabled = true;
		    });
		}else if(GU.group_btn_status == 2){//新增可用，修改、删除、保存、取消不可用
			$("#group_btn_add").each(function(i,n){
			      n.disabled = false;
		    });
			$("#group_btn_update,#group_btn_delete,#group_btn_save,#group_btn_cancel").each(function(i,n){
			      n.disabled = true;
		    });
		}
	},
	/**
	 * 管理员按钮控制
	 */
	admin_btn : function(flag){
		GU.admin_btn_status = flag;
		if(GU.admin_btn_status == 0){//新增、修改、删除可用，保存、取消不可用
			$("#admin_btn_add,#admin_btn_update,#admin_btn_delete").each(function(i,n){
			      n.disabled = false;
		    });
			$("#admin_btn_save,#admin_btn_cancel").each(function(i,n){
			      n.disabled = true;
		    });
		}else if(GU.admin_btn_status == 1){//保存、取消可用，新增、修改、删除不可用
			$("#admin_btn_save,#admin_btn_cancel").each(function(i,n){
			      n.disabled = false;
		    });
			$("#admin_btn_add,#admin_btn_update,#admin_btn_delete").each(function(i,n){
			      n.disabled = true;
		    });
		}else if(GU.admin_btn_status == 2){//新增可用，修改、删除、保存、取消不可用
			$("#admin_btn_add").each(function(i,n){
			      n.disabled = false;
		    });
			$("#admin_btn_update,#admin_btn_delete,#admin_btn_save,#admin_btn_cancel").each(function(i,n){
			      n.disabled = true;
		    });
		}
	},
	/**
	 * 管理员组_按钮组
	 */
	group_btn_add : function(){
		if(!GU.grid_disabled()){
			return;
		}
		GU.group_status = 1;
		GU.group_btn(1);
		GU.info_disabled(true);
		$("#group_VascName").each(function(i,n){
		      n.disabled = false;
		      $("#"+n.id).val("")
	    });
		//获取管理员组的VascNum的最大值，修改为流水号功能可以去掉
		var AllData = $("#group_list").jqGrid("getRowData");
		var VascNum_max = 0;
		for(var i=0;i<AllData.length;i++){
			var VascNum = parseInt(AllData[i].VascNum);
			if(VascNum > VascNum_max){
				VascNum_max = VascNum;
			}
		}
		VascNum_max += 1;
		$("#group_VascNum").val(VascNum_max<10?"0"+VascNum_max:VascNum_max);
		$("#group_VascName").focus();
	},
	group_btn_update : function(){
		if(!GU.grid_disabled()){
			return;
		}
		GU.group_status = 2;
		GU.group_btn(1);
		GU.info_disabled(true);
		$("#group_VascName").each(function(i,n){
		      n.disabled = false;
	    });
		$("#group_VascName").select();
	},
	group_btn_delete : function(){
		GU.group_status = 3;
		if(!GU.grid_disabled()){
			return;
		}
		var VascNum = jQuery("#group_list").jqGrid("getRowData",GU.last_group_rowId).VascNum;
		var QryJson={"VascNum":VascNum};
		ajaxCall(QryJson,"SystemMaintenance.Group_User","DeleteGroupData",GU.group_btn_delete_handler,true);
	},
	group_btn_delete_handler : function(){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("删除成功！");
				GU.group_btn_cancel();
			}else{
				alert("删除失败！");
			}
		}
	},
	group_btn_save : function(){
		var QryJson={"status":GU.group_status,"VascNum":$("#group_VascNum").val(),
					"VascName":$("#group_VascName").val()};
		ajaxCall(QryJson,"SystemMaintenance.Group_User","SaveGroupData",GU.group_btn_save_handler,true);
	},
	group_btn_save_handler : function(){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("保存成功！");
				GU.group_btn_cancel();
			}else{
				alert("保存失败！");
			}
		}
	},
	group_btn_cancel : function(){
		GU.QryGroupData();
		$("#group_VascNum,#group_VascName").each(function(i,n){
		      n.disabled = true;
	    });
	},
	/**
	 * 管理员_按钮组
	 */
	admin_btn_add : function(){
		if(!GU.grid_disabled()){
			return;
		}
		GU.admin_status = 1;
		GU.admin_btn(1);
		GU.info_disabled(true);
		$("#admin_VJOBNUM,#admin_VNAME,#admin_VUSER,#admin_VPSWD").each(function(i,n){
		      n.disabled = false;
		      $("#"+n.id).val("");
	    });
		var AllData = $("#group_list").jqGrid("getRowData");
		if(AllData.length != undefined && AllData.length != 0){ //如果有管理员组选中，管理员新增的默认为该组的，否则自己选择管理员组
			var VascNum = jQuery("#group_list").jqGrid("getRowData",GU.last_group_rowId).VascNum;
			var VascName = jQuery("#group_list").jqGrid("getRowData",GU.last_group_rowId).VascName;
			$("#admin_VascNum").val(VascNum);
			$("#admin_VascName").val(VascName);
		}else {
			$("#admin_VascName").each(function(i,n){
			      n.disabled = false;
			      $("#"+n.id).val("");
		    });
		}
		$("#admin_VJOBNUM").focus();
	},
	admin_btn_update : function(){
		if(!GU.grid_disabled()){
			return;
		}
		GU.admin_status = 2;
		GU.admin_btn(1);
		GU.info_disabled(true);
		$("#admin_VNAME,#admin_VascName,#admin_VUSER,#admin_VPSWD").each(function(i,n){
		      n.disabled = false;
	    });
		$("#admin_VNAME").select();
	},
	admin_btn_delete : function(){
//		$.YxDialog.error("111");
//		$.YxDialog.confirm("确认删除管理员【1】？","确认删除",function(bool){
//			if(!bool){
//				return;
//			}
//		});
		GU.admin_status = 3;
		if(!GU.grid_disabled()){
			return;
		}
		var VJOBNUM = jQuery("#admin_list").jqGrid("getRowData",GU.last_admin_rowId).VJOBNUM;
		var VascNum = jQuery("#group_list").jqGrid("getRowData",GU.last_group_rowId).VascNum;
		var QryJson={"VJOBNUM":VJOBNUM,"VascNum":VascNum};
		ajaxCall(QryJson,"SystemMaintenance.Group_User","DeleteAdminData",GU.admin_btn_delete_handler,true);
	},
	admin_btn_delete_handler : function(){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("删除成功！");
				GU.admin_btn_cancel();
			}else{
				alert("删除失败！");
			}
		}
	},
	admin_btn_save : function(){
		var bool = true;
		$("#admin_VJOBNUM,#admin_VNAME,#admin_VUSER,#admin_VPSWD").each(function(i,n){
			var value = $("#"+n.id).val();
			if(value == "" || value == null ||  value == undefined){
				var name = $("#"+n.id).attr("name");
				alert("【"+name+"】不能为空，请输入！");
				$("#"+n.id).focus();
				bool = false;
				return false;
			}
	    });
		if(!bool){
			return;
		}
		//修改为流水号功能可以去掉
		var VascNum = $("#admin_VascNum").val();
		if(VascNum == "" || VascNum == null || VascNum == undefined){
			alert("请为管理员选择合适的分组！");
			$("#admin_VascName").val("");
			$("#admin_VascName").focus();
			return;
		}
		var QryJson={"status":GU.admin_status,"VJOBNUM":$("#admin_VJOBNUM").val(),
					"VNAME":$("#admin_VNAME").val(),"VascNum":VascNum,
					"VascName":$("#admin_VascName").val(),"VUSER":$("#admin_VUSER").val(),
					"VPSWD":$("#admin_VPSWD").val()};
		ajaxCall(QryJson,"SystemMaintenance.Group_User","SaveAdminData",GU.admin_btn_save_handler,true);
	},
	admin_btn_save_handler : function(){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("保存成功！");
				GU.admin_btn_cancel();
			}else{
				alert("保存失败！");
			}
		}
	},
	admin_btn_cancel : function(){
		GU.QryAdminData();
		$("#admin_VJOBNUM,#admin_VNAME,#admin_VascName,#admin_VUSER,#admin_VPSWD").each(function(i,n){
		      n.disabled = true;
	    });
	},
	/**
	 * 禁止对grid进行操作
	 */
	grid_disabled : function(rowid,e){
		if(GU.group_status == 1){
			alert("请先保存或者取消对管理员组的操作！")
			$("#group_VascName").focus();
			return false;
		}else if(GU.group_status == 2){
			alert("请先保存或者取消对管理员组的操作！")
			$("#group_VascName").select();
			return false;
		}else if(GU.admin_status == 1){
			alert("请先保存或者取消对管理员的操作！")
			$("#admin_VJOBNUM").focus();
			return false;
		}else if(GU.admin_status == 2){
			alert("请先保存或者取消对管理员的操作！")
			$("#admin_VNAME").select();
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 获取管理员组ep
	 */
	getEpBox : function(aThis){
		getEpBox(aThis,{epName:'TBGROUP',epJson:[{id:'admin_VascName',value:1},{id:'admin_VascNum',value:0}]});
	},
	/**
	 * 筛选可用设置
	 */
	info_disabled : function(bool){
		$("#group_info,#admin_info").each(function(i,n){
		      n.disabled = bool;
	    });
	}
});
var GU = new Group_User();