package com.util;

import org.dom4j.Document;

import com.model.Aperator;

public class text {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Aperator opr = new Aperator();
		opr.setAperator("VUSER","gly");
		String SQL = "select * from　BASEMENT..TBUSER";
		BaseServire bs = new BaseServire();
		try {
			Document re = bs.ServireSQL(BaseServire.SysQuer,SQL,null,opr);
			System.out.println(re.asXML());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
