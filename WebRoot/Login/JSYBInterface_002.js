//����ũ�Ͻӿ�JS
var YBInterface = Class.create();
var CurrXML = null;  //��ǰѡ���е�Document
YBInterface.prototype = Object.extend(new TBase(), {
	DivGrid : null,
	oSwipeCard : null,			//ͨ������DLL��ȡˢ������
	YBErrorInfo: "",
	YBHandle:null,
	YZFlag:false,//��֤���
	AxmlObj:null,
	/**
	 * ҽ�ƿ���,Ҫ�������ڹ���
	 * @type String
	 */
	YLKH : "",					
	//ҽ������ع�(����ܵ���)
	Rollback: function() {	
		
	},
	//ҽ�������ύ(����ܵ���)
	Commit: function() {
			
	},	
	free: function(){
		
	},	
	//(����ܵ���)
	Init: function(CYCZYGH,CYCZYXM,CYCZYBH,CYMC) {
		$("#74800018").css("visibility", "visible");		
		$("#LableYBH").css("visibility", "visible");
		this.BSucces = false;
		this.YBHandle = new ActiveXObject("YXYBCOM363_CY.YXYB");
		if(this.YBHandle == undefined){
			this.YBErrorInfo = "����ҽ��COMʧ�ܣ����ҵ�񽫲���ʹ�ã�";
			return false;
		}
		//var rtnHsm = this.YBHandle.Initialize;
		//var rtnMsg = this.YBHandle.SysInit("","MZ",CYCZYGH+"|"+CYCZYXM+"|"+CYCZYBH+"|��ҽ����վ",""); 
		//if (rtnMsg == "false") {//������������
		//	this.YBErrorInfo =  "ũ�Ͻӿڳ�ʼ��ʧ��:\n" + this.YBHandle.ErrorInfo;
		//	alert("ũ�Ͻӿڳ�ʼ��ʧ��:\n" + this.YBHandle.ErrorInfo)
		//	return false;
		
		//}
		//this.YBHandle.destroy;
		this.BSucces = true;
		return true;
	},
	//ҽ������(����ܵ���)
	YBSave: function(Xmlobj, Msg) {
		//ReturnPage 1��Ҫ��ǰ̨��0����Ҫ��ǰ̨
		if ($("#74800009").val() == "") {
			alert("����δ¼����ϣ�������¼�룡")
			return false;
		}
		Xmlobj.appendAttribute(Msg, "ReturnPage", "0");
		new Ajax.Request("PubServlet/PubServlet",{
			method: 'post',				
			parameters: Xmlobj.toObj(),				
			onComplete: this.ReturnFun,
			asynchronous: false,
			objectClass: this
		});			
		return true;
	},
	//�˷�(����ܵ���)
	ReturnFee: function(Xmlobj, Msg) {
		//ReturnPage 1��Ҫ��ǰ̨��0����Ҫ��ǰ̨	
		this.BTFBZ = false;//�˷ѳɹ���־
		Xmlobj.appendAttribute(Msg, "ReturnPage", "0");
		new Ajax.Request("PubServlet/PubServlet",{
			method: 'post',				
			parameters: Xmlobj.toObj(),				
			onComplete: this.Return_TF,
			asynchronous: false,
			objectClass: this
		});
		if (this.BTFBZ) {
			alert("�˷ѳɹ���");
			return true
		}else{
			return false;
		}
	},	
	ReturnFun: function(ajax) {	
		var node = ajax.responseXML.documentElement;		
		if(node !==null){
			if (node.selectSingleNode("Exception") !== null) {				
				alert(node.text);
				return;
			}
			var rtnMsg = YBCOM.SaveData(node);
			//var rtnVal = rtnMsg.split("|");
			//if (rtnVal[0] == "0") {//
			//	alert(YBCOM.YBErrorInfo==""?"�ϴ���Ϣʧ�ܣ�":rtnVal[1]);
			//}else{
				var ReNode = this.LoadXML(rtnMsg);
				var ReturnData = this.showDialog("CYYBInterface/JSYBInterface_002_TJZHZF.jsp", {width:460, height:330}, ReNode);
				var Opr = new OperateDom();
				var Msg = Opr.append("ROOT","MSG","");
				Opr.appendAttribute(Msg,"Class","CY.CYYW.JSXXInfo");
				Opr.appendAttribute(Msg,"CMZH",node.selectSingleNode("MJZ.1").text);
				var ColName=["AKC190","AAC001","AAZ216","AKA130","YKB065","YAB139","YKA316","YKB037","AKC264","AKC228","AKC268","YKA318","YKA319","YKA115","YKA058","AKE039","YKA059","AKE029","AKE031","AKE034","YKC699","YKC705","GRXJZF","AKB081","AKC240","AAE036","AKC021","HISZFY"];
				var ColNameX=["akc190","aac001","aaz216","aka130","ykb065","yab139","yka316","ykb037","akc264","akc228","akc268","yka318","yka319","yka115","yka058","ake039","yka059","ake029","ake031","ake034","ykc699","ykc705","grxjzf","akb081","aae240","aae036","akc021","HISZFY"];
				for(var i=0;i<ColName.length;i+=1){
					Opr.appendAttribute(Msg,ColName[i],ReNode.selectSingleNode("output").selectSingleNode(ColNameX[i]).text);
				}
				new Ajax.Request("PubServlet/PubServlet",{
					method: 'post',
					parameters: Opr.toObj(),
					onComplete: this.ReturnDel,
					asynchronous: false
				});
			//}
			/*
			var ReturnData = this.showDialog("CYYBInterface/JSYBInterface_002_TJZHZF.jsp", {width:460, height:330}, ajax.responseXML);
			//������õ�ʵ�ս��ͼ��˽��
			var YBNode = ReturnData.documentElement.selectSingleNode("YBJSXX.GRP").selectSingleNode("YBJSXX");
			//���˽��ϼ�
			var MJZJE = (YBNode.getAttribute("MBXJE") * 1 + YBNode.getAttribute("MZFZFJE") * 1).toFixed(2);
			var FYNode = ReturnData.documentElement.selectSingleNode("SFX.GRP").selectNodes("SFX");
			var MFY = 0;
			for ( var i = 0; i < FYNode.length; i++) {
				//Ӧ�ս��				
			    MFY = FYNode[i].selectSingleNode('SFX.19').text * 1;
			    if (MJZJE >= MFY) {
			    	FYNode[i].selectSingleNode('SFX.20').text = '0';
			    	MJZJE = (MJZJE - MFY).toFixed(2);
			        continue;		
				}else if (MJZJE < MFY){			      
					FYNode[i].selectSingleNode('SFX.20').text = (MFY - MJZJE).toFixed(2);
					MJZJE = 0;
			        break;
				}					
			}
			*/
		}			
	},
	ReturnDel : function(ajax){
		var node = ajax.responseXML.documentElement;		
		if(node !==null){
			if (node.selectSingleNode("Exception") !== null) {				
				alert(node.text);
				return;
			}
		}
	},
	//�ٴε��ú�̨����
	SaveData: function(inData) {
		this.YBHandle = new ActiveXObject("YXYBCOM363_CY.YXYB");
		if(this.YBHandle == undefined){
			this.YBErrorInfo = "ҽ��DLLδ��ʼ���ɹ������ҵ����ʹ�ã�";
			return false;
		}
		var HISZFY = 0;
		var HISZLF = "";
		var SFXGRP = inData.selectSingleNode("SFX.GRP").childNodes;
		for(var i=0;i<SFXGRP.length;i+=1){
			HISZFY += parseFloat(SFXGRP[i].selectSingleNode("SFX.19").text);
			if(SFXGRP[i].selectSingleNode("SFX.2").text!="C0"&&SFXGRP[i].selectSingleNode("SFX.2").text!="C1"){
				HISZLF += "<row>";
				HISZLF += "<yka105>02"+SFXGRP[i].selectSingleNode("SFX.4").text+SFXGRP[i].selectSingleNode("SFX.5").text+"</yka105>";
				HISZLF += "<ake005>"+SFXGRP[i].selectSingleNode("SFX.2").text+"</ake005>";
				HISZLF += "<ake006>"+SFXGRP[i].selectSingleNode("SFX.3").text+"</ake006>";
				HISZLF += "<ake001></ake001>";
				HISZLF += "<ake002></ake002>";
				HISZLF += "<akc226>"+1+"</akc226>";
				HISZLF += "<akc225>"+SFXGRP[i].selectSingleNode("SFX.20").text+"</akc225>";
				HISZLF += "<yka315>"+SFXGRP[i].selectSingleNode("SFX.20").text+"</yka315>";
				HISZLF += "<aka074></aka074>";
				HISZLF += "<yae374></yae374>";
				HISZLF += "<yke201></yke201>";
				HISZLF += "<yke186></yke186>";
				HISZLF += "<yke356></yke356> ";
				HISZLF += "<yke357></yke357>";
				HISZLF += "<yke672></yke672>";
				HISZLF += "<bke019></bke019>";
				HISZLF += "<bke020></bke020>";
				HISZLF += "<bke011></bke011>";
				HISZLF += "<bke012></bke012>";
				HISZLF += "<yke676></yke676>";
				HISZLF += "<yke677></yke677>";
				HISZLF += "<ake007>"+new Date()+"</ake007>";
				HISZLF += "<aae011>"+SFXGRP[i].selectSingleNode("SFX.32").text+"</aae011>";
				HISZLF += "<ykc141>"+SFXGRP[i].selectSingleNode("SFX.33").text+"</ykc141>";
				HISZLF += "<akc220>"+SFXGRP[i].selectSingleNode("SFX.7").text+"</akc220>";
				HISZLF += "<akc221></akc221>";
				HISZLF += "<aka081></aka081>";
				HISZLF += "<ake135></ake135>";
				HISZLF += "<aka072></aka072>";
				HISZLF += "<aka071></aka071>";
				HISZLF += "<akc229></akc229>";
				HISZLF += "<akc231></akc231>";
				HISZLF += "<yka097></yka097>";
				HISZLF += "<yka098></yka098>";
				HISZLF += "<ykd102>"+SFXGRP[i].selectSingleNode("SFX.32").text+"</ykd102>";
				HISZLF += "<yka099>"+SFXGRP[i].selectSingleNode("SFX.33").text+"</yka099>";
				HISZLF += "</row>";
			}
		}
		var WYMZH = inData.selectSingleNode("MJZ.1").text;
		var ReNode = null;
		var NodeMsg = "";
		NodeMsg += "<?xml version='1.0' encoding='GBK' standalone='yes' ?><input>";
		NodeMsg += "<akc190>"+WYMZH.substring(6,WYMZH.length)+"</akc190>";
		NodeMsg += "<akc197>"+WYMZH.substring(6,WYMZH.length)+"</akc197>";
		NodeMsg += "<aae013>"+inData.selectSingleNode("MJZ.25").text+"</aae013>";
		NodeMsg += "<aka120>"+inData.selectSingleNode("MJZ.26").text+"</aka120> ";
		NodeMsg += "<hisfyze>"+String(HISZFY)+"</hisfyze>";
		NodeMsg += "<aka130>14</aka130> ";
		NodeMsg += "<yka110>"+inData.selectSingleNode("SFX.GRP/SFX/SFX.7").text+"</yka110>";
		NodeMsg += "<ykc010></ykc010>";
		NodeMsg += "<aae011>"+inData.selectSingleNode("MJZ.34").text+"</aae011>";
		NodeMsg += "<ykc141>"+inData.selectSingleNode("MJZ.35").text+"</ykc141>";
		NodeMsg += "<bkf002></bkf002>";
		NodeMsg += "<ykc011></ykc011>";
		NodeMsg += "<bkf007>"+inData.selectSingleNode("MJZ.34").text+"</bkf007>";                    
		NodeMsg += "<ake022>"+inData.selectSingleNode("MJZ.35").text+"</ake022>";
		NodeMsg += "<dataset>";
		var MCFGRP = inData.selectSingleNode("MCF.GRP").childNodes;
		for(var i=0;i<MCFGRP.length;i+=1){
			var MCFGRP50 = MCFGRP[i].selectSingleNode("MCF.50.GRP").childNodes;
			for(var j=0;j<MCFGRP50.length;j+=1){
				NodeMsg += "<row>";
				NodeMsg += "<yka105>01"+MCFGRP50[j].selectSingleNode("MCF.53").text+MCFGRP50[j].selectSingleNode("MCF.54").text+"</yka105>";
				NodeMsg += "<ake005>"+MCFGRP50[j].selectSingleNode("MCF.55").text+"</ake005>";
				NodeMsg += "<ake006>"+MCFGRP50[j].selectSingleNode("MCF.56").text+"</ake006>";
				NodeMsg += "<ake001></ake001>";
				NodeMsg += "<ake002></ake002>";
				NodeMsg += "<akc226>"+MCFGRP50[j].selectSingleNode("MCF.61").text+"</akc226>";
				NodeMsg += "<akc225>"+MCFGRP50[j].selectSingleNode("MCF.71").text+"</akc225>";
				NodeMsg += "<yka315>"+MCFGRP50[j].selectSingleNode("MCF.71").text+"</yka315>";
				NodeMsg += "<aka074>"+MCFGRP50[j].selectSingleNode("MCF.67").text+"</aka074>";
				NodeMsg += "<yae374>"+MCFGRP50[j].selectSingleNode("MCF.59").text+"</yae374>";
				NodeMsg += "<yke201>"+MCFGRP50[j].selectSingleNode("MCF.72").text+"</yke201>";
				NodeMsg += "<yke186></yke186>";
				NodeMsg += "<yke356></yke356> ";
				NodeMsg += "<yke357></yke357>";
				NodeMsg += "<yke672></yke672>";
				NodeMsg += "<bke019></bke019>";
				NodeMsg += "<bke020></bke020>";
				NodeMsg += "<bke011>"+MCFGRP50[j].selectSingleNode("MCF.66").text+"</bke011>";
				NodeMsg += "<bke012>"+MCFGRP50[j].selectSingleNode("MCF.74").text+"</bke012>";
				NodeMsg += "<yke676></yke676>";
				NodeMsg += "<yke677></yke677>";
				NodeMsg += "<ake007>"+new Date()+"</ake007>";
				NodeMsg += "<aae011>"+MCFGRP[i].selectSingleNode("MCF.43")+"</aae011>";
				NodeMsg += "<ykc141>"+MCFGRP[i].selectSingleNode("MCF.44")+"</ykc141>";
				NodeMsg += "<akc220>"+MCFGRP50[j].selectSingleNode("MCF.53").text+"</akc220>";
				NodeMsg += "<akc221></akc221>";
				NodeMsg += "<aka081></aka081>";
				NodeMsg += "<ake135></ake135>";
				NodeMsg += "<aka072>"+MCFGRP50[j].selectSingleNode("MCF.74").text+"</aka072>";
				NodeMsg += "<aka071>"+MCFGRP50[j].selectSingleNode("MCF.64").text+"</aka071>";
				NodeMsg += "<akc229>"+MCFGRP50[j].selectSingleNode("MCF.68").text+"</akc229>";
				NodeMsg += "<akc231>"+MCFGRP50[j].selectSingleNode("MCF.68").text+"</akc231>";
				NodeMsg += "<yka097></yka097>";
				NodeMsg += "<yka098></yka098>";
				NodeMsg += "<ykd102>"+MCFGRP[i].selectSingleNode("MCF.43")+"</ykd102>";
				NodeMsg += "<yka099>"+MCFGRP[i].selectSingleNode("MCF.44")+"</yka099>";
				NodeMsg += "</row>";
			}
			NodeMsg += HISZLF;
		}
		NodeMsg += "</dataset>";
		NodeMsg += "</input>";
		var rtnMsg = this.YBHandle.funMainYX("48",NodeMsg); 
		var rtnVal = rtnMsg.split("|");
		if (rtnVal[0] == "0") {//
			this.YBErrorInfo =  "ũ�Ͻӿڳ�ʼ��ʧ��:\n" + rtnVal[1];
			alert("ũ�Ͻӿڳ�ʼ��ʧ��:\n" + rtnVal[1])
			return false;
		}else{
			var sNode = this.LoadXML(rtnVal[1]);
			var output = sNode.documentElement;
			var newNode = this.LoadXML("<HISZFY>"+HISZFY+"</HISZFY>").documentElement;
			output.appendChild(newNode);
			ReNode = output.xml;
		}
/*
		var data = this.LoadXML(inData);
		var CNL = $(data).find("MJZ\\.32").text();
		//������Ϣ¼��
		var id = $(data).find("MJZ\\.1").text();
		id = id.substring(0,6)+(parseInt(id.substring(6))+parseInt("1"));
		var hospitalIn = "functionName=hospitalIn"+
			"|type="+$("input[name='MZMB']:checked").val()+//�������0-���1-��ͨסԺ��2-���Բ���3-�����֣�4-��ͯ�󲡣�6-�ش󼲲���8-���ˣ�
			"|id="+(MainInfo.ZRNH_Tag?MainInfo.cmzhBak:id)+//����סԺ�ţ�ϵͳΨһ��
			"|personNo="+$(data).find("JBX\\.44").text()+//ũ����Ա����
			"|deptID="+'79'+//ũ�Ͽ��ұ���
			"|inDate="+$(data).find("MJZ\\.5").text().substring(0,4)+$(data).find("MJZ\\.5").text().substring(5,7)+$(data).find("MJZ\\.5").text().substring(8,10)+//�������ڣ�yyyymmdd��
			"|doctor="+CSFZ//����ҽ��(������Э��ҽʦ���֤��)		
var hospitalIn_rtnMsg = this.YBHandle.funMainYX(hospitalIn);
		var hospitalIn_param = this.splitStr(hospitalIn_rtnMsg);
		if(hospitalIn_param.returnValue == -1){
			this.YBErrorInfo = "ҽ��������Ϣ¼��ʧ�ܣ�\n" + hospitalIn_param.errorMsg;
			return false;
		}
		var CICD = $(data).find("MJZ\\.25").text();
		var CICD_0 = "";
		if(CICD != null && CICD != ""){
			CICD_0 = CICD.split("\\|")[0];
			//������Ϣ¼��
			// var id = $(data).find("MJZ\\.1").text();
			// iid = id.substring(0,6)+(parseInt(id.substring(6))+parseInt("1"));

		}
		var addDisease = "";
			if($("input[name='MZMB']:checked").val() == '0'){
				addDisease = "functionName=addDisease"+
				"|id="+(MainInfo.ZRNH_Tag?MainInfo.cmzhBak:id)+//����סԺ��
				"|icdCode="+CICD_0//ICD����
			}else {
				addDisease = "functionName=addDisease"+
				"|id="+(MainInfo.ZRNH_Tag?MainInfo.cmzhBak:id)+//����סԺ��
				"|icdCode="+$("#MBBM").val()+//ICD����
				"|illMbClass="+$("#MBDLBM").val()//����������
			}
			var addDisease_rtnMsg = this.YBHandle.funMainYX(addDisease);
			var addDisease_param = this.splitStr(addDisease_rtnMsg);
			if(addDisease_param.returnValue == -1 || addDisease_rtnMsg==""){
				//�˴�ʧ�ܣ��ع�������Ϣ¼��
				//������Ϣɾ��
				var delInfo = "functionName=delInfo"+
				"|id="+(MainInfo.ZRNH_Tag?MainInfo.cmzhBak:id);//����סԺ�ţ�ϵͳΨһ��
				var delInfo_rtnMsg = this.YBHandle.funMainYX(delInfo);
				var delInfo_param = this.splitStr(delInfo_rtnMsg);
				if(delInfo_param.returnValue == -1){
					this.YBErrorInfo = "ҽ��������Ϣ�ع�ʧ�ܣ�\n" + delInfo_param.errorMsg;
					return false;
				}
				this.YBErrorInfo = "ҽ��������Ϣ¼��ʧ�ܣ�\n" + addDisease_param.errorMsg;
				return false;
			}
		
		var CBRID = $(data).find("MJZ\\.1").text();
		var CLSH = CBRID.substring(CBRID.length-4);
		var SFX_GRP = $(data).find("SFX\\.GRP")[0];//������Ŀ��Ϣ
		var SFX = $(SFX_GRP).find("SFX");//���
		var MCF_GRP = $(data).find("MCF\\.GRP")[0];//���ﴦ��������Ϣ
		var MCF = $(MCF_GRP).find("MCF");//���ﴦ��������Ϣ,���ж��
		for(var i = 0;i < SFX.length;i ++){
			var $SFX_i = $(SFX[i]);
			var CDJH = $SFX_i.find("SFX\\.28").text();
			var CXMBM = $SFX_i.find("SFX\\.2").text();
			var CLSH_IXH = "";
			if(!CDJH){//��ҩ�ķ�
				var CXMBM_length = CXMBM.length;
				var id = $(data).find("MJZ\\.1").text();
				id = id.substring(0,6)+(parseInt(id.substring(6))+parseInt("1"));
				if(CXMBM_length>9){//������ȴ���9
					CLSH_IXH = CXMBM.substring(CXMBM_length-9);
				}else{
					var d = ""+id;
					CLSH_IXH = d.substring(d.length-CXMBM_length)+ CXMBM;
				}
				var DJZSJ = $SFX_i.find("SFX\\.23").text();//����ʱ��
				
				var addDiagnosis = "functionName=addDiagnosis"+
				"|id="+(MainInfo.ZRNH_Tag?MainInfo.cmzhBak:id)+
				"|xh="+CLSH_IXH+
				"|cfDate="+DJZSJ.substring(0,4)+DJZSJ.substring(5,7)+DJZSJ.substring(8,10)+//�������ڣ�yyyymmdd��
				"|hisNO="+$SFX_i.find("SFX\\.2").text()+//ҽԺ������Ŀ����
				"|hisName="+$SFX_i.find("SFX\\.3").text()+//ҽԺ������Ŀ����
				"|unitPrice="+$SFX_i.find("SFX\\.18").text()+//����
				"|quantity="+$SFX_i.find("SFX\\.17").text()+//����
				"|amount="+$SFX_i.find("SFX\\.19").text()//���
				var addDiagnosis_rtnMsg = this.YBHandle.funMainYX(addDiagnosis);
				var addDiagnosis_param = this.splitStr(addDiagnosis_rtnMsg);
				if(addDiagnosis_param.errFlag == 0 || addDiagnosis_param.returnValue == -1){
					//������Ϣɾ��
					var delInfo = "functionName=delInfo"+
						"|id="+(MainInfo.ZRNH_Tag?MainInfo.cmzhBak:id);//����סԺ�ţ�ϵͳΨһ��
					var delInfo_rtnMsg = this.YBHandle.funMainYX(delInfo);
					var delInfo_param = this.splitStr(delInfo_rtnMsg);
					if(delInfo_param.returnValue == -1){
						this.YBErrorInfo = "ҽ��������Ϣ�ع�ʧ�ܣ�\n" + delInfo_param.errorMsg;
						return false;
					}
					var delRx = "functionName=delRx" +
							"|id=" +(MainInfo.ZRNH_Tag?MainInfo.cmzhBak:id)
							"|xh="+CLSH_IXH;
					var delRx_rtnMsg = this.YBHandle.funMainYX(delRx);
					var delRx_param = this.splitStr(delRx_rtnMsg);
					if(delRx_param.returnValue == -1){
						this.YBErrorInfo = "ҽ��������Ϣ�ع�ʧ�ܣ�\n" + delRx_param.errorMsg;
						return false;
					}
					this.YBErrorInfo = "ҽ��ҩƷ����¼��ʧ�ܣ�\n" + addDrug_param.errorMsg;
					return false;
				}
				
				
			}else {//ҩ��
				for(var j = 0; j < MCF.length; j++){
					var MCF_50_GRP = $(MCF[j]).find("MCF\\.50\\.GRP")[0];//���ﴦ����ϸ��Ϣ
					var DCFSJ = $(MCF[j]).find("MCF\\.6").text();//����ʱ��
					if(CXMBM == "C0"){
						YPTYPE = "1";
						CXMBM = "90"
					}else if(CXMBM == "C1"){
						YPTYPE = "3";
						CXMBM = "91"
					}
					var MCF_50 = $(MCF_50_GRP).find("MCF\\.50");//���ﴦ����ϸ��Ϣ,���
					for(var k = 0; k<MCF_50.length; k++){
						var IXH = $(MCF_50[k]).find("MCF\\.54").text();
						var CLSH_IXH = "";
						var id = $(data).find("MJZ\\.1").text();
						id = id.substring(0,6)+(parseInt(id.substring(6))+parseInt("1"));
						if(CXMBM != ""){
							CLSH_IXH = id.substring(id.length-4) + CXMBM + IXH;
						}
						//�ϴ�����
						var addDrug = "functionName=addDrug"+
						"|id="+(MainInfo.ZRNH_Tag?MainInfo.cmzhBak:id)+//����סԺ��
						"|xh="+CLSH_IXH+//��ˮ��
						"|type="+YPTYPE+//ҩƷ���1-��ҩ��2-�г�ҩ��3-�в�ҩ��4-Ժ���Ƽ���
						"|cfDate="+DCFSJ.substring(0,4)+DCFSJ.substring(5,7)+DCFSJ.substring(8,10)+//�������ڣ�yyyymmdd��
						"|cfNO="+$(MCF_50[k]).find("MCF\\.53").text()+//������
						"|billNO="+CDJH+//���ݺ�
						"|hisNO="+$(MCF_50[k]).find("MCF\\.55").text()+//ҽԺҩƷ����
						"|hisName="+$(MCF_50[k]).find("MCF\\.56").text()+//ҽԺҩƷ����
						(YPTYPE == "3" ? "|hisZycflb="+'1' : "")+//�в�ҩ�������(1-��ζ,2-����)���в�ҩ��¼��
					//	"|lclj="+lclj+//�ٴ�·����1-·���ڣ�2-·���⣩
						"|unitPrice="+$(MCF_50[k]).find("MCF\\.78").text()+//����
						"|quantity="+$(MCF_50[k]).find("MCF\\.61").text()+//����
						"|amount="+$(MCF_50[k]).find("MCF\\.71").text()//���


			   			var addDrug_rtnMsg = this.YBHandle.funMainYX(addDrug);
						var addDrug_param = this.splitStr(addDrug_rtnMsg);
						if(addDrug_param.errFlag == 0 || addDrug_param.returnValue == -1){
							//������Ϣɾ��
							var delInfo = "functionName=delInfo"+
								"|id="+(MainInfo.ZRNH_Tag?MainInfo.cmzhBak:id);//����סԺ�ţ�ϵͳΨһ��
							var delInfo_rtnMsg = this.YBHandle.funMainYX(delInfo);
							var delInfo_param = this.splitStr(delInfo_rtnMsg);
							if(delInfo_param.returnValue == -1){
								this.YBErrorInfo = "ҽ��������Ϣ�ع�ʧ�ܣ�\n" + delInfo_param.errorMsg;
								return false;
							}
							var delRx = "functionName=delRx" +
									"|id=" +(MainInfo.ZRNH_Tag?MainInfo.cmzhBak:id)
									"|xh="+CLSH_IXH;
							var delRx_rtnMsg = this.YBHandle.funMainYX(delRx);
							var delRx_param = this.splitStr(delRx_rtnMsg);
							if(delRx_param.returnValue == -1){
								this.YBErrorInfo = "ҽ��������Ϣ�ع�ʧ�ܣ�\n" + delRx_param.errorMsg;
								return false;
							}
							this.YBErrorInfo = "ҽ��ҩƷ����¼��ʧ�ܣ�\n" + addDrug_param.errorMsg;
							return false;
						}
					}
				}
			}
		}
*/
		//�ԷѲ���תũ�ϲ��ˣ����ϴ���Ϣ�������ܴ�ҽ��ҵ������
		if(MainInfo.ZRNH_Tag){
			alert("�����ϴ��ɹ�");
			//����TBCYBLJZMX��ҽ����CYBH�ֶ�
			MainInfo.updateCYBH(this.AxmlObj.toObj());
			$("#BtnZRNH").attr("disabled",true);
			MainInfo.clearall();
                	MainInfo.SetStatus("Brower");
			return true;
		}
		var Opr = new OperateDom();
		var Msg = Opr.append("ROOT","MSG","");
		Opr.appendAttribute(Msg,"Class","CY.CYYW.TSaveBRJZXX");
		Opr.appendAttribute(Msg, "XMLType", "0");		
		if (MainInfo.FStatus == "ADD"){ 
			Opr.appendAttribute(Msg, "Fun", "ADD");
		}
		else if (MainInfo.FStatus == "Modify") {
			Opr.appendAttribute(Msg, "Fun", "MODIFY");
		}
		Opr.appendAttribute(Msg, "CNBBZ", "1");	
		var AXML = this.LoadXML(inData.xml);		
		Opr.appendChild(Msg, AXML.documentElement);
		new Ajax.Request("PubServlet/PubServlet",{
			method: 'post',				
			parameters: Opr.toObj(),
			onComplete: MainInfo.ReturnSave,
			asynchronous: false
		});	
		return ReNode;		
	},
	//��ȡ���˻�����Ϣ(����ܵ���)
	GetYBBRJBXX: function() {
		//this.YBHandle = new ActiveXObject("YXYBCOM.YXYB363");
		if(this.YBHandle == undefined){
			this.YBErrorInfo = "����ҽ��COMʧ�ܣ����ҵ�񽫲���ʹ�ã�";
			return false;
		}
		var rtnMsg = this.YBHandle.funMainYX("03","<?xml version='1.0' encoding='GBK' standalone='yes' ?><input></input>"); 
		var rtnVal = rtnMsg.split("|");
		if (rtnVal[0] == "0") {//
			this.YBErrorInfo =  "ũ�Ͻӿڳ�ʼ��ʧ��:\n" + rtnVal[1];
			alert("ũ�Ͻӿڳ�ʼ��ʧ��:\n" + rtnVal[1])
			return false;
		}else{
			var Nodes = this.LoadXML(rtnVal[1]);
			if(Nodes.selectSingleNode("output/aac001")!=null){
				$("#74800015").val(Nodes.selectSingleNode("output/aac003").text);//����
				$("#74800018").val(Nodes.selectSingleNode("output/aac001").text); //�籣�� ũ��֤��
				$("#74800016").val(Nodes.selectSingleNode("output/aac004").text);//�Ա�
				$("#74800020").val(Nodes.selectSingleNode("output/aac006").text);//��������	
				$("#74800017").val(Nodes.selectSingleNode("output/yke112").text);//����	
			}
		}
		
		/*
		var data = this.showDialog("CYYBInterface/JSYBInterface_002.jsp", {width:800, height:260}, null)
		if (data !== null && data !== undefined) {
			$("#74800015").val(data.getAttribute("NAME"));//����
			$("#74800018").val(data.getAttribute("COOPMEDCODE")); //�籣�� ũ��֤��
			$("#74800016").val(data.getAttribute("SEX"));//�Ա�
			$("#74800020").val(data.getAttribute("BIRTHDAY"));//��������			
			
			if (data.getAttribute("NATIONCODE") !== "" && data.getAttribute("NATIONNAME") !== "") {
				$("#jbz02").val(data.getAttribute("NATIONNAME"));//����
				var Tmp = data.getAttribute("NATIONCODE");				
				$("#jbz02").attr("CBM", parseInt(Tmp));//�������
			}			
			$("#74800017").val(Funs.YearsBetween(data.getAttribute("BIRTHDAY")));//������		
			$("#Btnchoice").attr("disabled", true);
			//ҽ�ƿ���
			$("#YBYLKH")[0].value = data.getAttribute("YLKH");
			//��ַ
			var address = data.getAttribute("address") + "";
			if(address != "null" && address != ""){		//��ȡ�����
				var iXian = address.indexOf("��") * 1;	//"��"��λ��
				var iZhen = address.indexOf("��") * 1;	//"��"��λ��
				var iCun = address.indexOf("��") * 1;	//"��"��λ��
				if(iXian != -1 && iZhen != -1){
					var sZhen = address.substring(iXian + 1,iZhen + 1);
					if(sZhen != "" && sZhen != null){
						$("#jbz06")[0].value = sZhen;
					}
				}
				if(iZhen != -1 && iCun != -1){
					var sCun = address.substring(iZhen + 1,iCun + 1);
					if(sCun != "" && sCun != null){
						$("#jbz07")[0].value = sCun;
					}
				}
			}
			$("#jbz11").val("");
		}*/
		return true;
	},
	GetDZXX : function(){
		this.YBHandle = new ActiveXObject("YXYBCOM363_CY.YXYB");
		if(this.YBHandle == undefined){
			this.YBErrorInfo = "����ҽ��COMʧ�ܣ����ҵ�񽫲���ʹ�ã�";
			return false;
		}
		var rtnMsg = this.YBHandle.funMainYX("91","<?xml version='1.0' encoding='GBK' standalone='yes' ?><input><aae035>2015-01-01 12:00:00</aae035><outputfile>D:\YBML.txt</outputfile></input>"); 
		var rtnVal = rtnMsg.split("|");
		if (rtnVal[0] == "0") {//
			this.YBErrorInfo =  "ũ�Ͻӿڳ�ʼ��ʧ��:\n" + this.YBHandle.ErrorInfo;
			alert("ũ�Ͻӿڳ�ʼ��ʧ��:\n" + this.YBHandle.ErrorInfo)
			return false;
		}else{
			var Nodes = this.LoadXML(rtnVal[1]);
			alert(Nodes.xml);
		}
	},
	LoadGrid : function(){
		var columns = [{name:'ũ��֤��',fieldname:'COOPMEDCODE',width:100},
				 {name:'����',fieldname:'NAME',width:80},
				 {name:'�Ա�',fieldname:'SEX',width:50},
				 {name:'��������',fieldname:'BIRTHDAY',width:100},
				 {name:'��ϵ',fieldname:'RELATIONNAME',width:100},				 
				 {name:'���ڼ�ͥ�˻����',fieldname:'HOMEACCOUNT',width:140},
				 {name:'���ڼ�ͥ�˻����',fieldname:'PREHOMEACCOUNT',width:140},
				 {name:'���֤��',fieldname:'IDCARD',width:200}];
		this.DivGrid = new TbStringGrid("DivGrid",columns,{});
		this.DivGrid.onclick = function(Index){
			CurrXML = YBCOM.DivGrid.result[Index];
		};
		this.DivGrid.ondblclick = function(){
			YBCOM.ChooseBR();
		};		
	},
	LoadJBXX : function(CJGBH){
		this.CNHBH = $("#XNHH").val();		//'IDNO'
		var IDNO = $("#XNHH").attr("IDNO");
		if (this.CNHBH == "") {
			alert("����δ����ũ��֤�ţ�");
			return;
		}
		if (CJGBH.length < 8) {
			alert("�ô�վ����ҽ�ƻ����������ô�������ϵ����Ա��");
			return;
		} 		
		if (this.CNHBH.length < 2) {
			alert("ũ��֤������������������룡");
			return;
		}
	        if (this.CNHBH.substring(0, 2) !== CJGBH.substring(6, 8)) {
			alert("����ͳ�ﲻ�ܿ����򣬸ò��˷Ǳ�������Ա�����ܰ������ҵ��")
			return;
	        }
		this.PostXML(["CBH","IDNO"], [this.CNHBH,IDNO == null ? "" : IDNO], "CY.CYYBInterface.TCYYBInterface_002", "GetJBXX", this.JBXXData);
	},
	JBXXData : function(ajax){
		var node = ajax.responseXML.documentElement;
		if(node !==null){
			if (node.selectSingleNode("Exception") !== null) {				
				alert(node.text);
				return;
			}	
			if (node.selectSingleNode("Fieldsvalue").childNodes.length == 0) {
				alert("δ�鵽�κ���Ϣ�����������ũ��֤���Ƿ���ȷ��");
				return;
			}	
			YBCOM.DivGrid.showResult(ajax.responseXML);	
			if($("#XNHH").attr("IDNO") != null ){
				YBCOM.DivGrid.onclick(0);
				YBCOM.DivGrid.ondblclick(0);
			}
		}		
	},
	Return_TF: function(ajax) {		
		var node = ajax.responseXML.documentElement;
		if(node !==null){
			if (node.selectSingleNode("Exception") !== null) {				
				alert("�����˷�ʧ�ܣ�\n" + node.text);
				return;
			}	
			if (node.selectSingleNode("RESFAIL") !== null) {
				alert(node.text);//�˷�ʧ��
				return;
			}		
			YBCOM.BTFBZ = true;
			var SFXGRP = node.selectSingleNode("SFX.GRP").childNodes;
			this.TFJBRBM = SFXGRP[0].selectSingleNode("SFX.32").text;
			this.TFJBRMC = SFXGRP[0].selectSingleNode("SFX.33").text;
			this.PostXML(["CMZH"],[SFXGRP[0].selectSingleNode("SFX.6").text], "CY.CYYW.JSXXQry", "", this.SelCYTFLoad);
			this.PostXML(["CMZH","CJZSJ"],[SFXGRP[0].selectSingleNode("SFX.6").text, SFXGRP[0].selectSingleNode("SFX.23").text.substring(0,10)],"CY.CYYW.BRJBXX", "02", this.ReturnDele, false);
		}else{
			YBCOM.BTFBZ = false;
			alert("�����˷�ʧ�ܣ������ԣ�");
		}
	},
	ReturnDele : function(ajax){
		var node = ajax.responseXML.documentElement;
		if(node !==null){							
			MainInfo.clearall();
			Jzinfo.OPENQRY();
		}
	},
	SelCYTFLoad : function(ajax){
		var MxXml = ajax.responseXML.documentElement;
		if (MxXml.selectSingleNode("Exception") !== null) {
			return ;
		}
		var Node = MxXml.selectNodes("/xml/Fieldsvalue/Fieldvalue");
		if(Node.length<1){
			return;
		}
		this.YBHandle = new ActiveXObject("YXYBCOM363_CY.YXYB");
		if(this.YBHandle == undefined){
			this.YBErrorInfo = "ҽ��DLLδ��ʼ���ɹ������ҵ����ʹ�ã�";
			return false;
		}
		var NodeMsg = "";
		//var WYMZH = Node[0].getAttribute("CMZH");
		NodeMsg += "<?xml version='1.0' encoding='GBK' standalone='yes' ?><input>";
		NodeMsg += "<akc190>"+Node[0].getAttribute("AKC190")+"</akc190>";
		NodeMsg += "<aaz216>"+Node[0].getAttribute("AAZ216")+"</aaz216>";
		NodeMsg += "<aac001>"+Node[0].getAttribute("AAC001")+"</aac001>";
		NodeMsg += "<aka130>"+Node[0].getAttribute("AKA130")+"</aka130>";
		NodeMsg += "<ykb065>"+Node[0].getAttribute("YKB065")+"</ykb065>";
		NodeMsg += "<aae011>"+this.TFJBRBM+"</aae011>";
		NodeMsg += "<ykc141>"+this.TFJBRMC+"</ykc141>";
		NodeMsg += "<aae013>��</aae013>";
		NodeMsg += "</input>";
		var rtnMsg = this.YBHandle.funMainYX("42",NodeMsg); 
		var rtnVal = rtnMsg.split("|");
		if (rtnVal[0] == "0") {//
			this.YBErrorInfo =  "ũ�Ͻӿڳ�ʼ��ʧ��:\n" + rtnVal[1];
			alert("ũ�Ͻӿڳ�ʼ��ʧ��:\n" + rtnVal[1])
			YBCOM.BTFBZ = false;
		}else{
			YBCOM.BTFBZ = true;
		}
	},
	ChooseBR: function() {
		if (CurrXML == null) {
			alert("����δѡ���ˣ�������ѡ��");
			return;
		}
		//���ҽ�ƿ���
		CurrXML.setAttribute("YLKH", this.YLKH);
		window.returnValue = CurrXML;
		window.close();
	},
	Close: function() {
		window.close();		
	},
	/**
	 * ˢ����ȡҽ�ƿ���
	 */
	SwipeCard : function(){
		try {
			if(this.oSwipeCard == null){
				//��ȡ����
				this.oSwipeCard = new ActiveXObject("YXYLKDK.YXDK001");
				if(!this.oSwipeCard.Sysinit('','','')){
					alert("�����ʼ��ʧ��!");
					this.oSwipeCard = null;
					return;
				}
			}
			var temp = "";		//��3����������Ҫ���������Ρ���
			//ˢ���ɹ�,Ȼ����ò�ѯ
			
			if(this.oSwipeCard.Execute("READCARD","",temp)){
				return this.oSwipeCard.ReturnValue;
			}else{
				return null;
			}
		}catch(e){
			alert("ˢ���ѳ�ʱ�������µ��ˢ��!");
			return null;
		}
	},
	/**
	 * ��ȡũ�Ϻ�
	 */
	getNHH : function(){
		this.YLKH = this.SwipeCard();
//		this.YLKH = "017000";			//���ڲ���
		if(this.YLKH != null && this.YLKH != ""){
			this.PostXML(["CKH"], [this.YLKH], "CY.CYYBInterface.TCYYBInterface_002", "GetNHBH", this.toGetNHH);		
		}
	},
	toGetNHH : function(ajax){
		var node = ajax.responseXML.documentElement;
		if(node != null){
			if(node.selectSingleNode("Exception") != null){
				alert("�������쳣����鿴��־!");
				return;
			}
			var obj = node.selectSingleNode("Fieldsvalue/Fieldvalue");
			$("#XNHH")[0].value = obj.getAttribute("NHH");
			$("#XNHH").attr("IDNO", obj.getAttribute("IDNO"))
			$("#query")[0].click();			
		}
	},
	YBConfig: function() {
		alert("�ýӿ�δ�ṩ�ù��ܣ�");
		return true;		
	},	
	/**
	 * ��ҽ��ҳ����ø��˲���-����
	 */
	callGRBL : function(){
		var rtnValue = this.SwipeCard();	//ˢ����õ�ֵ
		if(rtnValue != ""){
			this.showDialog("/LD/EHRCenter/Login.jsp?username=" + rtnValue + "&password=&CallPage=", {width: "1020", height:"700"}, {});
		}
	}
})
var YBCOM = new YBInterface;