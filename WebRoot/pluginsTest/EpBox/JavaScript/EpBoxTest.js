var EpBoxTest = Class.create();
EpBoxTest.prototype = Object.extend(new LBase(), {
	//初始化
	initLoad : function(){
//		ep.LoadData();
	},
	//前后台交互
	LoadData : function(){
		var QryJson={};
		ajaxCall(QryJson,"Origin.Widget.EpBox.EpBoxTest","QryAll",ep.DataHander,false);
	},
	DataHander : function(ajax){
		if (xmlObject.readyState == 4 && xmlObject.status == 200) {
			var response = xmlObject;
			var node = response.responseXML.documentElement;
			if(node==null||node.xml===undefined){
				node = StrToXml(response.responseText);
			}
//			alert(node.xml)
			var eles= node.documentElement.selectSingleNode("FieldsValue").childNodes
		}
	},
	getFirstEpBox : function(aThis){//操作员组
		getEpBox(aThis,{epName:'TBGROUP',epJson:[{id:'firstEpBox',value:1},{id:'firstEpBoxBM',value:0}]});
	},
	getFirstMoreEpBox : function(aThis){//操作员
		alert(11)
		getMoreEpBox(aThis,{epName:'TBUSER',epValue:'CMC',epValue2:'CBM',PYMFilter:true});
	},
	getFirstMoreEpBoxBM : function(){
		$("#firstMoreEpBoxBM").val($("#firstMoreEpBox")[0].value2)
	}
});
var ep = new EpBoxTest();