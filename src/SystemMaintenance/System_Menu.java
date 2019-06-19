/**
 * @author 黄攀
 * @date 2019-05-31
 */
package SystemMaintenance;


import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class System_Menu extends Busy{
	private int IXH = 1;  //序号
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
	    		SQL += "INSERT INTO BASEMENT..TBLYSYSINFO(VNAME,VSYSNO,BENABLE)"
	    				+ "VALUES(?,?,1)";
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
	 * 先删除，在根据前台ztree信息顺序保存菜单信息：前台ztree可随意调整，数据库信息都是重新保存
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String SaveMenuData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String VSYSNO = Aele.attributeValue("VSYSNO");
		String nodesStr = Aele.attributeValue("nodes");
		Document doc = null;
		StringBuffer SQL = new StringBuffer();
	    SQL.append("DELETE BASEMENT..TBMENU WHERE VXTBM='"+VSYSNO+"' ");
	    try {
	    	//nodesStr字符串对象转化为json对象
	    	JSONArray root_jsonArray = JSONArray.fromObject(nodesStr);
	    	//json对象转化为数组对象
	    	Object[] root_obj = root_jsonArray .toArray();
	    	SQL = QryChildData(root_obj[0],0,SQL);
//	    	System.out.println(SQL.toString());
	    	doc = ServireSQL(BaseServire.SysModify, SQL.toString(), null, inopr);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	    return doc.asXML();
	}
	/**
	 * 获取菜单信息，并判断有无下级菜单，构成INSERT INTO 重新语句保存菜单信息
	 * @param childStr
	 * @param IZH
	 * @param SQL
	 * @return
	 * @throws Exception
	 */
	public StringBuffer QryChildData(Object childStr,int IZH,StringBuffer SQL) throws Exception{
		//nodesStr字符串对象转化为json对象
    	JSONArray child_jsonArray = JSONArray.fromObject(childStr);
    	//json对象转化为数组对象
		Object[] child_obj = child_jsonArray .toArray();
		for(int i=0; i<child_obj.length; i++) {
    	    JSONObject jsonObj = JSONObject.fromObject(child_obj[i]);
    	    String VNum = (jsonObj.get("VNum")==null?"":jsonObj.get("VNum")).toString();
    	    String VName = (jsonObj.get("VName")==null?"":jsonObj.get("VName")).toString();
    	    String VXTBM = (jsonObj.get("VXTBM")==null?"":jsonObj.get("VXTBM")).toString();
    	    String VSRC = (jsonObj.get("VSRC")==null?"":jsonObj.get("VSRC")).toString();
    	    String VPIC = (jsonObj.get("VPIC")==null?"":jsonObj.get("VPIC")).toString();
    	    int izh = IXH;
    	    SQL.append(" INSERT INTO BASEMENT..TBMENU(VNum,VName,IZH,IXH,VXTBM,VSRC,VPIC,BENABLE)")
    	    	.append(" VALUES('").append(VNum).append("','").append(VName).append("',").append(IZH).append(",")
    	    	.append(IXH++).append(",'").append(VXTBM).append("','").append(VSRC).append("','")
    	    	.append(VPIC).append("',1)");
//    	    System.out.println(VNum+"--"+VName+"--"+VXTBM+"--"+VSRC+"--"+VPIC);
    	    Object childJson = jsonObj.get("children");
    	    if(childJson != null){
    	    	SQL = QryChildData(childJson,izh,SQL);
    	    }
    	}
		return SQL;
	}
	/**
	 * 获取最大菜单编码信息
	 * @param inEle
	 * @param inopr
	 * @return
	 * @throws Exception
	 */
	public String QryMaxVnum(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String VSYSNO = Aele.attributeValue("VSYSNO");
		Document doc = null;
		String SQL = "SELECT MAX(Vnum)MAX_VNUM FROM BASEMENT..TBMENU WITH(NOLOCK) WHERE 1=1 AND VXTBM='"+VSYSNO+"'";
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
}
