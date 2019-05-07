//数组或者XML的GRID
includecss("resource/default/css/TbTreeHeadBTGrid.css");
/**
 * 基与BootStrap属性的GRID
 * 此GRID不带任何编辑功能
 * 实现的属性有 columns ：
 *  name : 显示的列名，不是数据的字段名
 *  fieldname : 数据字段名
 *  type : text|checkbox|readio|money 默认是text
 *  align : 对齐方式，固定列默认居中，数据列默认居左
 *  IdfCol : 序号列,又称标识列，为了兼容以前版本
 *  format : 格式化方法，对于编辑Grid无效
 *  valign : 垂直方向的对齐方式
 *  例如：{name:"",fixed:true }
 *  设置参数：options
 *  dataType : 值类型 json|xml 默认不设置时为xml
 *  enabled : 是否可用
 *  bindGrid : 高级应用方法，重写GRID时用些方法可以调用其它继承类的方法
 *  setFocus : 过滤的时候是否自动聚焦 true|false 默认不处理 false
 *  isSelect : 是否支持默认选中，true|flase 默认true
 *  aceOverFlow : 是否启用ace模版滑动
 */
var TbTreeHeadBTGrid = Class.create();
TbTreeHeadBTGrid.prototype = Object.extend(new TBase(),{
	ThisGrid : [],
	dataType : undefined, //值类型
	sortable : undefined, //是否可单击标题排序
	initialize : function(id,columns,options){
		if(arguments.length == 3)
			this.createGrid(id,columns,options);
	},
	createGrid : function(id,columns,options){
		
		this.dataType = options.dataType == null ? "xml" : options.dataType;
		this.enabled = options.enabled == null ? true : options.enabled;
		this.bindGrid = options.bindGrid == null ? "TbTreeHeadBTGrid" : options.bindGrid;
		this.setFocus = options.setFocus == null ? false : options.setFocus;
		this.rowStyle = options.rowStyle == null ? "row_Table" : options.rowStyle;
		this.isSelect = options.isSelect == null ? true : options.isSelect;
		this.deccHeight = options.deccHeight;
		this.treeHead = options.treeHead == null ? false : options.treeHead;
		this.nlength = options.nlength == null ? 16 : options.nlength;
		this.minColWith = options.minColWith == null ? 70 : options.minColWith;
		this.isIE = navigator.userAgent.indexOf('MSIE 7.0') > -1?true:false;
		this.choiceRow = []; //选择的行
		this.result = []; //数据集合
		this.cellObj = []; //单元格对象
		this.Aresult = null;
		this.element = $("#"+id).empty();
		this.height = this.element.height() <= 0?parseInt(this.element[0].style["height"]):this.element.height();
		this.width = this.element.width() <= 0 ?parseInt(this.element[0].style["width"]):this.element.width();
		this.rowHeight = options.rowHeight == null ? 22 : options.rowHeight;
		this.headerHeight = options.headerHeight == null ? 23 : options.headerHeight;
		this.aceOverFlow = options.aceOverFlow == null ? false:true;
		if(this.deccHeight != null)
			this.height = this.height - this.deccHeight - 6;
		this.FixedWidth = 17;
		this.eleId = id;
		this.columns = columns;
		this.createDiv();
		this.addSpaceRow();
		TbTreeHeadBTGrid.prototype.ThisGrid[id] = this;
		//设置自动改变大小
//		this.element.css("overflow","hidden");
//		this.element.resize(function(){TbTreeHeadBTGrid.prototype.ThisGrid[id].autoResize()});
	},
	autoResize : function(){
//		if(!this.autoBool){
//			this.autoBool = true;
//			var Athis = this;
//			setTimeout(function(){Athis.set()}, 800);
//		}
	},
	set : function(){
		var height = this.element.height(),width = this.element.width();
		this.autoBool  = false;
		if(this.deccHeight != null)
			height = height - this.deccHeight - 6;
		this.$inDiv.width(width).height(height);
		this.resultDiv.height(height - this.headerHeight).width(width);
		this.headDiv.width(width);
		this.autoBool  = false;
	},
	setGrid : function(json){
		this.width = json.width==null?this.width:json.width;
		this.height = json.height==null?this.height:json.height;
		this.element.width(this.width).height(this.height);
		this.$inDiv.width(this.width).height(this.height);
		this.resultDiv.height(this.height - this.headerHeight).width(this.width);
		this.headDiv.width(this.width);
	},
	autoSet : function() { // 自动设置其高度和宽度
		
	},
	createColumnHeaders : function(){
		var rowHtml = new StringBuffer();
		var countWidth = 0;
		rowHtml.append("<table cellpadding=0 cellspacing=0 border=0 height='" + this.headerHeight + "px' class='bs_Table'><tr>");
		this.resultTable = "<COLGROUP>";
		for(var i = 0;i < this.columns.length;i += 1){
			var column = this.columns[i];
			var colWidth = (column.width == null?50:parseInt(column.width)) + 20;
			if (column.status) {
				rowHtml.append("<th class='table_head' onclick='TbTreeHeadBTGridEvent.clickSortTh(this,\""+this.eleId+"\")' ><div class='container-fuild' align='center' id='span'"+i+" for='td"+i+"' style='width:" + colWidth + "px;cursor:pointer;' " +
						"onclick='TbTreeHeadBTGridEvent.changeOrder(this,"+i+","+column.status+",\""+this.eleId+"\")'>" 
						+ column.name+"&nbsp<span class='ace-icon fa fa-sort "+this.eleId+"_grid-sort'></span></div></th>");			
			}else{
				rowHtml.append("<th class='table_head'><div class='container-fuild' align='center' style='width:" + colWidth + "px'>" + column.name+"</div></th>");
			};
			this.resultTable += "<COL style='width:" + colWidth + "px'/>";
			countWidth += (this.isIE?colWidth:colWidth + 1); 
		}
		this.countWidth = countWidth;
		this.resultTable += "</COLGROUP>";
		rowHtml.append("</tr></table>");
		this.resultTable = "<div style='width:" + (countWidth  ) + "px;margin-top:1px;'><table id='" + this.eleId + "_datas' cellpadding=0 cellspacing=0 border=0 class='table table-hover " + this.rowStyle + "' style='margin-left:-1px;'>" + this.resultTable;
		//this.headDiv.html("<div style='width:" + (countWidth+17) + "px;height:" + this.headerHeight + "px'><table cellpadding=0 cellspacing=0 border=0><tr><td >" + rowHtml.toString() + "</td>"+(this.width - countWidth<17?"<td width='17px;'>&nbsp;</td>":"")+"</tr></table></div>");
		this.headDiv.html("<div style='width:" + (countWidth) + "px;height:" + this.headerHeight + "px'><table cellpadding=0 cellspacing=0 border=0><tr><td >" + rowHtml.toString() + "</td></tr></table></div>");
	},
	createColumnMoreHeaders : function(){
		/**自适应参数设置**/
		var nlength = this.nlength;	//内容长度系数
		var minColWith = this.minColWith;	//单元格最小宽度
		//表头
		var treeHead = this.treeHead;
		var rowHtml = new StringBuffer();
		var countWidth = 0;
		rowHtml.append("<table cellpadding=0 cellspacing=0 border=0 height='" + (this.headerHeight*treeHead.length) + "px' class='table table-condensed' style='margin-left:-1px;'>");
		/*this.resultTable = "<COLGROUP>";*/
		for (var k = 0; k < treeHead.length; k++) {
			var trColumns = treeHead[k];
			rowHtml.append("<tr>");
			for(var i = 0;i < trColumns.length;i += 1){
				var column = trColumns[i];
				var colWidth = column.name.length*nlength<minColWith ? minColWith : column.name.length*nlength;
				colWidth = (column.width == null?colWidth:parseInt(column.width)) + 20;
				var head_th_width = colWidth-10;
				var rowspan = column.rowspan == null ? "" : " rowspan=\""+column.rowspan +"\" ";
				var colspan = column.colspan == null ? "" : " colspan=\""+column.colspan +"\" ";
				if (column.isParent) {
					rowHtml.append("<th "+rowspan+colspan+" class='table_head'><div class='container-fuild' align='center' style='width:100%;'>" + column.name+"</div></th>");
				}else
				if (column.status) {
					rowHtml.append("<th "+rowspan+colspan+" class='table_head' onclick='TbTreeHeadBTGridEvent.clickSortTh(this,\""+this.eleId+"\")' >" +
							"<div class='container-fuild' align='center' id='span"+i+"' for='td"+i+"' style='width:" + head_th_width + "px;cursor:pointer;' " +
							"onclick='TbTreeHeadBTGridEvent.changeOrder(this,"+i+","+column.status+",\""+this.eleId+"\")' fieldname='"+column.fieldname+"'>" 
							+ column.name+"&nbsp<span class='ace-icon fa fa-sort "+this.eleId+"_grid-sort'></span></div></th>");
				}else{
					rowHtml.append("<th "+rowspan+colspan+" class='table_head'><div class='container-fuild' align='center' style='width:" + head_th_width + "px'>" + column.name+"</div></th>");
				};
				/*if (!column.isParent) {
					this.resultTable += "<COL style='width:" + colWidth + "px'/>";
				}
				countWidth += (this.isIE?colWidth:colWidth + 1); */
			}
			rowHtml.append("</tr>");
		}
		
		//显示内容宽度
		this.resultTable = "<COLGROUP>";
		for(var i = 0;i < this.columns.length;i += 1){
			var column = this.columns[i];
			var colWidth = column.name.length*nlength<minColWith ? minColWith : column.name.length*nlength;
			colWidth = (column.width == null?colWidth:parseInt(column.width)) + 20;
			this.resultTable += "<COL style='width:" + colWidth + "px'/>";
			countWidth += (this.isIE?colWidth:colWidth + 1); 
		}
		
		this.countWidth = countWidth;
		this.resultTable += "</COLGROUP>";
		rowHtml.append("</table>");
		this.resultTable = "<div style='width:" + (countWidth  ) + "px;margin-top:1px;'><table id='" + this.eleId + "_datas' cellpadding=0 cellspacing=0 border=0 class='table table-hover " + this.rowStyle + "' style='margin-left:-1px;'>" + this.resultTable;
		this.headDiv.html("<div style='width:" + (countWidth) + "px;height:" + (this.headerHeight*treeHead.length) + "px'>" + rowHtml.toString() + "</div>");
		
	},
	createDiv : function(){
		this.$inDiv = $("<div class='Tbgrid col-xs-12'/>").height(this.height).appendTo(this.element);
		var row = $("<div/>").attr('class','row').css({'border':'1px solid #ddd'}).appendTo(this.$inDiv);
		this.headDiv = $("<div class='tbgrid_head_bg col-xs-12'/>").css({"overflow":"hidden",'padding':'0px'}).appendTo(row);
		this.resultDiv = $("<div class='tbgrid_body_bg col-xs-12'/>").appendTo(row);
		//创建head
		if(this.treeHead){
			this.resultDiv.height(this.height - (this.headerHeight*this.treeHead.length)).css({'overflow':'auto','padding':'0px'});
			this.createColumnMoreHeaders();
		}else{
			this.resultDiv.height(this.height - this.headerHeight).css({'overflow':'auto','padding':'0px'});
			this.createColumnHeaders(); 
		}
		var _this = this;
		this.resultDiv.scroll(function(){
			var maxWidth = _this.countWidth-_this.headDiv.width();
			var scrollLeft = _this.resultDiv.scrollLeft();
			_this.headDiv.scrollLeft(scrollLeft);
			if(scrollLeft>maxWidth){
				_this.resultDiv.scrollLeft(maxWidth);
			}
		});
//		this.resultDiv.keydown(function(){return false;});
	},
	showResult : function(datas,options) {
		var align,dataValue,valign;
		if(this.dataType == "xml" && datas.length == null){ //判断类型
			if(datas.documentElement != null){
				datas = datas.documentElement;
			}
			this.Aresult = datas.selectSingleNode(options.nodename == null ? "Rows" : options.nodename); 
			datas = this.Aresult.childNodes;
		}
		this.result = datas;
		if (this.result.length != 0){
			var data = new StringBuffer();
			data.append(this.resultTable);
			
			data.append("<thead hidden><tr id='"+this.eleId+"_space_-1'>");
			for(var i = 0;i < this.columns.length;i += 1){
				var column = this.columns[i];
				data.append("<td id='td"+i+"'>"+i+"</td>");
			}
			data.append("</tr></thead><tbody>");
			
			for (var i = 0; i < this.result.length; i += 1){			
				data.append("<tr Ix='"+i+"' tabindex='0' grid='"+this.eleId+"' onmousedown='" + this.bindGrid + ".prototype.dRowClick(this,event)' onkeydown='" + this.bindGrid + ".prototype.dRowKeyDown(this,event)'>");
				for ( var j = 0; j < this.columns.length; j += 1){
					var column = this.columns[j];
					valign = column.valign == null ?"middle":column.valign;
					if(column.IdfCol){ //如果是标识列不用数据。
						dataValue = i+1;
						align = column.align == null ?"center":column.align;
					}else{
						if(column.fieldname != null){
							dataValue = this.dataType == "xml"?datas[i].getAttribute(column.fieldname):datas[i][column.fieldname];
						}else{
							dataValue='';
						}
						dataValue = column.format?column.format(dataValue,i,j):dataValue;
						if(column.type == "checkbox") { //复选框
							if(column.fieldname == null && column.checked){
								dataValue == "1";
							}
							align = column.align == null ?"center":column.align;
							dataValue = "<input type='checkbox' "+(dataValue == "1" || dataValue == true?"checked":"")+" />";
						}else if(column.type == "money"){
							dataValue = parseFloat(dataValue);
							dataValue = isNaN(dataValue)?"":"￥"+dataValue.toFixed(2);
							
							align = column.align == null ?"right":column.align;
						}else{
							align = column.align == null ?"left":column.align;
						}
					} 
					data.append("<td style='border:1px solid #ddd' align='" + align + "' valign='" + valign + "'>" + (dataValue==null?"":dataValue) + "</td>");
				}				
				data.append("</tr>");
			}
			data.append("</tbody></table></div>");
			this.resultDiv.html(data.toString());		
			$("#"+this.eleId + "_datas").tablesorter();
			
		} else {
			this.addSpaceRow();			
		}
		if(this.isSelect)
			this.setRowSelect();
		this.cellObj = [];
	},
	addRow : function(data,Aclone){ //增加一行
		if(this.isSpaceRow())
			this.deleteSpaceRow();
		var datas = $("#" + this.eleId + "_datas")[0],$row,dataValue;
		if(data == null){
			$row = $(datas.insertRow()).attr("id",this.eleId+"_space_-1");
			$row.append("<th/>");
			for ( var i = 0; i < this.columns.length; i += 1){
				var column = this.columns[i];
				$row.append("<td>" + (column.type == "checkbox"?"<input type='checkbox' />":"&nbsp;") + "</td>").height(this.rowHeight).attr("align",(column.align == null ?"left":column.align));
			}
		}else{
			var rowInde = this.rowCount() == 0?0:this.rowCount();
			$row = $(datas.insertRow()).height(this.rowHeight)
					.attr({Ix:rowInde,tabindex:0,grid:this.eleId});
			$row.mousedown(function(event){TbTreeHeadBTGrid.prototype.dRowClick($row[0],event)});
			$row.keydown(function(event){TbStringGrid.prototype.dRowKeyDown($row[0],event)});
			$row.append("<th/>");
			for ( var i = 0; i < this.columns.length; i += 1){
				var column = this.columns[i];
				if(column.IdfCol){ //如果是标识列不用数据。
					dataValue = this.rowCount();
					align = column.align == null ?"center":column.align;
				}else{
					if(column.fieldname != null)
						dataValue = this.dataType == "xml"?data.getAttribute(column.fieldname):data[column.fieldname];
					else
						dataValue = "";
					if(column.type == "checkbox"){
						if(column.fieldname == null && column.checked)
							dataValue = "1";
						align = column.align == null ?"center":column.align;
						dataValue = "<input type='checkbox' "+(dataValue == "1"?"checked":"")+" />";
					}else if(column.type == "money"){
						dataValue = parseFloat(dataValue);
						dataValue = isNaN(dataValue)?"":"￥"+dataValue.toFixed(2);
						align = column.align == null ?"right":column.align;
					}else{
						align = column.align == null ?"left":column.align;
					}
				} 
				$row.append("<td align='" + align + "'><div style='padding-left:2'>"+dataValue+"</div></td>");
			}
			//添加数据
			if(this.dataType == "xml"){
				if(this.Aresult == null){
					this.Aresult = this.LoadXML("<xml><Fieldsvalue></Fieldsvalue></xml>").documentElement.selectSingleNode("Fieldsvalue"); 
					this.result = this.Aresult.childNodes;
				}
				this.Aresult.appendChild(data.cloneNode(Aclone == null?false:Aclone));
//				this.result.push(data.cloneNode(Aclone == null?false:Aclone));
			}else{
				if(this.result == null)
					this.result = [];
				this.result.add(data);
			}
		}
		this.resultDiv.scrollTop(this.resultDiv[0].scrollHeight);
	},
	addSpaceRow : function(){
		var data = "<tr id='"+this.eleId+"_space_-1'>";
		for(var i = 0;i < this.columns.length;i += 1){
			var column = this.columns[i];
			data += "<td class='space_row'>&nbsp;</td>";
		}
		data += "</tr>";		
		this.resultDiv.html(this.resultTable + data + "</table></div>");
	},
	deleteSpaceRow : function(){
		$("#"+this.eleId+"_space_-1").remove();
	},
	isSpaceRow : function(){ //查看是否有空白行
		var rowFixedHeader = $("#"+this.eleId+"_space_-1");
		if(rowFixedHeader.length > 0)
			return true;
		else
			return false;
	},
	rowCount : function(){
		var rows = this.rows();
		var rowcount = rows.length;
		if(rowcount == 1){
			if($(rows[0]).attr("Ix") == null ){
				return 0;
			}else
				return 1;
		}else
			return rowcount;
	},
	colCount : function(){
		return this.columns.length;
	},
	rowIndex : function(){ //当前行iNDEX,当行支持多选时此方法无效,如果没有行选中，则显示-1
		if(this.choiceRow[0] == null)
			return -1;
		else {
			var ch = this.rows();
			for(p in ch){
				if(ch[p] == this.choiceRow[0])
					//return parseInt(p);
					return $(this.choiceRow[0]).attr('Ix');
			}
			this.choiceRow[0] = null;
			return -1;
		}
	},
	rows : function(row){
		if(row == null){
			return $("#" + this.eleId + "_datas")[0].rows;
		}else{
			return $("#" + this.eleId + "_datas")[0].rows[row];
		}
	},
	cell : function(row,col){ //获得指定单元格对象
		if(this.cellObj[row] == null){
			this.cellObj[row] = [];
		}
		if(this.cellObj[row][col] == null){
			this.cellObj[row][col] = new TbTreeHeadBTGridCell(this.rows(row).childNodes[col],this,col);
		}
		return this.cellObj[row][col];
	},
	setEnabled : function(inTag){ //如果有行选，则保持行选
		this.enabled = inTag;
	},
	deleteAll : function(){ //删除所有
		this.addSpaceRow();
		this.result = [];
		this.choiceRow = [];
	},
	deleteRow : function(rowIndex){ //删除指定行
		var deleRow = this.rows()[rowIndex];
		if(deleRow == this.choiceRow[0]){
			this.choiceRow = [];
		}
		$(deleRow).remove();
		if(this.dataType == "json"){
			this.result.remove(rowIndex);
		}else if(this.Aresult != null){
			this.Aresult.removeChild(this.result[rowIndex]);
		}
		if(this.rowCount() == 0){
			this.addSpaceRow();
		}
	},
	dRowKeyDown : function(rowEle,aEvent){ //键盘事件
		var inRow;
		switch (aEvent.keyCode) {
		case 38:
			TbTreeHeadBTGridringGridEvent.isDisplay($(rowEle),"prev");
			if(inRow == null || inRow.attr("Ix") == null)
				return;
			break;
		case 40:
			inRow = TbTreeHeadBTGridEvent.isDisplay($(rowEle),"next");
			if(inRow == null || inRow.attr("Ix") == null)
				return;
			break;	
		default:
			var _this = TbTreeHeadBTGrid.prototype.ThisGrid[rowEle.getAttribute("grid")];
			if(_this.onkeydown != null){
				_this.onkeydown(aEvent);
			}
			break;
		}
		if(inRow != null){
			this.dRowClick(inRow[0],aEvent);
			inRow.focus();
		}
	},
	dRowClick : function(rowEle,aEvent){ //行单击事件
		var _this = TbTreeHeadBTGrid.prototype.ThisGrid[rowEle.getAttribute("grid")];
		if(_this.enabled){
			if(_this.choiceRow[0] != rowEle){ //设置行选
				TbTreeHeadBTGridEvent.setRowColor(rowEle.childNodes,true); 
				if(_this.choiceRow[0] != null)
					TbTreeHeadBTGridEvent.setRowColor(_this.choiceRow[0].childNodes,false);
			}
			_this.choiceRow[0] = rowEle;
			//获取列属性
			
			TbTreeHeadBTGridEvent.bindAffair($(rowEle), _this, true, aEvent);
		}else{ //清空事件
			TbTreeHeadBTGridEvent.bindAffair($(rowEle), _this, false, aEvent);
		}
	},
	setRowSelect : function(InrowIndex){ //设置默认选中的行
		var rowIndex = (InrowIndex == null || InrowIndex == -2)?0:InrowIndex;
		var curRow = $(this.rows()[rowIndex]);
		curRow = curRow.css("display") == "none"?TbTreeHeadBTGridEvent.isDisplay(curRow,"next"):curRow;
		if(curRow.attr("Ix") != null ){
			if(this.choiceRow[0] != curRow[0]){
				TbTreeHeadBTGridEvent.setRowColor(curRow[0].childNodes,true);
				if(this.choiceRow[0] != null)
					TbTreeHeadBTGridEvent.setRowColor(this.choiceRow[0].childNodes,false);
			}
			this.choiceRow[0] = curRow[0];
			if(InrowIndex != -2){
				curRow.focus();
			}else
				this.resultDiv.scrollTop(0);
		}
	},
	filter : function(Fields,AValue,aEvent){ //如果传入的为*，首先判断filter，只要有一个为true，就按照设置的走，否则按全部走		
		if((aEvent.keyCode == 32 || aEvent.keyCode == 0 || aEvent.keyCode==8 || aEvent.keyCode > 47) && this.result != null && this.result.length > 0 && Fields != ""){
			var fieldSet,rowCnt = 0,dataRow = null;
			AValue = AValue.toUpperCase();
			if(Fields != "*"){
				fieldSet = Fields.split("|"); 
			}
			var datachilds = this.rows(); 
			for(var i=0;i<this.result.length;i+=1){
				var Cvalue = "";
				if(Fields == "*"){
					for(var j=0;j<this.columns.length;j+=1){
						if(!this.columns[j].IdfCol){
							Cvalue += "|" + (this.dataType=="xml"?this.result[i].getAttribute(this.columns[j].fieldname):this.result[i][this.columns[j].fieldname]);
						}
					}
				}else{
					for(var j=0;j<fieldSet.length;j+=1){
						Cvalue += "|" + (this.dataType=="xml"?this.result[i].getAttribute(fieldSet[j]):this.result[i][fieldSet[j]]);
					}
				}
				Cvalue = Cvalue.toUpperCase();
				if(Cvalue.indexOf(AValue) == -1){
					rowCnt += 1;
					$(datachilds[i]).hide();
				}else{
					if(dataRow == null)
						dataRow = datachilds[i];
					$(datachilds[i]).show();
				}
			}
			if(rowCnt >= this.result.length){
				if(!this.isSpaceRow()){
					this.addRow(null);
				}
			}else{
				if(this.isSpaceRow())
					this.deleteSpaceRow();
			}
			if(this.setFocus)
				this.setRowSelect(-2);
		}
	},
	keyDown : function(Fields,aEvent){ //StringGrid 接收外部的keydown事件
		switch (aEvent.keyCode) {
		case 40: //down
			if(this.choiceRow[0] == null ){ //如果当前没有选中行，则选中第一行
				this.choiceRow[0] = this.rows()[0];
				TbTreeHeadBTGridEvent.setRowColor(this.choiceRow[0].childNodes,true);
			}else{
				var inRow = TbTreeHeadBTGridEvent.isDisplay($(this.choiceRow[0]),"next");
				if(inRow != null && inRow.attr("Ix") != null){
					TbTreeHeadBTGridEvent.setRowColor(this.choiceRow[0].childNodes,false);
					TbTreeHeadBTGridEvent.setRowColor(inRow.children(),true);
					this.choiceRow[0] = inRow[0];
				}else
					return;
				TbTreeHeadBTGridEvent.setScrollTop(this,"down",inRow);
			}
			break;
		case 38: //up
			if(this.choiceRow[0] != null ){ //如果当前没有选中行，则选中第一行
				var inRow = TbTreeHeadBTGridEvent.isDisplay($(this.choiceRow[0]),"prev");
				if(inRow != null && inRow.attr("Ix") != null){
					TbTreeHeadBTGridEvent.setRowColor(this.choiceRow[0].childNodes,false);
					TbTreeHeadBTGridEvent.setRowColor(inRow.children(),true);
					this.choiceRow[0] = inRow[0];
				}else
					return;
				TbTreeHeadBTGridEvent.setScrollTop(this,"up",inRow);
			}
			break;
		case 13 : //回车选中值
			
			break;
		default:
			var $Input = $(aEvent.srcElement || aEvent.target);
			//添加过滤使用的事件
			var evtents =$Input.data("events") || $._data($Input[0],"events"); 
			if(evtents == null || evtents["keyup"] == null){
				var _this = this;
				$Input.keyup(function(event){
					var self = event.srcElement || event.target;
					_this.filter(Fields, self.value, event)
				});
			}
			break;
		}
	},
	/**
	 * 导出数据到Excel
	 */
	doExport : function(Itype){
		Itype = Itype == null?0:Itype;
		if(Itype == 0){
			var oXL = new ActiveXObject("Excel.Application"); 
			var oWB = oXL.Workbooks.Add(); 
			var oSheet = oWB.ActiveSheet;
			for(var i = 0;i < this.columns.length; i += 1){
				var name = this.columns[i].name;
				oSheet.Cells(1, i + 1).value = (name == "&nbsp;") ? "" : name;
			}
			for(var i = 0;i < this.result.length;i += 1){
				for(var j=0;j<this.columns.length;j+=1){
					oSheet.Cells(i + 2, j+1).value = this.result[i].getAttribute(this.columns[j].fieldname);
				}
			}
			oXL.Visible = true; 
		}
	}
});
var TbTreeHeadBTGridEvent = {		
	isDisplay : function(obj,inTag){ //判断是否隐藏
		var temObj = obj;
		if(inTag == "prev"){
			while((obj = obj.prev()).length > 0 )
				if(obj.css("display") != "none")break;
		}else if(inTag == "next"){
			while((obj = obj.next()).length > 0 )
				if(obj.css("display") != "none")break;
		}
		return (obj==null?temObj:obj);
	},
	setRowColor : function(inRowObj,tag){ //设置行单击背景颜色
		for(var i = 0;i<inRowObj.length;i+=1){
			if(inRowObj[i].tagName == "TD")
//				inRowObj[i].style["background"] = tag?"rgb(177,216,241)":""; //#B8CFEE,#c4d5ee
//				inRowObj[i].style["background"] = tag?"#c1ffc1":"";//暖绿色
//				inRowObj[i].style["background"] = tag?"#ffbbff":"";//暖紫色
				/*inRowObj[i].style["background"] = tag?"#c1cdc1":"";*/
				inRowObj[i].style["background"] = tag?"rgb(220, 248, 168)":""; //#B8CFEE,#c4d5ee
		}
	},
	setScrollTop : function(gridThis,inTag,$inEvt){
		var top = $inEvt[0].offsetTop; 
		if(inTag == "up"){
			var spaceTop = top - gridThis.resultDiv.scrollTop(); //间隔的宽度
			if(spaceTop < 0 ){
				gridThis.resultDiv.scrollTop(gridThis.resultDiv.scrollTop() - gridThis.rowHeight);
			}
		}else if(inTag == "down"){
			var height = gridThis.height - gridThis.rowHeight * 2;
			var spaceTop = top - gridThis.resultDiv.scrollTop(); //间隔的宽度
			if(spaceTop >= height ){
				gridThis.resultDiv.scrollTop(gridThis.resultDiv.scrollTop() + gridThis.rowHeight);
			}
		}
	},
	clickSortTh : function(_this,eleId){
		var Clike = $('#'+eleId).find('.BTGrid_th_Clike');
		if(Clike.length>0){
			Clike.removeClass('BTGrid_th_Clike');
		}
		$(_this).addClass('BTGrid_th_Clike');
	},
	changeOrder : function(_this,i,status,eleId){
		var gridThis = TbTreeHeadBTGrid.prototype.ThisGrid[eleId];
		if(gridThis.treeHead){
			var columns = gridThis.columns;
			for(var j = 0;j < columns.length;j += 1){
				if(columns[j].fieldname == $(_this)[0].getAttribute("fieldname")){
					i = j;
					break;
				}
			}
		}
		//ace-icon fa fa-chevron-up
		if (status) {			
			var curr=$(_this).attr('for');
			if (!curr) {
				curr=0;
			}
			var spand = $(_this).children('span');
			if (curr==1) {
				var sorting = [[i,curr]];
				if(spand.hasClass('fa-sort')){
					var old = $('.'+eleId+'_grid-sort.fa-sort-up');
					if(old.length==0){
						old = $('.'+eleId+'_grid-sort.fa-sort-desc');
						if(old.length>0){
							old.removeClass('fa-sort-desc');
						}
					}else{
						old.removeClass('fa-sort-up');
					}
					if(old.length>0){
						old.addClass('fa-sort');
						var oldpar = old.parent();
						oldpar.attr('for',0);
					}
					
					spand.removeClass('fa-sort');
					spand.addClass('fa-sort-desc');
				}else{
					spand.removeClass('fa-sort-up').addClass('fa-sort-desc');
				}
				curr=0;
			}else{
				var sorting = [[i,curr]];
				if(spand.hasClass('fa-sort')){
					var old = $('.'+eleId+'_grid-sort.fa-sort-up');
					if(old.length==0){
						old = $('.'+eleId+'_grid-sort.fa-sort-desc');
						if(old.length>0){
							old.removeClass('fa-sort-desc');
						}
					}else{
						old.removeClass('fa-sort-up');
					}
					if(old.length>0){
						old.addClass('fa-sort');
						var oldpar = old.parent();
						oldpar.attr('for',0);
					}
					
					spand.removeClass('fa-sort');
					spand.addClass('fa-sort-up');
				}else{
					spand.removeClass('fa-sort-desc').addClass('fa-sort-up');
				}
				curr=1;
			}
			$(_this).attr('for',curr);
			$('#'+eleId+'_datas').trigger("sorton",[sorting]);
		}
	},
	bindAffair : function($inRow,gridThis,inTag,aEvent){ //绑定事件
		if(inTag){
			if(gridThis["onclick"] != null ){ //系统使用的单击事件
				var evtents =  $inRow.data("events") || $._data($inRow[0],"events");
				if(evtents == null || evtents["click"] == null)
					$inRow.click(function(aEve){return gridThis["onclick"](gridThis.rowIndex(),aEve)});
			}
			if(gridThis["onkeydown"] != null ){
				var evtents =  $inRow.data("events") || $._data($inRow[0],"events");
				if(evtents == null || evtents["keydown"] == null){
					$inRow.keydown(function(aEve){return gridThis["onkeydown"](gridThis.rowIndex(),aEve)});
				}
			}
			if(gridThis["ondblclick"] != null){ 
				var evtents =  $inRow.data("events") || $._data($inRow[0],"events");
				if(evtents == null || evtents["dblclick"] == null){
					$inRow.dblclick(function(aEve){return gridThis["ondblclick"](gridThis.rowIndex(),aEve)});
				}
			}
			if(gridThis["onmousedown"] != null){
				gridThis["onmousedown"](gridThis.rowIndex(),aEvent);
			}
		}else{
			if(gridThis["ondblclick"] != null){ 
				$inRow.unbind("dblclick");
			}
			if(gridThis["onclick"] != null){ 
				$inRow.unbind("click");
			}
			if(gridThis["onkeydown"] != null){ 
				$inRow.unbind("keydown");
			}
		}
	}
}
var TbTreeHeadBTGridCell = Class.create();
TbTreeHeadBTGridCell.prototype = {
	cell     : null,	
	checked  : null, //对于checkbox有用
	Athis    : null,
	type : null, //列类型
	initialize : function(obj,Athis,col){
		this.cell = obj;
		this.Athis = Athis;
		this.type = Athis.columns[col - 1].type;
	},
	attr : function(){
		if(this.type == "checkbox"){
			var cellCheck = this.cell;
			while(cellCheck.tagName != "INPUT"){
				cellCheck = cellCheck.childNodes[0];
				if(cellCheck == null)break;
			}
			if(arguments.length == 2){
				this[arguments[0]] = arguments[1];
				cellCheck.setAttribute(arguments[0],arguments[1]);
			}else { //判断是不是自定义属性
				return cellCheck.getAttribute(arguments[0]);
			}
		}else{
			if(arguments.length == 2){
				this[arguments[0]] = arguments[1];
				this.cell.setAttribute(arguments[0],arguments[1]);
			}else { //判断是不是自定义属性
				return this.cell.getAttribute(arguments[0]);
			}
		}
	},
	text : function(inParam){ //取cell的值
		if(inParam == null){
			return this.cell.innerText;
		}else
			this.cell.innerHTML = inParam;
	},
	checked : function(check){ //
		if(this.type == "checkbox"){
			var cellCheck = this.cell;
			while(cellCheck.tagName != "INPUT"){
				cellCheck = cellCheck.childNodes[0];
				if(cellCheck == null)break;
			}
			if(arguments.length == 1){
				cellCheck.checked = check;
			}else{
				return cellCheck.checked;
			}
		}else{
			return null;
		}
	}
	
};