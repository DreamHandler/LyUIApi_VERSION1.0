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
		EpM.Epbox_btn(0);
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
		EpM.ajaxCall(QryJson,"ToolManagement.EpboxManagement","QryEpboxData",EpM.QryEpboxDataHandler,false);
	},
	QryEpboxDataHandler : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = EpM.StrToXml(response.responseText);
			}
			//清空系统信息
			$("#Epbox_list").jqGrid("clearGridData");
			var nodeJson = EpM.XmlToJson(node);
			$("#Epbox_list").jqGrid('setGridParam',{data:nodeJson}).trigger("reloadGrid");
			if(nodeJson.length > 0) {
//				if(EpM.Epbox_status == 3){ //删除状态
//					EpM.last_Epbox_rowId = EpM.last_Epbox_rowId==1?EpM.last_Epbox_rowId:EpM.last_Epbox_rowId-1;
//				}
				$("#Epbox_list").jqGrid('setSelection',EpM.last_Epbox_rowId,true);
			} else {//清空数据
				EpM.emptyValue("Epbox_input");
				EpM.Epbox_btn(2);
			}
			EpM.Epbox_status = 0;
			EpM.info_disabled(false);
		}
	},
	/**
	 * 清空id下的input数据
	 */
	emptyValue : function(id){
		$("#"+ id +" input[type='text']").each(function(i,n){
		      $("#"+ n.id).val("");
	    });
		$("#"+ id +" textarea").each(function(i,n){
		      $("#"+ n.id).val("");
	    });
		$("#Epbox_BTATUS1")[0].checked = true;
		$("#Epbox_BTATUS2")[0].checked = false;
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
		EpM.input_disabled("Epbox_input",false);
		EpM.emptyValue("Epbox_input");
		//获取epbox的VBM的最大值，修改为流水号功能可以去掉
		var AllData = $("#Epbox_list").jqGrid("getRowData");
		var VBM_max = 0;
		for(var i=0;i<AllData.length;i++){
			var VBM = parseInt(AllData[i].VBM);
			if(VBM > VBM_max){
				VBM_max = VBM;
			}
		}
		VBM_max += 1;
		$("#Epbox_VBM").val(VBM_max);
		$("#Epbox_VMC").focus();
	},
	Epbox_btn_update : function(){
		EpM.Epbox_status = 2;
		EpM.Epbox_btn(1);
		EpM.info_disabled(true);
		EpM.input_disabled("Epbox_input",false);
		$("#Epbox_VMC").select();
	},
	Epbox_btn_delete : function(){
		EpM.Epbox_status = 3;
		var VBM = jQuery("#Epbox_list").jqGrid("getRowData",EpM.last_Epbox_rowId).VBM;
		var QryJson={"VBM":VBM};
		EpM.ajaxCall(QryJson,"ToolManagement.EpboxManagement","DeleteEpboxData",EpM.Epbox_btn_delete_handler,true);
	},
	Epbox_btn_delete_handler : function(){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = EpM.StrToXml(response.responseText);
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
		//判断是否填写
		var bool = true;
		$("#Epbox_VDYMC,#Epbox_VVALUE,#Epbox_VZWBT,#Epbox_VZDMC,#Epbox_VLKD").each(function(i,n){
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
		var VBM = $("#Epbox_VBM").val();
		var VMC = $("#Epbox_VMC").val();
		var VDYMC = $("#Epbox_VDYMC").val();
		var VVALUE = $("#Epbox_VVALUE").val();
		var VZWBT = $("#Epbox_VZWBT").val();
		var VZDMC = $("#Epbox_VZDMC").val();
		var VLKD = $("#Epbox_VLKD").val();
		var VBZ = $("#Epbox_VBZ").val();
		var BTATUS = "";
		$("#BTATUS_radio input[name='Epbox_BTATUS']").each(function(i,n){
		      if($("#"+n.id)[0].checked){
		    	  BTATUS = n.value;
		      }
	    });
		var QryJson={"status":EpM.Epbox_status,"VBM":VBM,"VMC":VMC,"VDYMC":VDYMC,"VVALUE":VVALUE,
                     "VZWBT":VZWBT,"VZDMC":VZDMC,"VLKD":VLKD,"VBZ":VBZ,"BTATUS":BTATUS};
		EpM.ajaxCall(QryJson,"ToolManagement.EpboxManagement","SaveEpboxData",EpM.Epbox_btn_save_handler,true);
	},
	Epbox_btn_save_handler : function(){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = EpM.StrToXml(response.responseText);
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
		EpM.QryEpboxData();
		EpM.input_disabled("Epbox_input",true);
	},
	/**
	 * 筛选可用设置
	 */
	info_disabled : function(bool){
		$("#Epbox_info").each(function(i,n){
		      n.disabled = bool;
	    });
	},
	/**
	 * 禁止对grid进行操作
	 */
	grid_disabled : function(rowid,e){
		if(EpM.Epbox_status == 1){
			alert("请先保存或者取消对epbox的操作！")
			$("#Epbox_VMC").focus();
			return false;
		}else if(EpM.Epbox_status == 2){
			alert("请先保存或者取消对epbox的操作！")
			$("#Epbox_VMC").select();
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 禁止对id下的相关对象进行操作
	 */
	input_disabled : function(id,bool){
		$("#"+ id +" input[type='text']").each(function(i,n){
			if(n.id != "Epbox_VBM"){
				n.disabled = bool;
			}
			
	    });
		$("#"+ id +" textarea").each(function(i,n){
			n.disabled = bool;
			if(bool) {
				$("#"+n.id).css("background","rgb(238, 238, 238)")
			}else {
				$("#"+n.id).css("background","rgb(255, 255, 255)")
			}
	    });
		$("#"+ id +" input[type='radio'").each(function(i,n){
			n.disabled = bool;
	    });
	}
});
var EpM = new EpboxManagement();