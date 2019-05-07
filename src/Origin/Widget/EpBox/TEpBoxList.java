package Origin.Widget.EpBox;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.HashMap;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;

import SOA.YxProGlob.ConnPool.TDBConnPool;



public class TEpBoxList extends Busy{

	private static HashMap<String, Document> EpBoxList = new HashMap<String,Document>();
	public static boolean NoLock = false;
	
	public boolean initData() {
		boolean InitTag = false; 
		if(!NoLock){
			NoLock = true;
			EpBoxList.clear();
			Aperator inopr = new Aperator();
			try {
				String SQL = "SELECT CDYMC,CVALUE,IXS,CZWBT,CZDMC,CLKD FROM BASEMENT..TBJZDYB WITH(NOLOCK) WHERE BTATUS = 1";
				Document doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
//				while (rs.next()) {
//					TEpDef def = ReadData(rs); 
//					try{
//						Document dom = this.ExecQryXml(def.getCVALUE(), def);
//						EpBoxList.put(CheckString(rs,"CDYMC"), dom);
//					}catch (Exception e) {
//						e.printStackTrace();
//					}
//				}
				InitTag = true;
			} catch (Exception e){
				InitTag = false;
				e.printStackTrace();
			} finally {
				inopr = null;
			}
			NoLock = false;
		}
		return InitTag;
	}
	/**
	 * 重新初始化某个epBox
	 */
	@SuppressWarnings("unchecked")
	public boolean resetEp(String epName){
//		EpBoxList.get(epName).clearContent();
		boolean InitTag = false; 
		TEpBoxList eplist = new TEpBoxList();
		Aperator inopr = new Aperator();
		try {
			String SQL = "SELECT CDYMC,CVALUE,IXS,CZWBT,CZDMC,CLKD FROM BASEMENT..TBJZDYB WITH(NOLOCK) WHERE BTATUS = 1";
//			Document doc = BaseService.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
//			if (rs.next()) {
//				TEpDef def = eplist.ReadData(rs); 
//				try{
//					EpBoxList.put(epName, eplist.ExecQryXml(def.getCVALUE(), def));
//				}catch (Exception e) {
//					e.printStackTrace();
//				}
//			}
			InitTag = true;
			EpObjectPool.EpactionPool.clear(epName);
		} catch (Exception e) {
			InitTag = false;
			e.printStackTrace();
		} finally {
			eplist = null;
			inopr = null;
		}
		return InitTag;
	}
	public static Document getEpDef(Object key){
		return EpBoxList.get(key);
	}
	/**
	 *  
	 */
	protected String CheckString(ResultSet rs,String FileName) throws Exception{
		String value = rs.getString(FileName);
		return ((value == null) || "null".equals(value))? "": value;
	}
	/**
	 * 加载字典表数据
	 * @throws Exception 
	 */
	private TEpDef ReadData(ResultSet rs) throws Exception {
		TEpDef EpDef = new TEpDef();
		EpDef.setCDYMC(CheckString(rs, "CDYMC"));
		EpDef.setCLKD(CheckString(rs, "CLKD"));
		EpDef.setCVALUE(CheckString(rs, "CVALUE"));
		EpDef.setCZDMC(CheckString(rs, "CZDMC"));
		EpDef.setCZWBT(CheckString(rs, "CZWBT"));
		EpDef.setIXS(rs.getInt("IXS"));
		return EpDef;
	}
	//
	public Document ExecQryXml(String CSQL,TEpDef Def) throws Exception {
		ResultSet rs = null;
		ResultSetMetaData rstr = null;
		PreparedStatement ps = null;
		Document document = null;
		Connection xmlconn = TDBConnPool.getConnection();
		try {
			ps = xmlconn.prepareStatement(CSQL);
			rs = ps.executeQuery();
			document = DocumentHelper.createDocument();
			Element rsElement = document.addElement("xml");
			rstr = rs.getMetaData(); // 字段说明部分
			Element fields = rsElement.addElement("Fields");
			String [] ColName = Def.getCZWBT().split("\\|");
			String [] ColWidth = Def.getCLKD().split("\\|");
			for (int i = 1; i <= ColName.length; i++) {
				Element field = fields.addElement("Field");
				field.addAttribute("name", ColName[i-1]);
				field.addAttribute("width",i<=ColWidth.length?ColWidth[i-1]:"100");
				field.addAttribute("ColName",rstr.getColumnName(i));
			}
			Element value = rsElement.addElement("Rows");
			while (rs.next()) {
				Element fieldvalue = value.addElement("Row");
				for (int i = 1; i <= rstr.getColumnCount(); i++) {
					fieldvalue.addAttribute(rstr.getColumnName(i).toString(), (rs.getString(i) == null?"":rs.getString(i)));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			xmlconn.close();
		}
		return document;
	}
}
