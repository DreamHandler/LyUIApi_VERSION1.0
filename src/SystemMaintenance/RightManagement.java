package SystemMaintenance;


import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;
import com.util.Busy;


public class RightManagement extends Busy{
	public String QryMenuData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String where = "";
		
		try {
			
		} catch (Exception e) {
			e.printStackTrace();
		}
//		System.out.println(document.asXML());
		return null;
	}
	public String QryCZYData(Document inEle, Aperator inopr) throws Exception{
		Element Aele = inEle.getRootElement().element("ASK");
		String where = "";
		
		try {
			
		} catch (Exception e) {
			e.printStackTrace();
		}
//		System.out.println(document.asXML());
		return null;
	}
}
