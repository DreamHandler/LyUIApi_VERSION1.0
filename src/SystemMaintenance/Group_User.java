/**
 * @author 黄攀
 * @date 2019-05-15
 */
package SystemMaintenance;


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
}
