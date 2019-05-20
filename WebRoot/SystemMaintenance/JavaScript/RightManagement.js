var RightManagement = Class.create();
RightManagement.prototype = Object.extend(new TBase(), {
	setting : {},
	IPARENTID : "",
	id : "",
	MenuSetting : {},
	//初始化
	initLoad : function(){
		RM.initPage();
		RM.initMenuTree();
		RM.initTree();
	},
	//初始化页面布局
	initPage : function(){
		var Height =$(window).height();
		var Width =$(window).width();
		//操作员组信息
		$("#rightDiv,#leftDiv").height(Height - 45);
		$("#nr_tree").height($("#leftDiv").height() - 40)
		$("#rightDiv").width(Width - $("#leftDiv").width() - 17);
		//系统信息
		$("#xt_right,#xt_left").width(($("#rightDiv").width() - $("#xt_center").width())/2 - 1);
		$("#noUse_system").width($("#xt_left").width() - 1);
		$("#Use_system").width($("#xt_right").width() - 1);
		$("#nr_left,#nr_right,#nr_center").height($("#XTXX").height() - 45);
		$("#noUse_system").height($("#nr_left").height());
		$("#Use_system").height($("#nr_right").height());
		//菜单权限信息
		$("#qx_info").width($("#rightDiv").width())
		$("#qx_nr_tree").height($("#rightDiv").height() - $("#XTXX").height() - 40)
	},
	//初始化树形结构
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
//			            beforeExpand:zTreeBeforeExpand, // 用于捕获父节点展开之前的事件回调函数，并且根据返回值确定是否允许展开操作
			        	onClick : function(event, treeId, treeNode, clickFlag){
			        		RM.toButton_System(0);
			        		$("#qx_treeData").html("");//将菜单信息赋空
			        		RM.IPARENTID = treeNode["IPARENTID"]==null?"":treeNode["IPARENTID"];
			        		RM.id = treeNode["id"];
			        		//操作员权限
			        		if(RM.IPARENTID != null && RM.IPARENTID != 0){
			        			var QryJson={"BGROUP":"1","id":RM.id};
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
	SystemDataHandler : function(){
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
				RM.Use_system_change();
			}
			if(noUse_system_num > 0){
				RM.toButton_System(3);
			}
		}
	},
	//获取树形结构数据
	getTreeData : function(){
		var QryJson={};
		ajaxCall(QryJson,"SystemMaintenance.RightManagement","QryGroupAndUserData",RM.TreeDataHandler,false);
	},
	//树形结构数据返回捕获
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
	//将xml转化为json，标准数据模式
	first_id : "",
	xmlToJson : function(node){
		var FieldsValue = node.documentElement.selectSingleNode("FieldsValue").childNodes;
//		alert(FieldsValue[0].xml)
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
	//未分配系统选中
	noUse_system_change : function(){
		RM.toButton_System(1);
	},
	//按钮显隐控制 
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
	//初始化菜单树形结构
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
//			        beforeExpand:zTreeBeforeExpand, // 用于捕获父节点展开之前的事件回调函数，并且根据返回值确定是否允许展开操作
		        	onClick : function(event, treeId, treeNode, clickFlag){
		        		
		        	},
		        	onCheck: RM.onCheck  //定义节点复选框选中或取消选中事件的回调函数
		        }
		}; 
	},
	Use_SYSNO : "",
	//已分配系统点击
	Use_system_change : function(){
		RM.toButton_System(2);
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
			RM.menu_zTree.expandAll(true);//展开全部节点
			RM.getQX();
		}
	},
	//ztree异步获取对应权限
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
				var CDBMS = VCDBM.split("|");
				for(var i=0;i<CDBMS.length;i++){//勾选已分配的菜单
					var node = RM.menu_zTree.getNodeByParam("VNum",CDBMS[i]);
                    RM.menu_zTree.checkNode(node, true, false); 
				}
			}
		}
	},
	//菜单信息的xml转化为json数据，方便ztree使用，简单数据模式
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
	//菜单树 checkbox 选中、取消
	onCheck : function(){
		alert(333)
	}
});
var RM = new RightManagement();