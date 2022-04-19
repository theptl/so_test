package com.ntsphere.common.util;

import java.util.Date;

import io.jsonwebtoken.*;
import lombok.*;

public class Jwt {
	private String signingKey;
	private ObjectHashMap header = new ObjectHashMap();
	private ObjectHashMap payload = new ObjectHashMap();
	
	@Getter private String token = "";
	@Getter @Setter private DateTime expiration;
	
	
	
	
	
	public Jwt() {
	}
	
	
	public static Jwt parse(String token, String signingKey) {
		
		//  Token verify
		Jwts.parser()
			.setSigningKey(signingKey)
			.parseClaimsJws(token)
			;

		
		Jwt jwt = new Jwt();
		jwt.token = token;
		jwt.signingKey = signingKey;
		
		
		String[] split = token.split("\\.");
		jwt.header = GsonHelper.parse(Base64Coder.decodeString(split[0])).mappingTo(ObjectHashMap.class);
		jwt.payload = GsonHelper.parse(Base64Coder.decodeString(split[1])).mappingTo(ObjectHashMap.class);
		
		return jwt;
	}
	
	
	
	
	
	//////////////////////////////////////////////////////////////////////
	//  Subject
	public Jwt setSubject(String subject) {
		header.add("subject", subject);
		return this;
	}
	
	
	public String getSubject() {
		return header.get("subject", null).toString();
	}
	
	
	
	
	
	//////////////////////////////////////////////////////////////////////
	//  Signing key
	public Jwt setSigningKey(String signingKey) {
		this.signingKey = signingKey;
		return this;
	}
	
	
	public String getSigningKey() {
		return this.signingKey;
	}
	
	
	
	
	
	//////////////////////////////////////////////////////////////////////
	//  Claim
	public String getClaim(String key) {
		return payload.get(key).toString();
	}
	
	
	public Jwt addClaim(String key, String val) {
		payload.add(key, val);
		return this;
	}
	
	
	public String getClaim(String aesKey, String key) {
		try {
			String val = payload.get(key).toString();
			val = AES256.decrypt(aesKey, val);
			return val;
		}
		catch (Exception e) {
			return null;
		}
	}
	
	
	public Jwt addClaim(String aesKey, String key, String val) {
		try {
			val = AES256.encrypt(aesKey, val);
			payload.add(key, val);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return this;
	}
	
	
	
	
	
	//////////////////////////////////////////////////////////////////////
	//  Generate
	public String generateToken() throws Exception {

        JwtBuilder builder = Jwts.builder();
        
        
        if (header != null)
        	builder.setHeader(header);
        
        if (payload != null)
        	builder.setClaims(payload);
        
        
        token = builder.setIssuedAt(new Date())
		                .setExpiration(new Date(expiration.getTimeInMillis()))
		                .signWith(SignatureAlgorithm.HS512, signingKey)
		                .compact();
        
        String[] split = token.split("\\.");
		header = GsonHelper.parse(Base64Coder.decodeString(split[0])).mappingTo(ObjectHashMap.class);
		payload = GsonHelper.parse(Base64Coder.decodeString(split[1])).mappingTo(ObjectHashMap.class);
		
        return token;
    }
}
