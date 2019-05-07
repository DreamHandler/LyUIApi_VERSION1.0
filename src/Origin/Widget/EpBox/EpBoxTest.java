package Origin.Widget.EpBox;

import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;
import com.util.BaseServire;
import com.util.Busy;

public class EpBoxTest extends Busy{
	public String QryAll(Document inEle, Aperator inopr) throws Exception{
		String SQL="select * from PHARMACY..VTBTCLIMXB with(nolock) where 1=1 ";
		String NSQL = "select COUNT(*) ROWNUM from PHARMACY..VTBTCLIMXB with(nolock) where 1=1 ";
		Document re = null;
		try {
			re = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
			Document Nre = this.ServireSQL(BaseServire.SysQuer,NSQL,null,inopr);
			Element Nele = Nre.getRootElement();
			Element RootEle = (Element) Nele.elements().get(1);
			String ROWNUM = RootEle.element("FieldValue").attributeValue("ROWNUM");
			Element rele = re.getRootElement();
			Element Others = rele.addElement("Others");
			Others.addAttribute("ROWNUM", ROWNUM);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return re.asXML();
	}
}
