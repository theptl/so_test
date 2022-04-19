package com.ntsphere.common.util;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.support.JdbcUtils;

@SuppressWarnings("serial")
public class ObjectHashMap extends LinkedHashMap<String, Object> {
	
	
	
	
	
	public static ObjectHashMap newInstance() {
		return new ObjectHashMap();
	}
	
	
	public static ObjectHashMap from(Map<String, Object> from) {
		ObjectHashMap map = new ObjectHashMap();
		map.putAll(from);
		return map;
	}
	
	
	public static ObjectHashMap fromParameterMap(Map<String, String[]> from) {
		ObjectHashMap map = new ObjectHashMap();
		
		for (Map.Entry<String, String[]> item : from.entrySet())
		{
			if (item.getValue().length == 0)
				map.put(item.getKey(), null);
			
			else if (item.getValue().length == 1)
				map.put(item.getKey(), item.getValue()[0]);
			
			else
				map.put(item.getKey(), item.getValue());
        }
		
		return map;
	}
	
	
	public static ObjectHashMap findMapFromList(List<ObjectHashMap> list, String key, Object value) {
		for (ObjectHashMap map : list) {
			Object originVal = map.get(key, null);
			if (originVal != null && originVal.equals(value) == true)
				return map;
		}
		
		return null;
	}
	
	
	public ResponseEntity<HashMap<String, Object>> getResponseEntity(HttpStatus status) {
		return new ResponseEntity<HashMap<String, Object>>(this, status);
	}
	
	
	public Object get(String key, Object def) {
		return super.getOrDefault(key, def);
	}
	
	
	public ObjectHashMap add(String key, Object val) {
		super.put(key, val);
		return this;
	}
	
	
	public Integer getInteger(String key)
	{
		String val = get(key).toString();
		return StringHelper.toInteger(val, 0);
	}
	
	
	public Integer getInteger(String key, Integer defaultValue)
	{
		try
		{
			String val = get(key).toString();
			return StringHelper.toInteger(val, defaultValue);
		}
		catch (Exception e)
		{
			return defaultValue;
		}
	}
	
	
	public String getString(String key)
	{
		return (String)get(key);
	}
	
	
	public String getString(String key, String defaultValue)
	{
		try
		{
			return StringHelper.ifNull((String)get(key), defaultValue);
		}
		catch (Exception e)
		{
			return defaultValue;
		}
	}
	
	
	/*
	 * 전체 Parameter를 대상으로, 값이 null이거나 빈 문자열인 경우 지정한 값으로 대체합니다.
	 */
	public ObjectHashMap ifNullOrEmpty(Object value)
	{
		for (Map.Entry<String, Object> iter : entrySet())
		{
			Object paramVal = iter.getValue();
			if (paramVal == null
				|| (paramVal instanceof String && ((String)paramVal).length() == 0))
			{
				iter.setValue(value);
			}
		}
		
		return this;
	}
	
	
	/*
	 * key의 값이 null이거나 빈 문자열인 경우 지정한 값으로 대체합니다.
	 */
	public ObjectHashMap ifNullOrEmpty(String key, Object value)
	{
		Object paramVal = get(key);
		if (paramVal == null
			|| (paramVal instanceof String && ((String)paramVal).length() == 0))
		{
			put(key, value);
		}
		
		return this;
	}
	
	
	public ObjectHashMap convertKeysToCamelCase()
	{
		HashMap<String, Object> newMap = new HashMap<String, Object>();
		for (Map.Entry<String, Object> iter : entrySet())
		{
			String key = iter.getKey();
			String newKey = JdbcUtils.convertUnderscoreNameToPropertyName(key);

			newMap.put(newKey, iter.getValue());
		}
		
		
		this.clear();
		for (Map.Entry<String, Object> iter : newMap.entrySet())
			put(iter.getKey(), iter.getValue());
		
		
		return this;
	}
}
