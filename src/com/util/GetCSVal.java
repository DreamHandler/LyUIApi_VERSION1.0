package com.util;

import org.dom4j.Document;
import org.dom4j.Element;

import com.model.Aperator;

public class GetCSVal extends Busy{
	public String GetParamer(Document inEle, Aperator inopr){
		Element Aele = inEle.getRootElement();
		String CBH= Aele.attributeValue("CBH");
		String param = null;
		int ILength = 0;
		String SQL="select *from BASEMENT..TBPARAMS with(nolock) where CBH='"+CBH+"'";
		Document re = null;
		try {
			re = this.ServireSQL(BaseServire.SysQuer,SQL,null,inopr);
			Element RootEle = (Element) re.getRootElement().elements().get(1);
			if(RootEle.element("FieldValue")!=null){
				param = RootEle.element("FieldValue").attributeValue("CVALUE");
				ILength = Integer.parseInt(RootEle.element("FieldValue").attributeValue("ILength"));
				int NowVal = Integer.parseInt(param)+1;
				int YHead = ILength-(NowVal+"").length();
				String VHead = "";
				for (int i = 0; i < YHead; i++) {
					VHead += "0";
				}
				param = VHead+(NowVal+"");
				String UpdSQL = "update BASEMENT..TBPARAMS set CVALUE='"+NowVal+"' where CBH='"+CBH+"'";
				this.ServireSQL(BaseServire.SysModify,UpdSQL,null,inopr);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(param==null){
			param = "0";
		}
		return param;
	}
}
