package com.ntsphere.common.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SHA256 {
	public static byte[] encode(String msg) {
		
		try {
		    MessageDigest md = MessageDigest.getInstance("SHA-256");
		    md.update(msg.getBytes());
		    
		    return md.digest();
		}
		catch (NoSuchAlgorithmException e) {
			return null;
		}
	}
	
	
	public static String bytesToHex(byte[] bytes) {
	    StringBuilder builder = new StringBuilder();
	    for (byte b: bytes) {
	      builder.append(String.format("%02x", b));
	    }
	    return builder.toString();
	}
	
	
	public static String hashing(String msg) {
		return bytesToHex(encode(msg));
	}
}
