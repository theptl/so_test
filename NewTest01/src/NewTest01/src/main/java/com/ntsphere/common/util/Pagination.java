package com.ntsphere.common.util;

import lombok.Data;
import lombok.Getter;

public class Pagination
{
	public static int DefaultItemCountPerPage = 2;
	public static int DefaultDisplayPageNoCount = 5;
	
	
	
	@Data
	public class RequestData
	{
		private int pageNo;
		private int itemCountPerPage;
		private int displayPageNoCount;
	}
	
	@Data
	public class ResponseData
	{
		private int displayStartPageNo, displayEndPageNo;
		private int totalItemCount;
		private int startItemNo;
		private int maxPageNo;
	}
	
	
	@Getter private RequestData requestData;
	@Getter private ResponseData responseData;
	
	
	
	
	
	public Pagination(GsonHelper gson) throws Exception
	{
		requestData = new RequestData();
		requestData.pageNo = gson.on("/pageNo").getIntValue();
		requestData.itemCountPerPage = gson.on("/itemCountPerPage").getIntValue();
		requestData.displayPageNoCount = gson.on("/displayPageNoCount").getIntValue();
		
		responseData = new ResponseData();
	}
	
	
	public Pagination(ObjectHashMap params)
	{
		requestData = new RequestData();
		requestData.pageNo = params.getInteger("pageNo", 1);
		requestData.itemCountPerPage = params.getInteger("itemCountPerPage", DefaultItemCountPerPage);
		requestData.displayPageNoCount = params.getInteger("displayPageNoCount", DefaultDisplayPageNoCount);
		
		responseData = new ResponseData();
	}
	
	
	public Pagination(int pageNo, int itemCountPerPage, int displayPageNoCount)
	{
		requestData = new RequestData();
		requestData.pageNo = pageNo;
		requestData.itemCountPerPage = itemCountPerPage;
		requestData.displayPageNoCount = displayPageNoCount;
		
		responseData = new ResponseData();
	}
	
	
	public Pagination calculate(int totalItemCount) throws Exception
	{
		if (totalItemCount == 0)
		{
			responseData.displayStartPageNo = 0;
			responseData.displayEndPageNo = 0;
			responseData.totalItemCount = 0;
			responseData.startItemNo = 0;
			responseData.maxPageNo = 0;
			return this;
		}
		
		getResponseData().setTotalItemCount(totalItemCount);
		
		
		//  최대 페이지번호 계산
		responseData.maxPageNo = responseData.getTotalItemCount() / requestData.itemCountPerPage;
		if (responseData.getTotalItemCount() % requestData.itemCountPerPage > 0)
			responseData.maxPageNo += 1;
		
		if (requestData.pageNo < 1)
			requestData.pageNo = 1;
		if (requestData.pageNo > responseData.maxPageNo)
			requestData.pageNo = responseData.maxPageNo;
		
		
		//  현재 페이지에 노출할 항목의 시작값
		responseData.startItemNo = (requestData.pageNo - 1) * requestData.itemCountPerPage/* + 1*/;
		
		
		//  화면에 노출할 페이지번호의 시작과 끝
		int groupNo = (int)Math.ceil((double)requestData.pageNo / (double)requestData.displayPageNoCount);
		
		responseData.displayStartPageNo = 1 + (groupNo - 1) * requestData.displayPageNoCount;
		responseData.displayEndPageNo = groupNo * requestData.displayPageNoCount;
		
		if (responseData.displayEndPageNo > responseData.maxPageNo)
			responseData.displayEndPageNo = responseData.maxPageNo;
		
		return this;
	}
}
