var System_Menu = Class.create();
System_Menu.prototype = Object.extend(new LBase(), {
	last_system_rowId : 1,  //系统选中行号
	MenuSetting : null, //菜单树配置
	menu_zTree : null,  //菜单信息
	system_status : 0,  //系统操作状态；0-查询，1-新增，2-修改，3-删除
	/**
     * 初始化
     */
	initLoad : function(){
		SM.initMenuTree();
		SM.initPage();
		SM.menu_btn(0);
	},
	/**
     * 初始化页面布局
     */
	initPage : function(){
		var Height =$(window).height();
		var Width =$(window).width();
		$("#content").height(Height - 5);
		//操作员组信息
		$("#system_div").height($("#content").height() - 10);
		$("#system_grid").height($("#system_div").height() - 35);
		$("#nr_grid,#system_btn").width($("#system_grid").width() - 10);
		$("#system_qry,#system_grid_data,#system_grid_input").width($("#nr_grid").width());
		$("#nr_grid").height($("#system_grid").height() - $("#system_btn").height() - 15);
		$("#system_grid_data").height(($("#nr_grid").height() - $("#system_qry").height())/3*2);
		$("#system_grid_input").height($("#nr_grid").height() - $("#system_qry").height() - $("#system_grid_data").height() - 15);
		//信息录入部分垂直居中
		var group_middle = ($("#system_grid_input").height() - $("#system_middle").height())/2
		$("#system_middle").css("margin-top",group_middle+"px");
		//管理员信息
		$("#menu_div").width($("#content").width() - $("#system_div").width() - 15);
		$("#menu_div").height($("#content").height() - 10);
		$("#menu_main").height($("#menu_div").height() - 35);
		$("#menu_content,#menu_btn").width($("#menu_main").width() - 10);
		$("#menu_content").height($("#menu_main").height() - $("#menu_btn").height() - 20);
		//菜单信息部分，ztree和input信息
		$("#menu_tree,#menu_input").width(($("#menu_content").width() - 9)/2);
		$("#menu_tree,#menu_input").height($("#menu_content").height());
		$(".input_width").width($("#menu_input").width() - 65);
		SM.initSystemGrid();
	},
	/**
	 * 初始化系统grid
	 */
	initSystemGrid : function(){
		$("#system_list").jqGrid({
			data: [],
			datatype: "local",
			height: $("#system_grid_data").height() - 40,
			width:$("#system_grid_data").width(),
			colNames:['编码','名称'],
			colModel:[
				{name:'VSYSNO',index:'VSYSNO', width:60},
				{name:'VNAME',index:'VNAME',width:90}
			],
			onSelectRow : SM.system_onSelectRow,
			beforeSelectRow : SM.grid_disabled
		});
		SM.QrySystemData();
	},
	/**
	 * 系统行选中
	 */
	system_onSelectRow : function(rowid,status){
		SM.last_system_rowId = rowid;
		SM.system_btn(0);
		var rowData = jQuery("#system_list").jqGrid("getRowData",SM.last_system_rowId);
		$("#system_VSYSNO").val(rowData.VSYSNO);
		$("#system_VNAME").val(rowData.VNAME);
		//查询菜单信息
		SM.getTreeData();
	},
	/**
     * 查询系统信息
     */
	QrySystemData : function(){
		var QryJson={"system_info":$("#system_info").val()};
		ajaxCall(QryJson,"SystemMaintenance.System_Menu","QrySystemData",SM.QrySystemDataHandler,false);
	},
	QrySystemDataHandler : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			//清空系统信息
			$("#system_list").jqGrid("clearGridData");
			var nodeJson = XmlToJson(node);
			$("#system_list").jqGrid('setGridParam',{data:nodeJson}).trigger("reloadGrid");
			if(nodeJson.length > 0) {
				if(SM.system_status == 3){ //删除状态
					SM.last_system_rowId = SM.last_system_rowId==1?SM.last_system_rowId:SM.last_system_rowId-1;
				}
				$("#system_list").jqGrid('setSelection',SM.last_system_rowId,true);
			} else {//清空数据
				SM.emptyValue("system_grid_input");
				SM.system_btn(2);
				//清空菜单信息
				
			}
			SM.system_status = 0;
			SM.info_disabled(false);
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
	system_btn : function(flag){ 
		if(flag == 0){//新增、修改、删除可用，保存、取消不可用
			$("#system_btn_add,#system_btn_update,#system_btn_delete").each(function(i,n){
			      n.disabled = false;
		    });
			$("#system_btn_save,#system_btn_cancel").each(function(i,n){
			      n.disabled = true;
		    });
		}else if(flag == 1){//保存、取消可用，新增、修改、删除不可用
			$("#system_btn_save,#system_btn_cancel").each(function(i,n){
			      n.disabled = false;
		    });
			$("#system_btn_add,#system_btn_update,#system_btn_delete").each(function(i,n){
			      n.disabled = true;
		    });
		}else if(flag == 2){//新增可用，修改、删除、保存、取消不可用
			$("#system_btn_add").each(function(i,n){
			      n.disabled = false;
		    });
			$("#system_btn_update,#system_btn_delete,#system_btn_save,#system_btn_cancel").each(function(i,n){
			      n.disabled = true;
		    });
		}
	},
	/**
	 * 系统_按钮组
	 */
	system_btn_add : function(){
		SM.system_status = 1;
		SM.system_btn(1);
		SM.info_disabled(true);
		$("#system_VSYSNO,#system_VNAME").each(function(i,n){
		      n.disabled = false;
		      $("#"+n.id).val("")
	    });
		$("#system_VSYSNO").focus();
	},
	system_btn_update : function(){
		SM.system_status = 2;
		SM.system_btn(1);
		SM.info_disabled(true);
		$("#system_VNAME").each(function(i,n){
		      n.disabled = false;
	    });
		$("#system_VNAME").select();
	},
	system_btn_delete : function(){
		SM.system_status = 3;
		var VSYSNO = jQuery("#system_list").jqGrid("getRowData",SM.last_system_rowId).VSYSNO;
		var QryJson={"VSYSNO":VSYSNO};
		ajaxCall(QryJson,"SystemMaintenance.System_Menu","DeleteSystemData",SM.system_btn_delete_handler,true);
	},
	system_btn_delete_handler : function(){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("删除成功！");
				SM.system_btn_cancel();
			}else{
				alert("删除失败！");
			}
		}
	},
	system_btn_save : function(){
		var system_VSYSNO = $("#system_VSYSNO").val();
		var bool = false;
		//获取系统的VascNum的最大值
		var AllData = $("#system_list").jqGrid("getRowData");
		for(var i=0;i<AllData.length;i++){
			var VSYSNO = AllData[i].VSYSNO;
			if(VSYSNO == system_VSYSNO){ //判断新增的系统编码是否存在
				bool = true;
				alert("系统编码【"+system_VSYSNO+"】已存在，请重新输入！");
				$("#system_VSYSNO").select();
				break;
			}
		}
		if(bool){
			return;
		}
		var QryJson={"status":SM.system_status,"VSYSNO":$("#system_VSYSNO").val(),
					"VNAME":$("#system_VNAME").val()};
		ajaxCall(QryJson,"SystemMaintenance.System_Menu","SaveSystemData",SM.system_btn_save_handler,true);
	},
	system_btn_save_handler : function(){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("保存成功！");
				SM.system_btn_cancel();
			}else{
				alert("保存失败！");
			}
		}
	},
	system_btn_cancel : function(){
		SM.QrySystemData();
		$("#system_VSYSNO,#system_VNAME").each(function(i,n){
		      n.disabled = true;
	    });
	},
	/**
	 * 筛选可用设置
	 */
	info_disabled : function(bool){
		$("#system_info").each(function(i,n){
		      n.disabled = bool;
	    });
	},
	/**
     * 初始化菜单树形结构
     */
	initMenuTree : function(){
		 // zTree 的参数配置
		 SM.MenuSetting = {
				 
				 view: {
		            dblClickExpand: true,//双击节点时，是否自动展开父节点的标识
		            showLine: true,//是否显示节点之间的连线
		            selectedMulti: false //设置是否允许同时选中多个节点
		         },
		         check:{
		             chkboxType: { "Y": "ps", "N": "ps" },
		             chkStyle: "checkbox",//复选框类型
		             enable: false //每个节点上是否显示 CheckBox
		         },
		         edit:{
		             enable: false,
		             editNameSelectAll: true,
		             showRemoveBtn : true,
		             showRenameBtn : true,
		             removeTitle : "remove",
		             renameTitle : "rename"
		         },
		         data: {
		        	 key: {
			                name: "VName"
		             },
		             simpleData: {//简单数据模式
		                 enable:true,
		                 idKey: "IXH",
		                 pIdKey: "IZH"
		             }
		         },
		         callback: {
		        	 onClick : function(event, treeId, treeNode, clickFlag){
		        		 var name = ["VNum","VName","VSRC","VPIC"];
		        		 for(var i=0;i<name.length;i++){
		        			 $("#menu_"+name[i]).val(treeNode[name[i]])
		        		 }
		        	 }
		        }
		 }; 
	},
	/**
     * 管理员组_获取树形结构数据
     */
	getTreeData : function(){
		var system_VSYSNO = jQuery("#system_list").jqGrid("getRowData",SM.last_system_rowId).VSYSNO;
		var QryJson={"VSYSNO":system_VSYSNO};
		ajaxCall(QryJson,"SystemMaintenance.System_Menu","QryMenuData",SM.TreeDataHandler,false);
	},
	/**
     * 树形结构数据返回捕获
     */
	TreeDataHandler : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			var nodeJson = XmlToJson(node);
			//初始化zTree，三个参数一次分别是容器(zTree 的容器 className 别忘了设置为 "ztree")、参数配置、数据源
			$.fn.zTree.init($("#menu_treeData"), SM.MenuSetting, nodeJson);
			SM.menu_zTree = $.fn.zTree.getZTreeObj("menu_treeData");//获取ztree对象
			var length = SM.menu_zTree.getNodes().length;
			if(length > 0){
				SM.menu_zTree.expandAll(true);//展开全部节点
			}else { //没有菜单就给ztree增加一个系统节点
				
			}
		}
	},
	/**
	 * 菜单_按钮组控制
	 */
	menu_btn : function(flag){ 
		if(flag == 0){//修改可用，保存、取消不可用
			$("#menu_btn_update").each(function(i,n){
			      n.disabled = false;
		    });
			$("#menu_btn_save,#menu_btn_cancel,#menu_VName,#menu_VSRC,#menu_VPIC").each(function(i,n){
			      n.disabled = true;
		    });
		}else if(flag == 1){//保存、取消可用，修改不可用
			$("#menu_btn_save,#menu_btn_cancel,#menu_VName,#menu_VSRC,#menu_VPIC").each(function(i,n){
			      n.disabled = false;
		    });
			$("#menu_btn_update").each(function(i,n){
			      n.disabled = true;
		    });
		}
	},
	/**
	 * 系统_按钮组
	 */
	menu_btn_update : function(){
		SM.menu_btn(1)
	},
	menu_btn_save : function(){
		var QryJson={"VSYSNO":$("#system_VSYSNO").val(),
				"VNAME":$("#system_VNAME").val()};
		ajaxCall(QryJson,"SystemMaintenance.System_Menu","SaveMenuData",SM.menu_btn_save_handler,true);
	},
	menu_btn_save_handler : function(){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("保存成功！");
				SM.menu_btn_cancel();
			}else{
				alert("保存失败！");
			}
		}
	},
	menu_btn_cancel : function(){
		SM.menu_btn(0)
	},
});
var SM = new System_Menu();