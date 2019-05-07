includecss("resource/default/JavaScript/bootstrap-datetimepicker.min.css");
include("resource/default/JavaScript/moment-with-locales.js");
include("resource/default/JavaScript/bootstrap-datetimepicker.min.js");
include("resource/default/JavaScript/bootstrap-datetimepicker.zh-CN.js");

var TimeSelect = Class.create();
TimeSelect.prototype = Object.extend(new TBase(), {
	Nowdate : null,//初始化时间
	ThisTime : [],
	initialize : function(id,options) {
		if(arguments.length == 2){
			this.create(id,options);
		}
	},
	create : function(id,options){
		TimeSelect.prototype.ThisTime[id] = this;
		this.json = options;
		this.id = id;
		var Html = new StringBuffer();
		var showtype = options.showtype == undefined ? "0|1|2|3|4": options.showtype;
		this.Nowdate = options.Nowdate == undefined ? undefined: options.Nowdate;
		this.MRTyp = options.MRType == undefined ? "0" : options.MRType;
		this.ChaT = options.ChangeT == undefined ? "0" : options.ChangeT;
		Html.append('<div class="pull-left" id="'+id+'_lx1" style="line-height:32px;height:32px;">时间设置：</div>');
		Html.append('<div class="pull-left" id="box1_'+this.id+'"><button class="btn btn-sm btn-primary" id="'+id+'_CXLX" pId="'+id+'" showtype="'+showtype+'" onclick="TimeSelectEvent.initCXLX(this);" ></button></div>');
		Html.append('<div class="row pull-left" style="padding:0px;margin:0px;">');
		Html.append('<div class="pull-left" id="'+id+'_n1" style="line-height:32px;height:32px;">&nbsp;年　份：</div>');
		Html.append('<div class="pull-left form-inline" id="box2_'+id+'" ><input class="input-small input-TimeSelect" id="'+id+'_YEAR" type="text" readonly="readonly" pId="'+id+'" onclick="TimeSelectEvent.YearsShow(this);" /></div>');
		Html.append('</div>')
		Html.append('<div class="row pull-left" style="padding:0px;margin:0px;">');
		Html.append('<div class="pull-left" id="'+id+'_s1" style="line-height:32px;height:32px;">&nbsp;时　间：</div>');
		Html.append('<div class="pull-left" id="box3_'+id+'"><input class="input-small input-TimeSelect" id="'+id+'_MONTH" type="text" readonly="readonly" pId="'+id+'" onclick="TimeSelectEvent.MonthShow(this);" /></div>');
		Html.append('<div class="pull-left" id="box4_'+id+'"><input class="input-small input-TimeSelect" id="'+id+'_SEASON" type="text" readonly="readonly" pId="'+id+'" onclick="TimeSelectEvent.SeasonShow(this);" /></div>');
		Html.append('<div class="pull-left" id="'+id+'_s3" style="width:150px;"><a class="input-group date" ><input class="form-control" id="'+id+'_DAY" type="text" style="margin: 0px;width: 111px;height:30px;" /><span class="input-group-addon" onclick="TimeSelectEvent.showTime(\''+id+'_DAY\')"><i class="fa fa-calendar bigger-110"></i></span></a></div>');
		Html.append('</div>')
		Html.append('<div class="row pull-left" style="padding:0px;margin:0px;">');
		Html.append('<div class="pull-left" id="'+id+'_s4" style="line-height:32px;height:32px;">&nbsp开始时间：</div>');
		Html.append('<div class="pull-left" id="'+id+'_s5" ><input class="input-small input-TimeSelect" id="'+id+'_BEGINDAY" type="text"/></div></div>');
		Html.append('<div class="pull-left" id="'+id+'_s6" style="line-height:32px;height:32px;">&nbsp结束时间：</div>');
		Html.append('<div class="pull-left" id="'+id+'_s7" ><input class="input-small input-TimeSelect" id="'+id+'_ENDDAY" type="text"/></div></div>');
		Html.append('</div>')
		Html.append('</div>');
		$("#" + id).html(Html.toString());
		this.getDateTime();
		this.setType(this.MRTyp);
		var showtypes = showtype.split("|");
		if(showtypes.length==1){
			$('#'+id+'_lx1').hide();
			$('#box1_'+id).hide();
		}
		if(this.isHideLx){
			$("#"+this.id+"_lx1,#box1_"+this.id).each(function(i,n){$(n).hide();});
		}
		this.initDate();
		$(document).click(function(e){
			var _target = $(e.target);
			if(_target.attr("id")!="YearSD_"+id&&_target.attr("id")!=id+"_YEAR"&&_target.attr("id")!=id+"_pageup"&&_target.attr("id")!=id+"_pagedown"){
				$("#YearSD_"+id).hide();
			}
			if(_target.attr("id")!="SeasonSD_"+id&&_target.attr("id")!=id+"_SEASON"){
				$("#SeasonSD_"+id).hide();
			}
			if(_target.attr("id")!="MonthSD_"+id&&_target.attr("id")!=id+"_MONTH"){
				$("#MonthSD_"+id).hide();
			}
			if(_target.attr("id")!="CXLX_"+id&&_target.attr("id")!=id+"_CXLX"){
				$("#CXLX_"+id).hide();
			}
		});
		this.changeEndTime();
	},
	initDate : function(){
		if(this.Nowdate){
			var str = this.Nowdate.replace(/-/g,"/");
			this.Nowdate = new Date(str);
		}else{
			this.Nowdate = new Date();
		}
		
		var Yeartime = this.Nowdate.getFullYear();
		var Monthtime = this.Nowdate.getMonth()+1;
		$("#"+this.id+"_DAY").val(this.Nowdate);
		$("#"+this.id+"_ENDDAY").val(this.Nowdate);
		$("#"+this.id+"_BEGINDAY").val(this.Nowdate);
		$("#"+this.id+"_YEAR").val(Yeartime);
		var Monthtimes = {"1":["一月","01-01"],"2":["二月","02-01"],"3":["三月","03-01"],"4":["四月","04-01"],"5":["五月","05-01"],"6":["六月","06-01"],
				"7":["七月","07-01"],"8":["八月","08-01"],"9":["九月","09-01"],"10":["十月","10-01"],"11":["十一月","11-01"],"12":["十二月","12-01"]};
		$("#"+this.id+"_MONTH").val(Monthtimes[String(Monthtime)][0])
		$("#"+this.id+"_MONTH").attr("SValue",Monthtimes[String(Monthtime)][1]);
		var Seasontimes = {"01":["第一季度","01-01"],"02":["第二季度","04-01"],"03":["第三季度","07-01"],"04":["第四季度","10-01"]};
		if(0<Monthtime<4){
			$("#"+this.id+"_SEASON").val(Seasontimes["01"][0])
			$("#"+this.id+"_SEASON").attr("SValue",Seasontimes["01"][1]);
		}else if(3<Monthtime<7){
			$("#"+this.id+"_SEASON").val(Seasontimes["02"][0])
			$("#"+this.id+"_SEASON").attr("SValue",Seasontimes["02"][1]);
		}else if(6<Monthtime<10){
			$("#"+this.id+"_SEASON").val(Seasontimes["03"][0])
			$("#"+this.id+"_SEASON").attr("SValue",Seasontimes["03"][1]);
		}else if(9<Monthtime<13){
			$("#"+this.id+"_SEASON").val(Seasontimes["04"][0])
			$("#"+this.id+"_SEASON").attr("SValue",Seasontimes["04"][1]);
		}
	},
	ShowState : function(stat){
		if(stat=="0"){
			$("#"+this.id+"_n1,#box2_"+this.id+",#box3_"+this.id+",#box4_"+this.id+",#"+this.id+"_s4,#"+this.id+"_s5,#"+this.id+"_s6,#"+this.id+"_s7").each(function(i,n){$(n).hide();});
			$("#"+this.id+"_s1,#"+this.id+"_s3").each(function(i,n){$(n).show();});
			$("#"+this.id+"_s1").html("&nbsp;时　间：");
		}else if(stat=="1"){
			$("#"+this.id+"_s3"+",#box4_"+this.id+",#"+this.id+"_s4,#"+this.id+"_s5,#"+this.id+"_s6,#"+this.id+"_s7").each(function(i,n){$(n).hide();});
			$("#"+this.id+"_n1,#box2_"+this.id+",#"+this.id+"_s1,#box3_"+this.id).each(function(i,n){$(n).show();});
			$("#"+this.id+"_s1").html("&nbsp;月　份：");
		}else if(stat=="2"){
			$("#"+this.id+"_s3"+",#box3_"+this.id+",#"+this.id+"_s4,#"+this.id+"_s5,#"+this.id+"_s6,#"+this.id+"_s7").each(function(i,n){$(n).hide();});
			$("#"+this.id+"_n1,#box2_"+this.id+",#"+this.id+"_s1,#box4_"+this.id).each(function(i,n){$(n).show();});
			$("#"+this.id+"_s1").html("&nbsp;季　度：");
		}else if(stat=="3"){
			$("#"+this.id+"_s1,#box3_"+this.id+",#"+this.id+"_s3"+",#box4_"+this.id+",#"+this.id+"_s4,#"+this.id+"_s5,#"+this.id+"_s6,#"+this.id+"_s7").each(function(i,n){$(n).hide();});
			$("#"+this.id+"_n1,#box2_"+this.id).each(function(i,n){$(n).show();});
		}else if(stat=="4"){
			$("#"+this.id+"_n1,#box2_"+this.id+",#box3_"+this.id+",#box4_"+this.id+",#"+this.id+"_s1,#"+this.id+"_s3"+",#"+this.id+"_s1").each(function(i,n){$(n).hide();});
			$("#"+this.id+"_s4,#"+this.id+"_s5,#"+this.id+"_s6,#"+this.id+"_s7").each(function(i,n){$(n).show();});
		}
	},
	getTime : function(){
		var ICXLX = $("#"+this.id+"_CXLX").text();
		var ReTime = "";
		if(ICXLX=="日"){
			ReTime = "0|"+$("#"+this.id+"_DAY").val();
		}else if(ICXLX=="月"){
			ReTime = "1|"+$("#"+this.id+"_YEAR").val()+"-"+$("#"+this.id+"_MONTH").attr("SValue");
		}else if(ICXLX=="季"){
			ReTime = "2|"+$("#"+this.id+"_YEAR").val()+"-"+$("#"+this.id+"_SEASON").attr("SValue");
		}else if(ICXLX=="年"){
			ReTime = "3|"+$("#"+this.id+"_YEAR").val()+"-01-01";
		}
		else if(ICXLX=="时间段"){
			ReTime = "4|"+$("#"+this.id+"_BEGINDAY").val()+"="+$("#"+this.id+"_ENDDAY").val();
		}
		return ReTime;
	},
	setType : function(MRStat){
		switch (MRStat){
		case "0":
			$("#"+this.id+"_CXLX").text("日");
			$("#"+this.id+"_CXLX").attr("SValue","0");
			this.ShowState("0");
			break;
		case "1":
			$("#"+this.id+"_CXLX").text("月");
			$("#"+this.id+"_CXLX").attr("SValue","1");
			this.ShowState("1");
			break;
		case "2":
			$("#"+this.id+"_CXLX").text("季");
			$("#"+this.id+"_CXLX").attr("SValue","2");
			this.ShowState("2");
			break;
		case "3":
			$("#"+this.id+"_CXLX").text("年");
			$("#"+this.id+"_CXLX").attr("SValue","3");
			this.ShowState("3");
			break;
		case "4":
			$("#"+this.id+"_CXLX").text("时间段");
			$("#"+this.id+"_CXLX").attr("SValue","4");
			this.ShowState("4");
			break;
		default:
			break;
		}
	},
	setTime : function(TimeJson){
		var timeType = TimeJson["dateType"];
		switch (timeType){
		case "0":
			$("#"+this.id+"_DAY").val(TimeJson["beginTime"]);
			$("#"+this.id+"_CXLX").text("日");
			$("#"+this.id+"_CXLX").attr("SValue","0");
			this.ShowState("0");
			break;
		case "1":
			var timelit = TimeJson["beginTime"].split("-");
			var MonthC = {"01":"一月","02":"二月","03":"三月","04":"四月","05":"五月","06":"六月","07":"七月","08":"八月","09":"九月","10":"十月","11":"十一月","12":"十二月"};
			$("#"+this.id+"_YEAR").val(timelit[0]);
			$("#"+this.id+"_MONTH").val(MonthC[timelit[1]]);
			$("#"+this.id+"_MONTH").attr("SValue",timelit[1]+"-01");
			$("#"+this.id+"_CXLX").text("月");
			$("#"+this.id+"_CXLX").attr("SValue","1");
			this.ShowState("1");
			break;
		case "2":
			var timelit = TimeJson["beginTime"].split("-");
			var MonthC = {"01":"第一季度","04":"第二季度","07":"第三季度","10":"第四季度"};
			$("#"+this.id+"_YEAR").val(timelit[0]);
			$("#"+this.id+"_SEASON").val(MonthC[timelit[1]]);
			$("#"+this.id+"_SEASON").attr("SValue",timelit[1]+"-01");
			$("#"+this.id+"_CXLX").text("季");
			$("#"+this.id+"_CXLX").attr("SValue","2");
			this.ShowState("2");
			break;
		case "3":
			var timelit = TimeJson["beginTime"].split("-");
			$("#"+this.id+"_YEAR").val(timelit[0]);
			$("#"+this.id+"_CXLX").text("年");
			$("#"+this.id+"_CXLX").attr("SValue","3");
			this.ShowState("3");
			break;
		case "4": 
			var timelit = TimeJson["beginTime"].split("=");
			$("#"+this.id+"_BEGINDAY").val(timelit[0]);
			$("#"+this.id+"_ENDDAY").val(timelit[1]);
			this.ShowState("4");
			break;
		default:
			break;
		}
	},
	getDateTime : function(){
		this.DayObj = $("#"+this.id+"_DAY").datetimepicker({
			language: 'zh-CN',//显示中文
			format: 'yyyy-mm-dd',//显示格式
			minView: 'year',//设置只显示到月份
			initialDate: this.Nowdate,
			autoclose: true,//选中自动关闭
			todayBtn: true,//显示进入按钮
			locale: moment.locale('zh-cn')
		})
		this.BeginDayObj = $("#"+this.id+"_BEGINDAY").datetimepicker({
			language: 'zh-CN',//显示中文
			format: 'yyyy-mm-dd',//显示格式
			minView: 'month',//设置只显示到月份
			initialDate: this.Nowdate,
			autoclose: true,//选中自动关闭
			todayBtn: true,//显示进入按钮
			locale: moment.locale('zh-cn')
		})
		this.EndDayObj = $("#"+this.id+"_ENDDAY").datetimepicker({
			language: 'zh-CN',//显示中文
			format: 'yyyy-mm-dd',//显示格式
			minView: 'month',//设置只显示到月份
			initialDate: this.Nowdate,
			autoclose: true,//选中自动关闭
			todayBtn: true,//显示进入按钮
			locale: moment.locale('zh-cn')
		})
	},
	changeEndTime : function () {
		$("#"+this.id+"_DAY").blur(function () {
			if (!TimeSelectEvent.IsDate($(this))) {
				var _this = this;
				plus.alert("error","<font color='red'>"+('时间格式不正确!!!')+"</font>",function(){
					$(_this).val(this.Nowdate);
					$(_this).focus(); 
				})
				return;
			}
		})
		$("#"+this.id+"_ENDDAY").blur(function () {
			if (!TimeSelectEvent.IsDate($(this))) {
				var _this = this;
				plus.alert("error","<font color='red'>"+('结束时间格式不正确!!!')+"</font>",function(){
					$(_this).val(this.Nowdate);
					$(_this).focus(); 
				})
				return;
			}
		})
		$("#"+this.id+"_BEGINDAY").blur(function () {
			var _this = this;
			if (!TimeSelectEvent.IsDate($(this))) {
				plus.alert("error","<font color='red'>"+('开始时间格式不正确!!!')+"</font>",function(){
					$(_this).val(this.Nowdate);
					$(_this).focus(); 
				})
				return;
			}
		})
	}
});

