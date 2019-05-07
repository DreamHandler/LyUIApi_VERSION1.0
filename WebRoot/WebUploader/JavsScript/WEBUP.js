var FileInfo = "";
var webup ={
		Init:function(){
			$("#getSure").each(function(i,n){n.disabled = true;}); 
			//上传文件，servlet后台交互
			var uploader = WebUploader.create({
				auto:true,
				compress:null,
				swf:basePath+'/WebUploader/JavsScript/Uploader.swf',
				server:'/LyUIApi/FileUpload?FilePath='+FilePath,
				pick:'#picker',
				resize:false
			});
			uploader.on("fileQueued",function(file){
				var bgImgName = file.name.substring(file.name.lastIndexOf(".")+1).toUpperCase();
				var bgImgPath = "";
				//根据文件的后缀名，显示不同的图片
				if(bgImgName=="XLS" || bgImgName=="ET"){//表格
					bgImgPath = "/LyUIApi/WebUploader/images/excel.png";
				}else if(bgImgName=="DOC" || bgImgName=="WPS" || bgImgName=="RTF"){//文档
					bgImgPath = "/LyUIApi/WebUploader/images/Word.png";
				}else if(bgImgName=="PPT" || bgImgName=="DPS"){//幻灯片
					bgImgPath = "/LyUIApi/WebUploader/images/powerpoint.png";
				}else if(bgImgName=="TXT"){//txt文件
					bgImgPath = "/LyUIApi/WebUploader/images/TXT.png";
				}else if(bgImgName=="PNG" || bgImgName=="PSD" || bgImgName=="PGN" || bgImgName=="BMP" || bgImgName=="GIF" || bgImgName=="JPG"){//图片
					bgImgPath = "/LyUIApi/WebUploader/images/photo.png";
				}else if(bgImgName=="RAR" || bgImgName=="ZIP"){//压缩包
					bgImgPath = "/LyUIApi/WebUploader/images/rar.png";
				}else if(bgImgName=="PDF"){//PDF文件
					bgImgPath = "/LyUIApi/WebUploader/images/PDF.png";
				}else{//其他
					bgImgPath = "/LyUIApi/WebUploader/images/otherFileName.png";
				}
				//显示加载的文件
				$("#fileList").append("<div id='"+file.id+"'><img src='"+bgImgPath+"'/><span>"+file.name+"</span><div>" +
						"<div style='width:200px;height:10px;'>" +
						"<div id='percentage-bg'>" +
						"<div id='JDT"+file.id+"' style='width:0%;height:10px;border-radius:5px'></div></div>" +
						"</div><span class='percentage'></span></div></div>");
				$("#JDT"+file.id).css("background-image","url('/LyUIApi/WebUploader/images/progressBar_3_green.png')");
				var bool = webup.DtermineFileSize(file.size);
				if(bool){
					FileInfo += file.name+"="+file.size+"|";
				}
			});
			//所有文件上传完成
			uploader.on("uploadFinished",function(){
				$("#getSure").each(function(i,n){n.disabled = false;}); 
			});
//			//上传进度条显示
			uploader.on("uploadProgress",function(file,percentage){
				var bool = webup.DtermineFileSize(file.size);
				if(bool){
					$("#"+file.id).find("span.percentage").text(Math.round(percentage*100)+"%");
					$("#JDT"+file.id).css("width",Math.round(percentage*100)+"%");
				}else{//超出限制大小文件，默认100MB
					$("#"+file.id).find("span.percentage").text("0%  文件超出设置大小,不能上传！");
					$("#"+file.id).find("span.percentage").css("color","red")
				}
			});
			
		},
		//判定文件大小，确定是否上传
		DtermineFileSize : function(fileSize){
			var bool = fileSize<=(CWJDX*1024*1024);
			return bool;
		},
		Sure:function(){//确认上传，返回文件名及文件大小
			window.returnValue = FileInfo;
			window.close();
		}
}
	
