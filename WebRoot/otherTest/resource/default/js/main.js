var Main = Class.create();
Main.prototype = Object.extend(new TBase(),{
	InitLoad : function(){
		
	},
	goLocation : function(obj,IZT){
		var sender =$(obj);
		var menuLi = $("#mainmenu").find("li,.active");
		var menuClass = $(menuLi[0]).attr('class');
		if(menuClass.indexOf('hover')>-1){
			menuLi.attr('class','hover');
		}else{
			menuLi.attr('class','');
		}
		
		sender.parent().addClass('active');
		var parent = sender.parent();
		if(IZT==1){
			
		}else{
			while(parent.parent().attr('id')!='mainmenu'){
				parent=parent.parent().parent();
				parent.addClass('active open');
			}
		}
		$("#pagetitle").empty();
		var  sj= sender.attr("patch").split(",");
		for(var i=0;i<sj.length;i++){
			var temp = $("<li/>");
			if(i>0){
				//temp.attr("class","active");
				temp.addClass("active");
			}else{
				var idiv = $("<i/>");
				idiv.attr("class","ace-icon glyphicon glyphicon-map-marker");
				temp.append(idiv);
			}
			temp.append(sj[i]);
			$("#pagetitle").append(temp);
		}
		$("#accordion").attr("src",sender.attr("href"));
		return false;
	},
	QryMenu : function(div){
		
		var val = $(div).val().replace(/\s/g,"");
		if(val == ""){
			var li = $('#mainmenu li')
			li.show();
		}else{
			var li = $('#mainmenu>li');
			for(var i = 0;i<li.length;i+=1){
				var bool = this.chs(li[i],val);
				if(bool){
					$(li[i]).show();
				}else{
					$(li[i]).hide();
				}
			}
		}
	},
	chs : function(li,tex){
		var ul = $(li).children('ul');
		if(ul.length>0){
			var child = $(ul[0]).children('li');
			var tag = false;
			for(var i = 0;i<child.length;i+=1){
				var bool = this.chs(child[i],tex);
				if(bool){
					tag = true;
				}
			}
			if(tag){
				$(li).show();
			}else{
				$(li).hide();
			}
			return tag;
		}else{
			var val = $(li).children('a').text();
			if(val == ''){
				val = $(li).children('a').children('span').text();
			}
			if(val.indexOf(tex)>=0){
				return true
			}else{
				return false
			}
		}
	}
});
var main = new Main();