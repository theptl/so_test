package com.test01.controller;

public class BoardVo {
	
	private String IDX;
	private String TITLE;
	private String CONTENT;
	private String WRITER;
	private String REGDATE;
	
	
	public String getIdx() {
		return this.IDX;
	}
	
	public String getTitle() {
		return this.TITLE;
	}
	
	public String getContent() {
		return this.CONTENT;
	}
	
	public String getWriter() {
		return this.WRITER;
	}
	
	public String getRegdate() {
		return this.REGDATE;
	}

	
	public void setIdx(String IDX) {
		this.IDX = IDX;
	}
	
	public void setTitle(String TITLE) {
		this.TITLE = TITLE;
	}
	
	public void setContent(String CONTENT) {
		this.CONTENT = CONTENT;
	}
	
	public void setWriter(String WRITER) {
		this.WRITER = WRITER;
	}
	
	public void setRegdate(String REGDATE) {
		this.REGDATE = REGDATE;
	}
	
}
