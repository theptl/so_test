package com.study01.service;

import java.util.HashMap;

public class BoardList {
	
	
	public static HashMap<String, Object> BoardListCalc(HashMap<String, Object> boradListRequestData) {
		
		int itemCountPerPage  = 5;
		
		int pageNo = (int) boradListRequestData.get("pageNo");
		String searchWord = (String) boradListRequestData.get("searchWord");
		
		int viewStartIdx = (pageNo * itemCountPerPage ) - itemCountPerPage;
		
		if (viewStartIdx < 0) {
			viewStartIdx = 0;
		}
		
		HashMap<String, Object> boradListCalcData = new HashMap<String, Object>();
		boradListCalcData.put("viewStartIdx", viewStartIdx);
		boradListCalcData.put("itemCountPerPage", itemCountPerPage);
		boradListCalcData.put("searchWord", searchWord);
		
		return boradListCalcData;
	}

}
