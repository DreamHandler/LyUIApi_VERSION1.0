var RightManagement = Class.create();
RightManagement.prototype = Object.extend(new LBase(), {
	setting : {}, //管理员组和管理员ztree的配置
	IPARENTID : "",//管理员组和管理员ztree选中节点的父节点id
	id : "",  //管理员组和管理员ztree选中节点id
	MenuSetting : {}, //菜单ztree的配置
	first_id : "", //管理员组和管理员ztree的第一个节点id
	/**
     * 初始化
     */
	initLoad : function(){
		RM.initPage();
	},
	/**
     * 初始化页面布局
     */
	initPage : function(){
		var Height =$(window).height();
		var Width =$(window).width();
		$("#content").height(Height - 5);
		//操作员组信息
		$("#leftDiv").height($("#content").height() - 10);
		$("#group_tree,#nr_tree").height($("#leftDiv").height() - 35)
		$("#nr_tree").width($("#group_tree").width());
		//右边信息
		$("#rightDiv").width(Width - $("#leftDiv").width() - 15);
		//系统信息
		$("#rightDiv").height($("#content").height() - 15);
		$("#xt_right,#xt_left").width(($("#rightDiv").width() - $("#xt_center").width())/2 - 1);
		$("#noUse_system").width($("#xt_left").width() - 1);
		$("#Use_system").width($("#xt_right").width() - 1);
		$("#nr_left,#nr_right,#nr_center").height($("#XTXX").height() - 30);
		$("#noUse_system").height($("#nr_left").height());
		$("#Use_system").height($("#nr_right").height());
		//菜单权限信息
		$("#qx_info,#qx_menu").width($("#rightDiv").width())
		$("#qx_nr_tree,#qx_menu").height($("#rightDiv").height() - $("#XTXX").height() - 40)
		//菜单按钮组
		$("#qx_btn").width(300);
		$("#qx_nr_tree").width($("#qx_info").width() - $("#qx_btn").width() - 50);
		var margin_top = $("#qx_nr_tree").height()
		$("#qx_btn").css("margin-top",margin_top -50);
		
		RM.initMenuTree();
		RM.initTree();
	},
	/**
     * 初始化树形结构
     */
	initTree : function(){
		 // zTree 的参数配置，后面详解
		 RM.setting = {
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
			                name: "categoryName"
			            }
			        },
			        callback: {
			        	onClick : function(event, treeId, treeNode, clickFlag){
			        		load.run("正在查询数据，请稍等...")
			        		RM.toButton_System(0);
			        		$("#qx_treeData").html("");//将菜单信息赋空
			        		RM.IPARENTID = treeNode["IPARENTID"]==null?"":treeNode["IPARENTID"];
			        		RM.id = treeNode["id"];
			        		//操作员权限
			        		if(RM.IPARENTID != null && RM.IPARENTID != 0){
			        			var QryJson={"BGROUP":"0","id":RM.id,"IPARENTID":RM.IPARENTID};
			        			ajaxCall(QryJson,"SystemMaintenance.RightManagement","QrySystemData",RM.SystemDataHandler,false);
			        		} else {//操作员组权限
			        			var QryJson={"BGROUP":"1","id":RM.id};
			        			ajaxCall(QryJson,"SystemMaintenance.RightManagement","QrySystemData",RM.SystemDataHandler,false);
			        		}
			        	}
			        }
		}; 
		RM.getTreeData();
	},
	SystemDataHandler : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			var FieldsValue = node.documentElement.selectSingleNode("FieldsValue").childNodes;
			var noUse_system = "",Use_system = "";
			var Use_system_num = 0,noUse_system_num = 0;
			var Use_system_select = "";
			for(var i=0;i<FieldsValue.length;i++){
				var VascNum = FieldsValue[i].getAttribute("VascNum");
				var VSYSNO = FieldsValue[i].getAttribute("VSYSNO");
				var VNAME = FieldsValue[i].getAttribute("VNAME");
				if(VascNum != null && VascNum != ""){
					if(Use_system_num == 0){
						Use_system_select = "selected";
					}else{
						Use_system_select = "";
					}
					Use_system += '<option value="'+VSYSNO+'" '+Use_system_select+'>'+VNAME+'</option>';
					Use_system_num ++;
				} else {
					noUse_system += '<option value="'+VSYSNO+'">'+VNAME+'</option>';
					noUse_system_num ++;
				}
			}
			$("#noUse_system").html(noUse_system);
			$("#Use_system").html(Use_system);
			if(Use_system_num > 0){
				RM.Use_system_change(document.getElementById("Use_system"));
			}else {
				//控制按钮显隐,无菜单信息
		        RM.toButton_qx(2);
			}
			if(noUse_system_num > 0){
				RM.toButton_System(3);
			}
			
		}
		load.stop();
	},
	/**
     * 管理员组_获取树形结构数据
     */
	getTreeData : function(){
		var QryJson={};
		ajaxCall(QryJson,"SystemMaintenance.RightManagement","QryGroupAndUserData",RM.TreeDataHandler,false);
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
			var nodeJson = RM.xmlToJson(node);
			//初始化zTree，三个参数一次分别是容器(zTree 的容器 className 别忘了设置为 "ztree")、参数配置、数据源
			$.fn.zTree.init($("#treeData"), RM.setting, nodeJson); 
			var zTree = $.fn.zTree.getZTreeObj("treeData");//获取ztree对象
			if(zTree != null){
				var node = zTree.getNodeByParam('id', RM.first_id);//获取id为1的点
            	zTree.selectNode(node);//选择点
                zTree.setting.callback.onClick(null, zTree.setting.treeId, node,1);//调用事件
            }
		}
	},
	/**
     * 将xml转化为json，标准数据模式
     */
	xmlToJson : function(node){
		var FieldsValue = node.documentElement.selectSingleNode("FieldsValue").childNodes;
		var VascNum = "";
		var nodeJson = [];
		var children = [];
		var no_children = true;
		for(var i=0;i<FieldsValue.length;i++){
			//获取第一个节点的id
			if(i == 0){RM.first_id = FieldsValue[0].getAttribute("VascNum");}
			//判断是否为父节点第一行数据，若“是”，则将子节点存储信息初始化
			var ROWNUMBER = FieldsValue[i].getAttribute("ROWNUMBER");
			if(ROWNUMBER == "1"){
				children = [];
				no_children = true;
			}
			//获取子节点
			if(FieldsValue[i].getAttribute("VJOBNUM") != null && FieldsValue[i].getAttribute("VJOBNUM") != ""){
				var children_info = {};
				children_info["id"] = FieldsValue[i].getAttribute("VJOBNUM");
				children_info["IPARENTID"] = FieldsValue[i].getAttribute("VascNum");
				children_info["categoryName"] = FieldsValue[i].getAttribute("VNAME");
				children.push(children_info);
				no_children= false;
			}
			//判定是否是同一操作员组的信息
			var ROWNUMBER_next = (i+1)<FieldsValue.length?FieldsValue[i+1].getAttribute("ROWNUMBER"):"1";
			if(ROWNUMBER_next == "1"){
				var nodeJson_info = {};
				nodeJson_info["id"] = FieldsValue[i].getAttribute("VascNum");
				nodeJson_info["IPARENTID"] = "0";
				nodeJson_info["categoryName"] = FieldsValue[i].getAttribute("VascName");
				if(!no_children){
					nodeJson_info["children"] = children;
				}
				nodeJson.push(nodeJson_info);
			}
		}
		return nodeJson;
	},
	/**
     * 未分配系统选中
     */
	noUse_system_index : "",  //未分配系统选中的index
	noUse_system_change : function(obj){
		RM.toButton_System(1);
		RM.noUse_system_index = obj.selectedIndex;
	},
	/**
     * 初始化菜单树形结构
     */
	initMenuTree : function(){
		 // zTree 的参数配置，后面详解
		 RM.MenuSetting = {
			 	view: {
		            dblClickExpand: true,//双击节点时，是否自动展开父节点的标识
		            showLine: true,//是否显示节点之间的连线
		            selectedMulti: true //设置是否允许同时选中多个节点
		        },
		        check:{
		            chkboxType: { "Y": "ps", "N": "ps" },//复选框是否联动
		            chkStyle: "checkbox",//复选框类型
		            enable:  true//每个节点上是否显示 CheckBox
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
		        		
		        	}
		        }
		}; 
	},
	/**
     * 已分配系统点击
     */
	Use_SYSNO : "", //已分配系统选中的系统编码
	Use_system_index : "", //已分配系统选中的index
	Use_system_change : function(obj){
		RM.toButton_System(2);
		RM.Use_system_index = obj.selectedIndex;
		RM.Use_SYSNO = $("#Use_system").val();
		var QryJson={"SYSNO":RM.Use_SYSNO};
		ajaxCall(QryJson,"SystemMaintenance.RightManagement","QryMenuData",RM.Use_system_change_handler,false);
	},
	Use_system_change_handler : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			var nodeJson = RM.xmlToJson_Menu(node);
			//初始化zTree，三个参数一次分别是容器(zTree 的容器 className 别忘了设置为 "ztree")、参数配置、数据源
			$.fn.zTree.init($("#qx_treeData"), RM.MenuSetting, nodeJson);
			RM.menu_zTree = $.fn.zTree.getZTreeObj("qx_treeData");//获取ztree对象
			var length = RM.menu_zTree.getNodes().length;
			if(length > 0){
				RM.toButton_qx(0);
				RM.menu_zTree.expandAll(true);//展开全部节点
				RM.getQX();
			}else {
				RM.toButton_qx(2);
			} 
			
		}
	},
	/**
     * ztree异步获取对应权限
     */
	getQX : function(){
		var QryJson={"VSYSNO":RM.Use_SYSNO,"BGROUP":RM.IPARENTID,"VascNum":RM.id};
		ajaxCall(QryJson,"SystemMaintenance.RightManagement","QryQX",RM.getQX_handler,false);
	},
	getQX_handler : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			var FieldsValue = node.documentElement.selectSingleNode("FieldsValue").childNodes;
			if(FieldsValue.length > 0){
				var VCDBM = FieldsValue[0].getAttribute("VCDBM");
				if(VCDBM != ""){
					var CDBMS = VCDBM.split("|");
					for(var i=0;i<CDBMS.length;i++){//勾选已分配的菜单
						var node = RM.menu_zTree.getNodeByParam("VNum",CDBMS[i]);
	                    RM.menu_zTree.checkNode(node, true, false); 
					}
				}
			}
			//设置menu_zTree不可操作
			var nodes = RM.menu_zTree.getNodes();
			RM.menu_zTree.setChkDisabled(nodes[0],true,true,true);
		}
	},
	/**
     * 菜单信息的xml转化为json数据，方便ztree使用，简单数据模式
     */
	xmlToJson_Menu : function(node){
		var Fields = node.documentElement.selectSingleNode("Fields").childNodes;
		var FieldsValue = node.documentElement.selectSingleNode("FieldsValue").childNodes;
		var nodeJson = [];
		var children = [];
		for(var i=0;i<FieldsValue.length;i++){//数据循环
			var nodeJson_info = {};
			for(var j=0;j<Fields.length;j++){//字段循环
				var ColName = Fields[j].getAttribute("ColName");
				nodeJson_info[ColName] = FieldsValue[i].getAttribute(ColName);
			}
			nodeJson.push(nodeJson_info);
		}
		return nodeJson;
	},
	/**
     * 删除第一个节点
     */
	removeTree : function(){
        //获取全部节点数据
        var nodes = RM.menu_zTree.getNodes();
        //删除全部节点数据
        RM.menu_zTree.removeNode(nodes[0]);
        //控制按钮显隐,无菜单信息
        RM.toButton_qx(2);
    },
    /**
     * 系统_按钮显隐控制 
     */
	toButton_System : function(flag){
		if(flag == 0){//初始化状态-全部禁用
			$("#btn_right,#btn_left,#btn_right_all,#btn_left_all").each(function(i, n) {n.disabled = true;});
		}else if(flag == 1){//选中未分配系统
			$("#btn_right").each(function(i, n) {n.disabled = false;});
		}else if (flag == 2){//选中已分配系统
			$("#btn_left").each(function(i, n) {n.disabled = false;});
		}else if(flag == 3){//有未分配系统
			$("#btn_right_all").each(function(i, n) {n.disabled = false;});
		}
	},
	/**
     * 系统_按钮组
     */
	use_system_add : "", //添加到已分配系统的信息
	noUse_system_add : "",//添加到未分配系统的信息
	btn_right : function(){
		if(RM.qx_btn_flag == 1){
			alert("请先取消或保存菜单权限！")
			return;
		}
		var noUse_system_obj = document.getElementById("noUse_system");
		var value = noUse_system_obj.options[RM.noUse_system_index].value;
		var text = noUse_system_obj.options[RM.noUse_system_index].text;
		var new_Use_system_option = new Option(text,value);
		var Use_system_obj = document.getElementById("Use_system");
		//添加到已分配系统
		Use_system_obj.options.add(new_Use_system_option);
		RM.use_system_add += value+"|";
		//删除未分配系统
		noUse_system_obj.options.remove(RM.noUse_system_index);
		RM.noUse_system_add = RM.noUse_system_add.replace(value+"|","");
		$("#btn_right").each(function(i, n) {n.disabled = true;});
		if(noUse_system_obj.options.length == 0){
			$("#btn_right_all").each(function(i, n) {n.disabled = true;});
		}
		if(Use_system_obj.options.length > 0){
			//不开通 将已分配系统全部修改为未分配系统  的功能；避免操作失误，影响数据及使用
//			$("#btn_left_all").each(function(i, n) {n.disabled = false;});
		}
	},
	btn_left : function(){
		if(RM.qx_btn_flag == 1){
			alert("请先取消或保存菜单权限！")
			return;
		}
		var Use_system_obj = document.getElementById("Use_system");
		var value = Use_system_obj.options[RM.Use_system_index].value;
		var text = Use_system_obj.options[RM.Use_system_index].text;
		var new_noUse_system_option = new Option(text,value);
		var noUse_system_obj = document.getElementById("noUse_system");
		//添加到未分配系统
		noUse_system_obj.options.add(new_noUse_system_option);
		RM.noUse_system_add += value+"|";
		//删除已分配系统
		Use_system_obj.options.remove(RM.Use_system_index); 
		RM.use_system_add = RM.use_system_add.replace(value+"|","");
		$("#btn_left").each(function(i, n) {n.disabled = true;});
		if(Use_system_obj.options.length == 0){
			$("#btn_left_all").each(function(i, n) {n.disabled = true;});
		}
		if(noUse_system_obj.options.length > 0){
			$("#btn_right_all").each(function(i, n) {n.disabled = false;});
		}
		//删除菜单权限信息
		RM.removeTree();
	},
	btn_right_all : function(){
		if(RM.qx_btn_flag == 1){
			alert("请先取消或保存菜单权限！")
			return;
		}
		var Use_system_obj = document.getElementById("Use_system");
		var noUse_system_obj = document.getElementById("noUse_system");
		for(var i=0;i<noUse_system_obj.options.length;i++){
			var value = noUse_system_obj.options[i].value;
			var text = noUse_system_obj.options[i].text;
			var new_Use_system_option = new Option(text,value);
			//添加到已分配系统
			Use_system_obj.options.add(new_Use_system_option);
			RM.use_system_add += value+"|";
		}
		while(noUse_system_obj.options.length>0){
			//删除未分配系统
			var value = noUse_system_obj.options[0].value;
			noUse_system_obj.options.remove(0);
			RM.noUse_system_add = RM.noUse_system_add.replace(value+"|","");
		}
		//按钮显隐控制
		$("#btn_right").each(function(i, n) {n.disabled = true;});
		$("#btn_right_all").each(function(i, n) {n.disabled = true;});
//		$("#btn_left_all").each(function(i, n) {n.disabled = false;});
	},
	btn_left_all : function(){
		if(RM.qx_btn_flag == 1){
			alert("请先取消或保存菜单权限！")
			return;
		}
		var noUse_system_obj = document.getElementById("noUse_system");
		var Use_system_obj = document.getElementById("Use_system");
		for(var i=0;i<Use_system_obj.options.length;i++){
			var value = Use_system_obj.options[i].value;
			var text = Use_system_obj.options[i].text;
			var new_noUse_system_option = new Option(text,value);
			//添加到未分配系统
			noUse_system_obj.options.add(new_noUse_system_option);
			RM.noUse_system_add += value+"|";
		}
		while(Use_system_obj.options.length>0){
			//删除已分配系统
			var value = Use_system_obj.options[0].value;
			Use_system_obj.options.remove(0);
			RM.use_system_add = RM.use_system_add.replace(value+"|","");
		}
		//删除菜单权限信息
		RM.removeTree();
		//按钮显隐控制
		$("#btn_left").each(function(i, n) {n.disabled = true;});
		$("#btn_left_all").each(function(i, n) {n.disabled = true;});
		$("#btn_right_all").each(function(i, n) {n.disabled = false;});
	},
	/**
     * 权限_按钮显隐控制
     */
	toButton_qx : function(flag){
		if(flag == 0){//初始化状态-保存、取消禁用
			$("#qx_btn_save,#qx_btn_cancel").each(function(i, n) {n.disabled = true;});
			$("#qx_btn_update").each(function(i, n) {n.disabled = false;});
		}else if(flag == 1){//点击修改
			$("#qx_btn_save,#qx_btn_cancel").each(function(i, n) {n.disabled = false;});
			$("#qx_btn_update").each(function(i, n) {n.disabled = true;});
		}else if(flag == 2){//无菜单信息
			$("#qx_btn_update,#qx_btn_save,#qx_btn_cancel").each(function(i, n) {n.disabled = true;});
		}
	},
	/**
     * 权限_按钮组
     */
	qx_btn_flag : 0, //按钮组状态，0-查询，1-修改
	qx_btn_update  : function(){
		RM.qx_btn_flag = 1;
		RM.toButton_qx(1);
		//禁用操作员组的按钮组
		$("#group_btn_parent,#group_btn_child,#group_btn_update,#group_btn_delete").each(function(i, n) {n.disabled = true;});
		//设置menu_zTree不可操作
		var nodes = RM.menu_zTree.getNodes();
		RM.menu_zTree.setChkDisabled(nodes[0],false,true,true);
	},
	qx_btn_save  : function(){
		RM.qx_btn_flag = 0;
		//获取已分配系统信息
		var Use_system_options = document.getElementById("Use_system").options;
		var Use_system_value = "";
		for(var i=0;i<Use_system_options.length;i++){
			Use_system_value += Use_system_options[i].value +"|";
		}
		Use_system_value = Use_system_value.substring(0,Use_system_value.length-1);
		//获取所有选中的菜单
        var checkedNodes = RM.menu_zTree.getCheckedNodes(true);
		var VCDBM = "";
		for(var j=0;j<checkedNodes.length;j++){
			VCDBM += checkedNodes[j].VNum + "|";
		}
		VCDBM = VCDBM.substring(0,VCDBM.length-1);
		var QryJson={"use_system_add":RM.use_system_add,"noUse_system_add":RM.noUse_system_add,
					"Use_SYSNO":RM.Use_SYSNO,"VCDBM":VCDBM,"id":RM.id,"IPARENTID":RM.IPARENTID};
		ajaxCall(QryJson,"SystemMaintenance.RightManagement","saveQX",RM.qx_btn_saveHandler,false);
	},
	qx_btn_saveHandler : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
			if(node.selectSingleNode("RES/DAT").text=="1"){
				alert("保存成功！");
				RM.qx_btn_cancel();
			}else{
				alert("保存失败！");
			}
		}
	},
	qx_btn_cancel  : function(){
		RM.qx_btn_flag = 0;
		RM.toButton_qx(0);
		var nodes = RM.menu_zTree.getNodes();
		RM.menu_zTree.setChkDisabled(nodes[0],true,true,true);
	}
});
var RM = new RightManagement();