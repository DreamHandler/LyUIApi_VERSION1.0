var RightManagement = Class.create();
RightManagement.prototype = Object.extend(new TBase(), {
	treeData : null,
	setting : {},
	//初始化
	initLoad : function(){
		RM.initPage();
		RM.initTree();
	},
	//初始化页面布局
	initPage : function(){
		var Height =$(window).height();
		var Width =$(window).width();
		//操作员组信息
		$("#rightDiv,#leftDiv").height(Height - 50);
		$("#rightDiv").width(Width - $("#leftDiv").width() - 34);
		$("#treeData").width($("#leftDiv").width() - 30);
		//系统信息
		$("#xt_right,#xt_left").width(($("#rightDiv").width() - $("#xt_center").width())/2 - 1);
		$("#noUse_system").width($("#xt_left").width() - 30);
		$("#Use_system").width($("#xt_right").width() - 30);
		$("#nr_left,#nr_right,#nr_center").height($("#XTXX").height() - 50);
		$("#noUse_system").height($("#nr_left").height() - 10);
		$("#Use_system").height($("#nr_right").height());
		//菜单信息
	},
	//初始化树形结构
	initTree : function(){
		 // zTree 的参数配置，后面详解
		 RM.setting = {
				 view: {
			            dblClickExpand: true,//双击节点时，是否自动展开父节点的标识
			            showLine: true,//是否显示节点之间的连线
//			            fontCss:{'color':'black','font-weight':'bold'},//字体样式函数
			            selectedMulti: false //设置是否允许同时选中多个节点
			        },
			        check:{
			            chkboxType: { "Y": "ps", "N": "ps" },
//			            chkboxType: { "Y": "", "N": "" },
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
			                name: "categoryName",
			            },
			            simpleData: {//简单数据模式
			                enable:true,
			                idKey: "id",
			                pIdKey: "IPARENTID",
			                rootPId: null
			            }
			        },
			        callback: {
//			            beforeExpand:zTreeBeforeExpand, // 用于捕获父节点展开之前的事件回调函数，并且根据返回值确定是否允许展开操作
			        	onClick : function(event, treeId, treeNode, clickFlag){
			        		var IPARENTID = treeNode["IPARENTID"];
			        		var id = treeNode["id"];
			        		//操作员权限
			        		if(IPARENTID != null && IPARENTID != 0){
			        			var QryJson={"id":id};
			        			ajaxCall(QryJson,"SystemMaintenance.RightManagement","QryGroupAndUserData",RM.TreeDataHandler,false);
			        		} else {//操作员组权限
			        			var QryJson={"BGROUP":"1","id":id};
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
			for(var i=0;i<FieldsValue.length;i++){
				var VascNum = FieldsValue[i].getAttribute("VascNum");
				var VSYSNO = FieldsValue[i].getAttribute("VSYSNO");
				var VNAME = FieldsValue[i].getAttribute("VNAME");
				if(VascNum != null && VascNum != ""){
					Use_system += '<option value="'+VSYSNO+'">'+VNAME+'</option>';
					Use_system += '<option value="'+VSYSNO+'">'+VNAME+'</option>';
					Use_system += '<option value="'+VSYSNO+'">'+VNAME+'</option>';
					Use_system += '<option value="'+VSYSNO+'">'+VNAME+'</option>';
					Use_system += '<option value="'+VSYSNO+'">'+VNAME+'</option>';
					Use_system += '<option value="'+VSYSNO+'">'+VNAME+'</option>';
					Use_system += '<option value="'+VSYSNO+'">'+VNAME+'</option>';
					Use_system += '<option value="'+VSYSNO+'">'+VNAME+'</option>';
					Use_system += '<option value="'+VSYSNO+'">'+VNAME+'</option>';
				} else {
					noUse_system += '<option value="'+VSYSNO+'">'+VNAME+'</option>';
				}
			}
			$("#noUse_system").html(noUse_system);
			$("#Use_system").html(Use_system);
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
	//将xml转化为json
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
	//按钮显隐控制 
	toButton : function(flag){
		if(flag == 1){
			$("#btn_right,#btn_left,#btn_right_all,#btn_left_all").each(function(i, n) {n.disabled = false;});
		}
		
	}
});
var RM = new RightManagement();