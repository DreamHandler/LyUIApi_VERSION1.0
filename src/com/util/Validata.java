package com.util;

import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.Init.InitMenu;
import com.jax.Servire.IserviceImplDelegate;
import com.jax.Servire.IserviceImplService;
import com.model.Aperator;
import com.model.TMenu;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;


/**
 * 登录类
 * @author Administrator
 *
 */
public class Validata {
	private int ErrType = 101;
	public int getErrType(){
		return this.ErrType;
	}
	public Aperator Login(String UserName,String PassWord,String SysNo) throws Exception{
		BASE64Encoder encode = new BASE64Encoder();
		BASE64Decoder decode = new BASE64Decoder();
		Aperator CZY = null;
		Document document = null;
		document = DocumentHelper.createDocument();
		
		Element rsElement = document.addElement("xlm");
		Element data = rsElement.addElement("DATA");
		SysNo = SysNo+"|";
		
		//服务的具体类，继承了service类
		IserviceImplService  service=new IserviceImplService();
		//服务的接口，通过getPort()方法得到
		IserviceImplDelegate se=service.getPort(IserviceImplDelegate.class);
		
		data.addAttribute("UserName",UserName);
		data.addAttribute("SysNo",SysNo);
		String re = new String(decode.decodeBuffer(se.login(encode.encode(document.asXML().getBytes()))));
		if(re==null||"".equals(re)){
			this.ErrType = 500;
			throw new Exception("未获得返回值！");
		}
		Document doc = DocumentHelper.parseText(re);
		Element not = doc.getRootElement();
		Element ret = not.element("RES.2");
		if(ret!=null&&"0".equals(ret.getText())){
			Element retE = not.element("RES.3");
			this.ErrType = 500;
			if(retE!=null&&!"".equals(retE.getText())){
				throw new Exception(retE.getText());
			}else{
				throw new Exception("操作员未完成对应操作！");
			}
		}
		Element Files = not.element(NameUtil.Dom_Explains);
		Element Filev = not.element(NameUtil.Dom_Values).element(NameUtil.Dom_Value);
		if(Filev==null){
			this.ErrType = 101;
			return null;
		}
		String VPSWD = Filev.attributeValue("VPSWD");
		if(VPSWD==null||!VPSWD.equals(PassWord)){
			this.ErrType = 101;
			return null;
		}
		@SuppressWarnings("unchecked")
		List<Element> list = Files.elements(NameUtil.Dom_Explain);
		CZY = new Aperator();
		for(Element file : list){
			String ColName = file.attributeValue("ColName");
			String val = Filev.attributeValue(ColName);
			CZY.setAperator(ColName, val);
		}
		SetMenu(CZY);
		this.ErrType = 100;
		return CZY;
	}
	
	private void SetMenu(Aperator CZY) throws Exception{
		if(!TMenu.IsMeneNotNull()){
			if(!new InitMenu().Init()){
				throw new Exception("无法获得菜单信息！");
			}
		}
		List<Map<String,String>> menu = TMenu.getTMenu(NameUtil.SysNo, CZY.getAperator("VCDBM"));
		if(menu==null||menu.size()<1){
			throw new Exception("无法获得菜单信息！");
		}
		CZY.setMenu(menu);
	}
	
	
}
