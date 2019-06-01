/**
 * @author 黄攀
 * @date 2019-05-15
 */
package SystemMaintenance;


import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;


public class System_Menu extends Busy{
	/**
	 * 获取系统信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String QrySystemData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String system_info = Aele.attributeValue("system_info");
		String where =" WHERE 1=1";
		if(!"".equals(system_info)){
			where += " AND (VSYSNO like '%"+system_info+"%' OR VNAME like '%"+system_info+"%')";
		}
		
		Document doc = null;
		String SQL = "SELECT VSYSNO,VNAME FROM BASEMENT..TBLYSYSINFO WITH(NOLOCK) "+ where +" ORDER BY VSYSNO";
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
	/**
	 * 获取菜单信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String QryMenuData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String VXTBM = Aele.attributeValue("VSYSNO");
		Document doc = null;
		String SQL = "SELECT * FROM BASEMENT..TBMENU WHERE VXTBM='"+VXTBM+"' ORDER BY IZH,IXH";
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
	/**
	 * 保存系统信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String SaveSystemData(Document inEle, Aperator inopr) throws Exception{
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
	 * 删除系统信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String DeleteSystemData(Document inEle, Aperator inopr) throws Exception{
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
	/**
	 * 保存菜单信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String SaveMenuData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String VSYSNO = Aele.attributeValue("VSYSNO");
		String VNAME = Aele.attributeValue("VNAME");
		ArrayList<String> list = new ArrayList<String>();
		list.add(VNAME);
		list.add(VSYSNO);
		Document doc = null;
	    String SQL = "";
	    try {
	    	
	    	doc = ServireSQL(BaseServire.SysModify, SQL, list, inopr);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	    return doc.asXML();
	}
}
