/**
 * @author 黄攀
 * @date 2019-05-25
 */
package SystemMaintenance;


import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;


public class Group_User extends Busy{
	/**
	 * 获取操作员组信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String QryGroupData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String group_info = Aele.attributeValue("group_info");
		String where =" WHERE 1=1";
		if(!"".equals(group_info)){
			where += " AND (VascNum like '%"+group_info+"%' OR VascName like '%"+group_info+"%')";
		}
		
		Document doc = null;
		String SQL = "SELECT VascNum,VascName FROM BASEMENT..TBGROUP WITH(NOLOCK) "+ where +" ORDER BY VascNum";
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
	/**
	 * 获取操作员信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String QryAdminData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String VascNum = Aele.attributeValue("VascNum");
		String admin_info = Aele.attributeValue("admin_info");
		String where =" WHERE 1=1";
		where += " AND VascNum = '"+VascNum+"'";
		if(!"".equals(admin_info)){
			where += " AND (VJOBNUM like '%"+admin_info+"%' "
					+ " OR VNAME like '%"+admin_info+"%' "
					+ " OR VUSER like '%"+admin_info+"%')";
		}
		Document doc = null;
		String SQL = "SELECT VJOBNUM,VUSER,VPSWD,VNAME,VascNum,VascName,VascCpyNum,VascCpyName,VLEVEL,VBZ "
				+ " FROM BASEMENT..TBUSER WITH(NOLOCK)" + where;
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
	/**
	 * 删除管理员组信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String DeleteGroupData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String VascNum = Aele.attributeValue("VascNum");
		Document doc = null;
	    String SQL = "";
	    try {
	    	SQL += "DELETE BASEMENT..TBGROUP WHERE VascNum='"+VascNum+"'";
	    	doc = ServireSQL(BaseServire.SysModify, SQL, null, inopr);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	    return doc.asXML();
	}
	/**
	 * 删除管理员信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String DeleteAdminData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String VJOBNUM = Aele.attributeValue("VJOBNUM");
		String VascNum = Aele.attributeValue("VascNum");
		Document doc = null;
	    String SQL = "";
	    try {
	    	SQL += "DELETE BASEMENT..TBUSER WHERE VJOBNUM='"+VJOBNUM+"' AND VascNum='"+VascNum+"'";
	    	doc = ServireSQL(BaseServire.SysModify, SQL, null, inopr);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	    return doc.asXML();
	}
	/**
	 * 保存管理员组信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String SaveGroupData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String status = Aele.attributeValue("status");
		String VascNum = Aele.attributeValue("VascNum");
		String VascName = Aele.attributeValue("VascName");
		ArrayList<String> list = new ArrayList<String>();
		list.add(VascName);
		list.add(VascNum);
		Document doc = null;
	    String SQL = "";
	    try {
	    	if("1".equals(status)){ //新增
	    		SQL += "INSERT INTO BASEMENT..TBGROUP(VascName,VascNum)"
	    				+ "VALUES(?,?)";
	    	}else if("2".equals(status)){ //修改
	    		SQL += "UPDATE BASEMENT..TBGROUP SET VascName=? WHERE VascNum=?";
	    	}
	    	doc = ServireSQL(BaseServire.SysModify, SQL, list, inopr);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	    return doc.asXML();
	}
	/**
	 * 保存管理员信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String SaveAdminData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String status = Aele.attributeValue("status");
		String VJOBNUM = Aele.attributeValue("VJOBNUM");
		String VNAME = Aele.attributeValue("VNAME");
		String VascNum = Aele.attributeValue("VascNum");
		String VascName = Aele.attributeValue("VascName");
		String VUSER = Aele.attributeValue("VUSER");
		String VPSWD = Aele.attributeValue("VPSWD");
		Document doc = null;
	    String SQL = "";
	    try {
	    	if("1".equals(status)){ //新增
	    		SQL += "INSERT INTO BASEMENT..TBUSER(VNAME,VascName,VUSER,VPSWD,VJOBNUM,VascNum)"
	    				+ "VALUES('"+VNAME+"','"+VascName+"','"+VUSER+"','"+VPSWD+"','"+VJOBNUM+"','"+VascNum+"')";
	    	}else if("2".equals(status)){ //修改
	    		SQL += " UPDATE BASEMENT..TBUSER SET VNAME='"+VNAME+"',VascName='"+VascName+"',VUSER='"+VUSER+"'"
	    				+ ",VPSWD='"+VPSWD+"',VascNum='"+VascNum+"' WHERE VJOBNUM='"+VJOBNUM+"'";
	    	}
	    	doc = ServireSQL(BaseServire.SysModify, SQL, null, inopr);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	    return doc.asXML();
	}
}
