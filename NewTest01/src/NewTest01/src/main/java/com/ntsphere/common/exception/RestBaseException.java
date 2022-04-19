package com.ntsphere.common.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

public class RestBaseException extends Exception {

	private static final long serialVersionUID = 1L;
	@Getter private HttpStatus httpStatus;
	@Getter private int subCode;

	
	
	
	
	public RestBaseException() {
	}
	
	
	public RestBaseException(String message) {
		super(message);
		
		this.httpStatus = HttpStatus.BAD_REQUEST;
	}
	
	
	public RestBaseException(HttpStatus status, String message) {
		super(message);
		
		this.httpStatus = status;
	}
	
	
	public RestBaseException(HttpStatus status, int subCode, String message) {
		super(message);
		
		this.httpStatus = status;
		this.subCode = subCode;
	}
}
