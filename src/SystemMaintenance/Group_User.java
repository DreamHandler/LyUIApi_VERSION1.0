/**
 * @author 黄攀
 * @date 2019-05-15
 */
package SystemMaintenance;


import org.dom4j.Document;

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
		Document doc = null;
		String SQL = "";
		try {
			doc = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc.asXML();
	}
}
