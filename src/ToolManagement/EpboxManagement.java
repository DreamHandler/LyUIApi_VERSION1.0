/**
 * @author 黄攀
 * @date 2019-06-01
 */
package ToolManagement;


import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;


public class EpboxManagement extends Busy{
	/**
	 * 获取ep信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String QryEpboxData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String Epbox_info = Aele.attributeValue("Epbox_info");
		String where =" WHERE 1=1";
		if(!"".equals(Epbox_info)){
			where += " AND (VBM like '%"+Epbox_info+"%' OR VMC like '%"+Epbox_info+"%')";
		}
		
		Document doc = null;
		String SQL = "SELECT VBM,VMC,VDYMC,VVALUE,IXS,VZWBT,VZDMC,VLKD,BTATUS,VBZ "
				+ " FROM BASEMENT..TBEPBOX WITH(NOLOCK) "+ where +" ORDER BY VBM";
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
	/**
	 * 保存ep信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String SaveEpboxData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String status = Aele.attributeValue("status");
		String VSYSNO = Aele.attributeValue("VSYSNO");
		String VNAME = Aele.attributeValue("VNAME");
		ArrayList<String> list = new ArrayList<String>();
		list.add(VNAME);
		list.add(VSYSNO);
		Document doc = null;
	    String SQL = "";
	    try {
	    	if("1".equals(status)){ //新增
	    		SQL += "INSERT INTO BASEMENT..TBLYSYSINFO(VNAME,VSYSNO)"
	    				+ "VALUES(?,?)";
	    	}else if("2".equals(status)){ //修改
	    		SQL += "UPDATE BASEMENT..TBLYSYSINFO SET VNAME=? WHERE VSYSNO=?";
	    	}
	    	doc = ServireSQL(BaseServire.SysModify, SQL, list, inopr);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	    return doc.asXML();
	}
	/**
	 * 删除ep信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String DeleteEpboxData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String VSYSNO = Aele.attributeValue("VSYSNO");
		Document doc = null;
	    String SQL = "";
	    try {
	    	SQL += "DELETE BASEMENT..TBLYSYSINFO WHERE VSYSNO='"+VSYSNO+"'";
	    	doc = ServireSQL(BaseServire.SysModify, SQL, null, inopr);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	    return doc.asXML();
	}
}
