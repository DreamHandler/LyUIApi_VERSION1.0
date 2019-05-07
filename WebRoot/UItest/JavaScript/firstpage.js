var firstpage={
	testUploadFile : function(){
		var URL = "E:/DATATEST/uploadFile";
		var NewUrl = encodeURI(URL);
		var files = window.showModalDialog("/LyUIApi/WebUploader/WebFileUploader.jsp?path="+NewUrl,"文件上传","dialogWidth=500px;dialogHeight=400px;");
		if(files!=undefined){
			
		}
	}
}