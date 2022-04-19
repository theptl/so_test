package com.ntsphere.common.exception;

public class InvalidApiVersionException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	public InvalidApiVersionException() {
		super("InvalidApiVersionException");
	}
	
	
	public InvalidApiVersionException(String message) {
		super(message);
	}
}
