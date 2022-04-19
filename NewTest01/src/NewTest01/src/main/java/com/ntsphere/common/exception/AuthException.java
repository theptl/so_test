package com.ntsphere.common.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

public class AuthException extends Exception {

	private static final long serialVersionUID = 1L;
	@Getter private HttpStatus httpStatus;

	
	
	
	
	public AuthException() {
	}
	
	
	public AuthException(HttpStatus status, String message) {
		super(message);
		
		this.httpStatus = status;
	}
}
