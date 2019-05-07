Home = {
	bwidth : null,
	bheight : null,
	myChart1 : null,
	myChart2 : null,
	myChart3 : null,
	option1 : null,
	option2 : null,
	option3 : null,
	initload : function(){
		Home.bwidth=document.body.clientWidth;
		Home.bheight=document.body.clientHeight;
		Home.initCss();
		Home.Center1Show();
		Home.Center2Show();
		Home.Center3Show();
	},
	initCss : function(){
		$(".con").width(Home.bwidth);
		$(".con").height(Home.bheight);
		$(".Center1").width(Home.bwidth-50);
		$(".Center1").height(300);
		$(".Center1_right").width(Home.bwidth-206);
		
		$(".Center3").width(Home.bwidth-450);
		$(".BarTITLE").width(Home.bwidth-450);
		$(".BarCon").width(Home.bwidth-450);
		
	},
	Center1Show : function(){
		Home.myChart1 = echarts.init(document.getElementById('LineChart'));
		Home.option1 = {
				title: {
			        text: '利润趋势'
			    },
			    tooltip: {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['利润']
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    toolbox: {
			        feature: {
			            saveAsImage: {}
			        }
			    },
			    xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        data: ['8月','9月','10月','11月','12月']
			    },
			    yAxis: {
			    	type: 'value',
			        axisLabel: {
			            formatter: '{value} 万元'
			        }
			    },
			    series: [
			        {
			            name:'全部',
			            type:'line',
			            stack: '利润',
			            areaStyle: {normal: {}},
			            data:[ 101, 134, 90, 230, 210]
			        }
			    ]
	    }
		Home.myChart1.setOption(Home.option1);
	},
	Center1Check : function(sta){
		if(sta==0){
			Home.option1.series[0].data = [ 101, 134, 90, 230, 210];
		}else if(sta==1){
			Home.option1.series[0].data = [ 51, 74, 55, 135, 100];
		}else if(sta==2){
			Home.option1.series[0].data = [ 50, 60, 35, 95, 110];
		}
		Home.myChart1.setOption(Home.option1);
		Home.myChart1.hideLoading();
	},
	Center2Show : function(){
		Home.myChart2 = echarts.init(document.getElementById('PieChart'));
		Home.option2 = {
				title : {
			        show:false
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        left: 'left',
			        data: ['一厂','二厂','三厂']
			    },
			    series : [
			        {
			            name: '利润（万元）',
			            type: 'pie',
			            radius : '65%',
			            center: ['50%', '60%'],
			            data:[
			                {value:335, name:'一厂'},
			                {value:310, name:'二厂'},
			                {value:234, name:'三厂'}
			            ],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
	    }
		Home.myChart2.setOption(Home.option2);
	},
	Center3Show : function(){
		Home.myChart3 = echarts.init(document.getElementById('BarChart'));
		Home.option3 = {
				xAxis: {
			        type: 'category',
			        data: ['枸杞', '岐黄', '甘草', '当归', '皂角', '五味子', '三七', '人参', '牛黄', '金银花']
			    },
			    yAxis: {
			        type: 'value'
			    },
			    series: [{
			        data: [200, 197, 170, 170, 153, 143, 130, 122, 110, 60],
			        type: 'bar'
			    }]
	    }
		Home.myChart3.setOption(Home.option3);
	}
}