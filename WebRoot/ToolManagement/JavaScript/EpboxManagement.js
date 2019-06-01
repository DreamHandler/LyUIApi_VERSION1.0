var EpboxManagement = Class.create();
EpboxManagement.prototype = Object.extend(new LBase(), {
	last_Epbox_rowId : 1,  //系统选中行号
	Epbox_status : 0,  //系统操作状态；0-查询，1-新增，2-修改，3-删除
	/**
     * 初始化
     */
	initLoad : function(){
		EpM.initPage();
	},
	/**
     * 初始化页面布局
     */
	initPage : function(){
		var Height =$(window).height();
		var Width =$(window).width();
		$("#content").height(Height - 5);
		//Epbox信息
		$("#Epbox_div").height($("#content").height() - 10);
		$("#Epbox_grid").height($("#Epbox_div").height() - 35);
		$("#nr_grid").width($("#Epbox_grid").width() - 10);
		$("#Epbox_qry,#Epbox_grid_data").width($("#nr_grid").width());
		$("#nr_grid").height($("#Epbox_grid").height() - 12);
		$("#Epbox_grid_data").height($("#nr_grid").height() - $("#Epbox_qry").height() - 5);
		//详细信息
		$("#Epbox_input_div").width($("#content").width() - $("#Epbox_div").width() - 15);
		$("#Epbox_input_div").height($("#content").height() - 10);
		$("#Epbox_main").height($("#Epbox_input_div").height() - 35);
		$("#Epbox_content,#Epbox_btn,#Epbox_input").width($("#Epbox_main").width() - 10);
		$("#Epbox_content").height($("#Epbox_main").height() - $("#Epbox_btn").height() - 15);
		$(".input_width").width(($("#Epbox_input").width() - $(".input_name").width() - 15)/2);
		$("#BTATUS_radio").width(($("#Epbox_input").width() - $(".input_name").width() - 15)/2 + 10);
		EpM.initEpboxGrid();
	},
	/**
	 * 初始化Epbox_grid
	 */
	initEpboxGrid : function(){
		$("#Epbox_list").jqGrid({
			data: [],
			datatype: "local",
			height: $("#Epbox_grid_data").height() - 40,
			width:$("#Epbox_grid_data").width(),
			colNames:['编码','名称','ep名称','查询SQL','是否显示','中文表头','列宽度','字段名称','可用性','备注'],
			colModel:[
				{name:'VBM',index:'VBM', width:60},
				{name:'VMC',index:'VMC',width:90},
				{name:'VDYMC',index:'VDYMC',width:90,hidden:true},
				{name:'VVALUE',index:'VVALUE',width:90,hidden:true},
				{name:'IXS',index:'IXS',width:90,hidden:true},
				{name:'VZWBT',index:'VZWBT',width:90,hidden:true},
				{name:'VZDMC',index:'VZDMC',width:90,hidden:true},
				{name:'VLKD',index:'VLKD',width:90,hidden:true},
				{name:'BTATUS',index:'BTATUS',width:90,hidden:true},
				{name:'VBZ',index:'VBZ',width:90,hidden:true},
			],
			onSelectRow : EpM.Epbox_onSelectRow,
			beforeSelectRow : EpM.grid_disabled
		});
		EpM.QryEpboxData();
	},
	/**
	 * 系统行选中
	 */
	Epbox_onSelectRow : function(rowid,status){
		EpM.last_Epbox_rowId = rowid;
//		EpM.Epbox_btn(0);
		var rowData = jQuery("#Epbox_list").jqGrid("getRowData",EpM.last_Epbox_rowId);
		for(var key in rowData){
			$("#Epbox_"+key).val(rowData[key]);
		}
	},
	/**
     * 查询系统信息
     */
	QryEpboxData : function(){
		var QryJson={"Epbox_info":$("#Epbox_info").val()};
		ajaxCall(QryJson,"ToolManagement.EpboxManagement","QryEpboxData",EpM.QryEpboxDataHandler,false);
	},
	QryEpboxDataHandler : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			//清空系统信息
			$("#Epbox_list").jqGrid("clearGridData");
			var nodeJson = XmlToJson(node);
			$("#Epbox_list").jqGrid('setGridParam',{data:nodeJson}).trigger("reloadGrid");
			if(nodeJson.length > 0) {
//				if(EpM.Epbox_status == 3){ //删除状态
//					EpM.last_Epbox_rowId = EpM.last_Epbox_rowId==1?EpM.last_Epbox_rowId:EpM.last_Epbox_rowId-1;
//				}
				$("#Epbox_list").jqGrid('setSelection',EpM.last_Epbox_rowId,true);
			} else {//清空数据
//				EpM.emptyValue("Epbox_grid_input");
//				EpM.Epbox_btn(2);
			}
//			EpM.Epbox_status = 0;
//			EpM.info_disabled(false);
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
	 * 系统_按钮组控制
	 */
	Epbox_btn : function(flag){ 
		if(flag == 0){//新增、修改、删除可用，保存、取消不可用
			$("#Epbox_btn_add,#Epbox_btn_update,#Epbox_btn_delete").each(function(i,n){
			      n.disabled = false;
		    });
			$("#Epbox_btn_save,#Epbox_btn_cancel").each(function(i,n){
			      n.disabled = true;
		    });
		}else if(flag == 1){//保存、取消可用，新增、修改、删除不可用
			$("#Epbox_btn_save,#Epbox_btn_cancel").each(function(i,n){
			      n.disabled = false;
		    });
			$("#Epbox_btn_add,#Epbox_btn_update,#Epbox_btn_delete").each(function(i,n){
			      n.disabled = true;
		    });
		}else if(flag == 2){//新增可用，修改、删除、保存、取消不可用
			$("#Epbox_btn_add").each(function(i,n){
			      n.disabled = false;
		    });
			$("#Epbox_btn_update,#Epbox_btn_delete,#Epbox_btn_save,#Epbox_btn_cancel").each(function(i,n){
			      n.disabled = true;
		    });
		}
	},
	/**
	 * 系统_按钮组
	 */
	Epbox_btn_add : function(){
		EpM.Epbox_status = 1;
		EpM.Epbox_btn(1);
		EpM.info_disabled(true);
		$("#Epbox_VSYSNO,#Epbox_VNAME").each(function(i,n){
		      n.disabled = false;
		      $("#"+n.id).val("")
	    });
		$("#Epbox_VSYSNO").focus();
	},
	Epbox_btn_update : function(){
		EpM.Epbox_status = 2;
		EpM.Epbox_btn(1);
		EpM.info_disabled(true);
		$("#Epbox_VNAME").each(function(i,n){
		      n.disabled = false;
	    });
		$("#Epbox_VNAME").select();
	},
	Epbox_btn_delete : function(){
		EpM.Epbox_status = 3;
		var VSYSNO = jQuery("#Epbox_list").jqGrid("getRowData",EpM.last_Epbox_rowId).VSYSNO;
		var QryJson={"VSYSNO":VSYSNO};
		ajaxCall(QryJson,"SystemMaintenance.Epbox_Menu","DeleteSystemData",EpM.Epbox_btn_delete_handler,true);
	},
	Epbox_btn_delete_handler : function(){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("删除成功！");
				EpM.Epbox_btn_cancel();
			}else{
				alert("删除失败！");
			}
		}
	},
	Epbox_btn_save : function(){
		var Epbox_VSYSNO = $("#Epbox_VSYSNO").val();
		var bool = false;
		//获取系统的VascNum的最大值
		var AllData = $("#Epbox_list").jqGrid("getRowData");
		for(var i=0;i<AllData.length;i++){
			var VSYSNO = AllData[i].VSYSNO;
			if(VSYSNO == Epbox_VSYSNO){ //判断新增的系统编码是否存在
				bool = true;
				alert("系统编码【"+Epbox_VSYSNO+"】已存在，请重新输入！");
				$("#Epbox_VSYSNO").select();
				break;
			}
		}
		if(bool){
			return;
		}
		var QryJson={"status":EpM.Epbox_status,"VSYSNO":$("#Epbox_VSYSNO").val(),
					"VNAME":$("#Epbox_VNAME").val()};
		ajaxCall(QryJson,"SystemMaintenance.Epbox_Menu","SaveSystemData",EpM.Epbox_btn_save_handler,true);
	},
	Epbox_btn_save_handler : function(){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("保存成功！");
				EpM.Epbox_btn_cancel();
			}else{
				alert("保存失败！");
			}
		}
	},
	Epbox_btn_cancel : function(){
		EpM.QrySystemData();
		$("#Epbox_VSYSNO,#Epbox_VNAME").each(function(i,n){
		      n.disabled = true;
	    });
	},
	/**
	 * 筛选可用设置
	 */
	info_disabled : function(bool){
		$("#Epbox_info").each(function(i,n){
		      n.disabled = bool;
	    });
	}
});
var EpM = new EpboxManagement();