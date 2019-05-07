package Origin.Widget.EpBox;

import java.util.List;
import org.dom4j.Document;
import org.dom4j.Element;
import SOA.YxProGlob.BaseOpr.BaseOpr;
import SOA.YxProGlob.Busy.TQuery;
import SOA.YxProGlob.Epbox.EpObjectPool;

public class CallEpBox extends TQuery {

	public Object Query(String Fun, Element element, BaseOpr inOpr) throws Exception {
		String epboxName = element.attributeValue("EpName")==null?"":element.attributeValue("EpName");
		String xpath = element.attributeValue("XPATH")==null?"":element.attributeValue("XPATH"); //取XPATH数据
		Document rootDom = (Document)EpObjectPool.borrowObj(epboxName);
		String RtnStr = "";
		try{
			StringBuffer buffer = new StringBuffer();
			if (rootDom == null) {
				buffer.append("<?xml version='1.0' encoding='UTF-8'?><xml>");
				buffer.append("<RES>");
				buffer.append("<DAT>没有EPBOX的数据</DAT>");
				buffer.append("</RES></xml>");
				RtnStr =  buffer.toString();
			}else{
				if(xpath != null && !"".equals(xpath)){
					RtnStr = this.getXml(rootDom, xpath);
				}else
					RtnStr = rootDom.asXML();
			}
		}catch (Exception e) {
			throw e;
		}finally{
			EpObjectPool.returnObj(epboxName, rootDom);
		}
		return RtnStr;
	}
	
	@SuppressWarnings("unchecked")
	private String getXml (Document document, String xpath) {
		Element root = document.getRootElement();
		StringBuffer buffer = new StringBuffer();
		buffer.append("<?xml version='1.0'?><xml>");
		buffer.append(root.element("Fields").asXML());
		List<Element> list = root.selectNodes("Rows/Row[" + xpath + "]");
		buffer.append("<Rows>");
		for (int i = 0; i < list.size(); i++) {
			buffer.append(list.get(i).asXML());
		}
		buffer.append("</Rows></xml>");
		return buffer.toString();
	}
}
