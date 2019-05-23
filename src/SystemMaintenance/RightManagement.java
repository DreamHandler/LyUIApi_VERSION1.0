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


public class RightManagement extends Busy{
	/**
	 * 获取操作员组及操作员信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String QryGroupAndUserData(Document inEle, Aperator inopr) throws Exception{
		Document doc = null;
		String SQL = "SELECT ROW_NUMBER() OVER( PARTITION BY A.VascNum ORDER BY A.VascNum) ROWNUMBER,A.VascNum,A.VascName,B.VJOBNUM,B.VUSER,B.VNAME "
				+ "FROM BASEMENT..TBGROUP A WITH(NOLOCK)"
				+ "LEFT JOIN BASEMENT..TBUSER B WITH(NOLOCK) ON A.VascNum=B.VascNum";
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
	/**
	 * 获取系统信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String QrySystemData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String BGROUP = Aele.attributeValue("BGROUP");
		String id = Aele.attributeValue("id");
		String IPARENTID = Aele.attributeValue("IPARENTID");
		Document doc = null;
		String SQL = "";
		ArrayList<String> list = new ArrayList<String>();
		if("1".equals(BGROUP)){
			list.add(id);
			SQL = "SELECT A.*,B.VascNum,B.VCDBM FROM BASEMENT..TBLYSYSINFO A WITH(NOLOCK) LEFT JOIN "
					+ "(SELECT * FROM BASEMENT..TBGROUPQX WITH(NOLOCK) WHERE VascNum = ?) B "
					+ "ON A.VSYSNO=B.VSYSNO";
		} else {
			list.add(IPARENTID);
			list.add(id);
			SQL = "SELECT A.*,B.VascNum,0 BSYZQX,B.VCDBM FROM BASEMENT..TBLYSYSINFO A WITH(NOLOCK) LEFT JOIN "
					+ "(SELECT * FROM BASEMENT..TBUSERQX WITH(NOLOCK) WHERE VascNum = ? AND VJOBNUM=?) B "
					+ "ON A.VSYSNO=B.VSYSNO";
		} 
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,list,inopr);
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
		String VXTBM = Aele.attributeValue("SYSNO");
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
	 * 获取权限信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String QryQX(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String VSYSNO = Aele.attributeValue("VSYSNO");
		String VascNum = Aele.attributeValue("VascNum");
		String BGROUP = Aele.attributeValue("BGROUP");
		Document doc = null;
		String SQL = "";
		if("0".equals(BGROUP) || "".equals(BGROUP) || BGROUP == null){//管理员组权限
			SQL = "SELECT * FROM BASEMENT..TBGROUPQX "
					+ "WHERE VascNum='"+VascNum+"' AND VSYSNO='"+VSYSNO+"'";
		}else {//管理员权限
			SQL = "SELECT * FROM BASEMENT..TBUSERQX "
					+ "WHERE VascNum='"+BGROUP+"' AND VSYSNO='"+VSYSNO+"' AND VJOBNUM='"+VascNum+"'";
		}
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
	/**
	 * 保存权限信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String saveQX(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String VSYSNO = Aele.attributeValue("VSYSNO");
		String VascNum = Aele.attributeValue("VascNum");
		String BGROUP = Aele.attributeValue("BGROUP");
		Document doc = null;
		String SQL = "";
		if("0".equals(BGROUP) || "".equals(BGROUP) || BGROUP == null){//管理员组权限
			SQL = "SELECT * FROM BASEMENT..TBGROUPQX "
					+ "WHERE VascNum='"+VascNum+"' AND VSYSNO='"+VSYSNO+"'";
		}else {//管理员权限
			SQL = "SELECT * FROM BASEMENT..TBUSERQX "
					+ "WHERE VascNum='"+BGROUP+"' AND VSYSNO='"+VSYSNO+"' AND VJOBNUM='"+VascNum+"'";
		}
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
}
