package com.ntsphere.common.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class StringHashMap extends HashMap<String, String> {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	public static StringHashMap newInstance() {
		return new StringHashMap();
	}
	
	
	public static StringHashMap from(HashMap<String, String> from) {
		StringHashMap map = new StringHashMap();
		map.putAll(from);
		return map;
	}
	
	
	public static StringHashMap findMapFromList(List<StringHashMap> list, String key, String value) {
		for (StringHashMap map : list) {
			String originVal = map.get(key, null);
			if (originVal != null && originVal.equals(value) == true)
				return map;
		}
		
		return null;
	}
	
	
	public String get(String key, String def) {
		return getOrDefault(key, def);
	}
	
	
	public StringHashMap add(String key, String val) {
		super.put(key, val);
		return this;
	}
	
	
	public ResponseEntity<HashMap<String, String>> getResponseEntity(HttpStatus status) {
		return new ResponseEntity<HashMap<String, String>>(this, status);
	}
	
	
	public String getJsonString() {
		String json = "{";
		int idx = 0;
		
		for (Map.Entry<String, String> item : entrySet()) {
			if (idx++ > 0) {
				json += ",";
			}
			
			json += "\"" + item.getKey() + "\"";
			json += ":";
			json += "\"" + item.getValue() + "\"";
		}
		
		json += "}";
		return json;
	}
}
