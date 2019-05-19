package SystemMaintenance;


import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;


public class RightManagement extends Busy{
	//获取操作员组及操作员信息
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
	//获取系统信息
	public String QrySystemData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String BGROUP = Aele.attributeValue("BGROUP");
		String id = Aele.attributeValue("id");
		Document doc = null;
		String SQL = "";
		ArrayList<String> list = new ArrayList<String>();
		if("1".equals(BGROUP)){
			list.add(id);
			SQL = "SELECT A.*,B.VascNum,B.BSYZQX,B.VCDBM FROM BASEMENT..TBLYSYSINFO A WITH(NOLOCK) LEFT JOIN "
					+ "(SELECT * FROM BASEMENT..TBGROUPQX WITH(NOLOCK) WHERE VascNum = ?) B "
					+ "ON A.VSYSNO=B.VSYSNO";
		} else {
			
		} 
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,list,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
//		System.out.println(document.asXML());
		return doc.asXML();
	}
	//获取菜单信息
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
//		System.out.println(document.asXML());
		return doc.asXML();
	}
}
