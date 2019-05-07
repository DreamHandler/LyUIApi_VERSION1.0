package com.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 菜单权限类
 * @author Administrator
 *
 */
public class Menu {
	private List<Map<String,String>> menuDate = null;//菜单集合
	public Menu(){
		this.menuDate = new ArrayList<Map<String,String>>();
	}
	public void setMenu(List<Map<String, String>> menu){
		this.menuDate=menu;
	}
	public List<Map<String,String>> getMenu(){
		return this.menuDate;
	}
	
}
