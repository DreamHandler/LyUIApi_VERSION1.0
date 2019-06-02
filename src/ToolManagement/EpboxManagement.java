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
		String VBM = Aele.attributeValue("VBM");
		String VMC = Aele.attributeValue("VMC");
		String VDYMC = Aele.attributeValue("VDYMC");
		String VVALUE = Aele.attributeValue("VVALUE");
		String VZWBT = Aele.attributeValue("VZWBT");
		String VZDMC = Aele.attributeValue("VZDMC");
		String VLKD = Aele.attributeValue("VLKD");
		String VBZ = Aele.attributeValue("VBZ");
		String BTATUS = Aele.attributeValue("BTATUS");
		ArrayList<String> list = new ArrayList<String>();
		list.add(VMC);
		list.add(VDYMC);
		list.add(VVALUE);
		list.add(VZWBT);
		list.add(VZDMC);
		list.add(VLKD);
		list.add(VBZ);
		list.add(BTATUS);
		Document doc = null;
	    String SQL = "";
	    try {
	    	if("1".equals(status)){ //新增
	    		String VBM_NEW = VBM; //需修改为流水号功能
	    		list.add(VBM_NEW);
	    		SQL += "INSERT INTO BASEMENT..TBEPBOX(VMC,VDYMC,VVALUE,VZWBT,VZDMC,VLKD,VBZ,BTATUS,VBM)"
	    				+ "VALUES(?,?,?,?,?,?,?,?,?)";
	    	}else if("2".equals(status)){ //修改
	    		list.add(VBM);
	    		SQL += "UPDATE BASEMENT..TBEPBOX SET VMC=?,VDYMC=?,VVALUE=?,VZWBT=?,VZDMC=?,VLKD=?,VBZ=?,BTATUS=? "
	    			 + " WHERE VBM=?";
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
		String VBM = Aele.attributeValue("VBM");
		Document doc = null;
	    String SQL = "";
	    try {
	    	SQL += "DELETE BASEMENT..TBEPBOX WHERE VBM='"+VBM+"'";
	    	doc = ServireSQL(BaseServire.SysModify, SQL, null, inopr);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	    return doc.asXML();
	}
}
