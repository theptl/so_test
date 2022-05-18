package com.study01.service;

import java.util.HashMap;

public class Paging {

	
	public static HashMap<String, Object> PagingCalc(HashMap<String, Object> pagingCalcData) {
		
		int totalListCount = (int) pagingCalcData.get("totalListCount");
		int pageNo = (int) pagingCalcData.get("pageNo");
		
		int displayPageNoCount = 3;
		int itemCountPerPage  = 5;
		
		int lastPage = (int) Math.ceil((double)totalListCount / (double)itemCountPerPage);		
		
		int viewEndPage = ((int) Math.ceil((double)pageNo / (double)displayPageNoCount)) * displayPageNoCount;		
		if (pageNo > lastPage) {
			pageNo = lastPage;
		} if(viewEndPage > lastPage) {
			viewEndPage = lastPage;
		}
		
		int viewStartPage = viewEndPage - displayPageNoCount + 1;
		if (viewStartPage < 1) {
			viewStartPage = 1;
			pageNo = 1;
		} else if (lastPage - viewEndPage < lastPage % displayPageNoCount) {			
			viewStartPage = lastPage - (lastPage % displayPageNoCount) + 1;	
		}
		
		HashMap<String, Object> pagingResponseData = new HashMap<String, Object>();

		pagingResponseData.put("viewStartPage", viewStartPage);
		pagingResponseData.put("viewEndPage", viewEndPage);
		pagingResponseData.put("pageNo", pageNo);
		
		return pagingResponseData;
		
	}
	
	


}
