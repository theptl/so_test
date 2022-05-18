package com.study01.common;

public class PagingDataVO {
	
	private int totalListCount;
	private int lastPage;
	private int viewStartPage;
	private int viewEndPage;
	
	private int displayPageNoCount;
	private int itemCountPerPage;
	
	private int pageNo;
	private String searchWord;
	
	
	public int getTotalListCount() {
		return this.totalListCount;
	}	
	public int getLastPage() {
		return this.lastPage;
	}	
	public int getViewStartPage() {
		return this.viewStartPage;
	}
	public int getViewEndPage() {
		return this.viewEndPage;
	}
	
	
	public int getDisplayPageNoCount() {
		return this.displayPageNoCount;
	}	
	public int getItemCountPerPage() {
		return this.itemCountPerPage;
	}
	
	
	public int getPageNo() {
		return this.pageNo;
	}	
	public String getSearchWord() {
		return this.searchWord;
	}

	
	public void setTotalListCount(int totalListCount) {
		this.totalListCount = totalListCount;
	}
	public void setLastPage(int lastPage) {
		this.lastPage = lastPage;
	}
	public void setViewStartPagee(int viewStartPage) {
		this.viewStartPage = viewStartPage;
	}
	public void setViewEndPage(int viewEndPage) {
		this.viewEndPage = viewEndPage;
	}
	
	
	public void setDisplayPageNoCount(int displayPageNoCount) {
		this.displayPageNoCount = displayPageNoCount;
	}
	public void setItemCountPerPage(int itemCountPerPage) {
		this.itemCountPerPage = itemCountPerPage;
	}

	
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}
	public void setSearchWord(String searchWord) {
		this.searchWord = searchWord;
	}


}