var TimeSelectEvent = {
		initCXLX : function(aEvent){
			var pid = $(aEvent).attr("pId");
			var showtype = $(aEvent).attr("showtype");
			var showtypes = showtype.split("|");
			var CXLX = ["日","月","季","年","时间段"];
			if($("#CXLX_"+pid).val()===undefined){
				var text = $("#"+pid+"_CXLX").text();
				var Html = "<div id='CXLX_"+pid+"' style='font-size:12px;margin-top:3px;margin-left:0px;z-index:5000;border:1px solid #CFCFCF;width:46px;height:"+showtypes.length*25+"px;display:none;border-radius:2px;background-color:#fff;position: absolute;'>";
				for(var i=0;i<showtypes.length;i+=1){
						Html += "<div Pid='"+pid+"' sValue='"+showtypes[i]+"' onclick='TimeSelectEvent.CXLXClick(this);' onmouseover='TimeSelectEvent.YearBtnStyle(1,this);' onmouseout='TimeSelectEvent.YearBtnStyle(2,this);' " +
								"style='cursor:pointer;float:left;padding:2px;width:41px;height:22px;background-color:#DAE7F8;text-align:center;margin-top:2px;margin-left:2px;'>"+CXLX[showtypes[i]]+"</div>";
				}
				Html += "</div>";
			}
			$("#box1_"+pid).append(Html);
			$("#CXLX_"+pid).show(400);
		},
		CXLXClick : function(obj){
			var id = obj.getAttribute("Pid");
			var LX = obj.getAttribute("sValue");
			var AThis = TimeSelect.prototype.ThisTime[id];
			$("#"+id+"_CXLX").text($(obj).text());
			$("#"+id+"_CXLX").attr("SValue",LX);
			AThis.ShowState(LX);
		},
		YearsShow : function(aEvent){
			var pid = $(aEvent).attr("pId");
			if($("#YearSD_"+pid).val()===undefined){
				var left = aEvent.offsetLeft;
				var top = aEvent.offsetTop;
				var Html = "<div id='YearSD_"+pid+"' style='margin-top:3px;margin-left:0px;z-index:5000;border:1px solid #CFCFCF;width:100px;height:160px;display:none;border-radius:2px;background-color:#fff;position: absolute;'>";
				Html += "<div id='Years_"+pid+"' style='float:inherit;width:100;height:130px;'></div>";
				Html += "<div style='width:100px;height:30px;float:inherit;'>" +
						"<div Pid='"+pid+"' id='"+pid+"_pageup' onclick='TimeSelectEvent.pageChange(1,this);' onmouseover='TimeSelectEvent.pageBtnStyle(1,this);' onmouseout='TimeSelectEvent.pageBtnStyle(2,this);' " +
						"style='cursor:pointer;float:left;padding:4px;color:#fff;width:46px;height:24px;background-color:#AECAF0;text-align:center;margin-top:2px;margin-left:2px;'>&lt;</div>" +
						"<div Pid='"+pid+"' id='"+pid+"_pagedown' onclick='TimeSelectEvent.pageChange(2,this);' onmouseover='TimeSelectEvent.pageBtnStyle(1,this);' onmouseout='TimeSelectEvent.pageBtnStyle(2,this);' " +
								"style='cursor:pointer;float:left;padding:4px;color:#fff;width:46px;height:24px;background-color:#AECAF0;text-align:center;margin-top:2px;margin-left:2px;'>&gt;</div>" +
						"</div>";
				Html += "</div>";
				$("#box2_"+pid).append(Html);
			}
			var text = $("#"+pid+"_YEAR").val();
			if(text==""){
				text = new Date().getFullYear();
			}
			TimeSelectEvent.initYearCon(text,pid);
			$("#YearSD_"+pid).show(400);
		},
		initYearCon : function(text,Cid){
			var initHtml = "";
			for(var i=0;i<10;i+=1){
				if(String(Number(text)-4+i)==$("#"+Cid+"_YEAR").val()){
					initHtml += "<div Pid='"+Cid+"' onclick='TimeSelectEvent.YearClick(this);' style='cursor:pointer;float:left;padding:4px;width:46px;height:24px;background-color:#AECAF0;text-align:center;margin-top:2px;margin-left:2px;'>"+(Number(text)-4+i)+"</div>";
				}else{
					initHtml += "<div Pid='"+Cid+"' onclick='TimeSelectEvent.YearClick(this);' onmouseover='TimeSelectEvent.YearBtnStyle(1,this);' onmouseout='TimeSelectEvent.YearBtnStyle(2,this);' " +
							"style='cursor:pointer;float:left;padding:4px;width:46px;height:24px;background-color:#DAE7F8;text-align:center;margin-top:2px;margin-left:2px;'>"+(Number(text)-4+i)+"</div>";
				}
			}
			$("#YearSD_"+Cid).attr("FirstNum",text);
//			YearEvent.FirstNum=text;
			$("#Years_"+Cid).html(initHtml);
		},
		pageChange : function(sta,obj){
			var id = obj.getAttribute("Pid");
			var NowFirst = 0;
			var FirstNum = $("#YearSD_"+id).attr("FirstNum");
			if(sta==1){
				NowFirst = Number(FirstNum)-10;
			}else{
				NowFirst = Number(FirstNum)+10;
			}
			TimeSelectEvent.initYearCon(String(NowFirst),id);
		},
		MonthShow : function(aEvent){
			var pid = $(aEvent).attr("pId");
			var text = $("#"+pid+"_MONTH").val();
			var MONTHText = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
			if($("#MonthSD_"+pid).val()===undefined){
				var left = aEvent.offsetLeft;
				var top = aEvent.offsetTop;
				var MONTHVal = ["01-01","02-01","03-01","04-01","05-01","06-01","07-01","08-01","09-01","10-01","11-01","12-01"];
				var Html = "<div id='MonthSD_"+pid+"' style='margin-top:3px;margin-left:0px;z-index:5000;border:1px solid #CFCFCF;width:60px;height:330px;display:none;border-radius:2px;background-color:#fff;position: absolute;'>";
				for(var i=0;i<MONTHText.length;i+=1){
					if(MONTHText[i]==text){
						Html += "<div id='"+pid+"_MonthC_"+i+"' Pid='"+pid+"' sValue='"+MONTHVal[i]+"' onclick='TimeSelectEvent.MonthClick(this);' style='cursor:pointer;float:left;padding:4px;width:54px;height:25px;background-color:#AECAF0;text-align:center;margin-top:2px;margin-left:2px;'>"+MONTHText[i]+"</div>";
					}else{
						Html += "<div id='"+pid+"_MonthC_"+i+"' Pid='"+pid+"' sValue='"+MONTHVal[i]+"' onclick='TimeSelectEvent.MonthClick(this);' onmouseover='TimeSelectEvent.YearBtnStyle(1,this);' onmouseout='TimeSelectEvent.YearBtnStyle(2,this);' " +
								"style='cursor:pointer;float:left;padding:4px;width:54px;height:25px;background-color:#DAE7F8;text-align:center;margin-top:2px;margin-left:2px;'>"+MONTHText[i]+"</div>";
					}
				}
				Html += "</div>";
				$("#box3_"+pid).append(Html);
			}else{
				for(var i=0;i<MONTHText.length;i+=1){
					if(MONTHText[i]==text){
						$("#"+pid+"_MonthC_"+i).css("background-color","#AECAF0");
					}else{
						$("#"+pid+"_MonthC_"+i).css("background-color","#DAE7F8");
					}
				}
			}
			$("#MonthSD_"+pid).show(400);
		},
		SeasonShow : function(aEvent){
			var pid = $(aEvent).attr("pId");
			var text = $("#"+pid+"_SEASON").val();
			var SEASONText = ["第一季度","第二季度","第三季度","第四季度"];
			if($("#SeasonSD_"+pid).val()===undefined){
				var left = aEvent.offsetLeft;
				var top = aEvent.offsetTop;
				var SEASONVal = ["01-01","04-01","07-01","10-01"];
				var Html = "<div id='SeasonSD_"+pid+"' style='margin-top:3px;margin-left:0px;z-index:5000;border:1px solid #CFCFCF;width:80px;height:110px;display:none;border-radius:2px;background-color:#fff;position: absolute;'>";
				for(var i=0;i<SEASONText.length;i+=1){
					if(SEASONText[i]==text){
						Html += "<div id='"+pid+"_SeasonC_"+i+"' Pid='"+pid+"' sValue='"+SEASONVal[i]+"' onclick='TimeSelectEvent.SeasonClick(this);' style='cursor:pointer;float:left;padding:4px;width:74px;height:24px;background-color:#AECAF0;text-align:center;margin-top:2px;margin-left:2px;'>"+SEASONText[i]+"</div>";
					}else{
						Html += "<div id='"+pid+"_SeasonC_"+i+"' Pid='"+pid+"' sValue='"+SEASONVal[i]+"' onclick='TimeSelectEvent.SeasonClick(this);' onmouseover='TimeSelectEvent.YearBtnStyle(1,this);' onmouseout='TimeSelectEvent.YearBtnStyle(2,this);' " +
								"style='cursor:pointer;float:left;padding:4px;width:74px;height:24px;background-color:#DAE7F8;text-align:center;margin-top:2px;margin-left:2px;'>"+SEASONText[i]+"</div>";
					}
				}
				Html += "</div>";
				$("#box4_"+pid).append(Html);
			}else{
				for(var i=0;i<SEASONText.length;i+=1){
					if(SEASONText[i]==text){
						$("#"+pid+"_SeasonC_"+i).css("background-color","#AECAF0");
					}else{
						$("#"+pid+"_SeasonC_"+i).css("background-color","#DAE7F8");
					}
				}
			}
			$("#SeasonSD_"+pid).show(400);
		},
		YearClick : function(obj){
			var id = obj.getAttribute("Pid");
			$("#"+id+"_YEAR").val($(obj).text())
			$("#YearSD_"+id).hide(400);
		},
		SeasonClick : function(obj){
			var id = obj.getAttribute("Pid");
			$("#"+id+"_SEASON").val($(obj).text())
			$("#"+id+"_SEASON").attr("SValue",$(obj).attr("sValue"));
			$(obj).css("background-color","#AECAF0");
			$("#SeasonSD_"+id).hide(400);
		},
		MonthClick : function(obj){
			var id = obj.getAttribute("Pid");
			$("#"+id+"_MONTH").val($(obj).text())
			$("#"+id+"_MONTH").attr("SValue",$(obj).attr("sValue"));
			$(obj).css("background-color","#AECAF0");
			$("#MonthSD_"+id).hide(400);
		},
		pageBtnStyle : function(sta,obj){
			if(sta==1){
				$(obj).css("background-color","#C6DAF4");
			}else{
				$(obj).css("background-color","#AECAF0");
			}
		},
		YearBtnStyle : function(sta,obj){
			var id=obj.getAttribute("Pid");
			if($(obj).text()==$("#"+id+"_YEAR").val()){
				return;
			}
			if(sta==1){
				$(obj).css("background-color","#EAF1FB");
			}else{
				$(obj).css("background-color","#DAE7F8");
			}
		},
		showTime : function(id){
			$('#'+id).focus();
		},
		IsDate : function (oTextbox) { 
		    var regex = new RegExp("^(?:(?:([0-9]{4}(-|\/)(?:(?:0?[1,3-9]|1[0-2])(-|\/)(?:29|30)|((?:0?[13578]|1[02])(-|\/)31)))|([0-9]{4}(-|\/)(?:0?[1-9]|1[0-2])(-|\/)(?:0?[1-9]|1\\d|2[0-8]))|(((?:(\\d\\d(?:0[48]|[2468][048]|[13579][26]))|(?:0[48]00|[2468][048]00|[13579][26]00))(-|\/)0?2(-|\/)29))))$"); 
		    var dateValue = oTextbox.val();
		    if (!regex.test(dateValue)) { 
		        return false; 
		    } 
		    return true;
		}
}