package com.ntsphere.common.util;

import java.io.IOException;
import java.util.Date;
import java.util.Map.Entry;

import javax.servlet.ServletException;
import org.springframework.stereotype.Component;

import com.ntsphere.common.exception.AuthException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import lombok.Getter;

@Component
public class JwtHelper {

	////////////////////////////////////////////////////////////////////////////////////////////////////
	//  static members
	public static JwtHelper builder() {
		return new JwtHelper();
	}
    
    
    public static void validation(String jwt, String signingKey) throws SignatureException, ExpiredJwtException, AuthException {
		if (jwt == null)
			jwt = ContextUtil.getJwtFromRequestHeader();
		
		Jwts.parser()
			.setSigningKey(signingKey)
			.parseClaimsJws(jwt);
    }
    
    
    public static Claims getClaims(String token, String signingKey) throws IOException, ServletException, AuthException {
    	
    	if (token == null || token.length() == 0)
    		token = ContextUtil.getJwtFromRequestHeader();
    	if (token == null)
    		return null;
    	
        Claims claims = Jwts.parser()
        					.setSigningKey(signingKey)
        					.parseClaimsJws(token)
        					.getBody();
        return claims;
    }
    
    
    public static Integer getClaimInt(String token, String signingKey, String key) {
    	try {
    		if (token == null)
    			token = ContextUtil.getJwtFromRequestHeader();
    		
			Integer value = getClaims(token, signingKey).get(key, Integer.class);
			return value;
		}
    	catch (Exception e) {
			return null;
		}
    }
    
    
    public static Long getClaimLong(String token, String signingKey, String key) {
    	try {
    		if (token == null)
    			token = ContextUtil.getJwtFromRequestHeader();
    		
    		Long value = getClaims(token, signingKey).get(key, Long.class);
			return value;
		}
    	catch (Exception e) {
			return null;
		}
    }
    
    
    public static Double getClaimDouble(String token, String signingKey, String key) {
    	try {
    		if (token == null)
    			token = ContextUtil.getJwtFromRequestHeader();
    		
    		Double value = getClaims(token, signingKey).get(key, Double.class);
			return value;
		}
    	catch (Exception e) {
			return null;
		}
    }
    
    
    public static String getClaimString(String token, String signingKey, String key) {
    	try {
    		if (token == null)
    			token = ContextUtil.getJwtFromRequestHeader();
    		
			String value = getClaims(token, signingKey).get(key, String.class);
			return value;
		}
    	catch (Exception e) {
			return null;
		}
    }
    
    
    
    

	////////////////////////////////////////////////////////////////////////////////////////////////////
	//  members
    private ObjectHashMap headerClaims = new ObjectHashMap();
    private ObjectHashMap payloadClaims = new ObjectHashMap();
    @Getter private JwtBuilder jwtBuilder = Jwts.builder();
    
    
    
    
    
    public JwtHelper() {
    	jwtBuilder.setIssuedAt(new Date());
    	
    	addHeaderClaim("typ", "JWT");
    }
    
    
    public JwtHelper addHeaderClaim(String key, Object value) {
    	headerClaims.add(key, value);
    	return this;
    }
    
    
    public JwtHelper addClaim(String key, Object value) {
    	payloadClaims.add(key, value);
    	return this;
    }
    
    
    public JwtHelper setAudience(String aud) {
    	jwtBuilder.setAudience(aud);
    	return this;
    }
    
    
    public JwtHelper setSubject(String sub) {
    	jwtBuilder.setSubject(sub);
    	return this;
    }
    
    
    public JwtHelper setExpirationDate(Long expiration) {
    	Date exp = new Date(expiration);
        jwtBuilder.setExpiration(exp);
    	return this;
    }
    
    
    public String build(String signingKey) {
    	//  Add claims to header
        for (Entry<String, Object> entry : headerClaims.entrySet()) {
        	jwtBuilder.setHeaderParam(entry.getKey(), entry.getValue());
        }
        
        
    	//  Add claims to payload
        for (Entry<String, Object> entry : payloadClaims.entrySet()) {
        	jwtBuilder.claim(entry.getKey(), entry.getValue());
        }
        
        String jwt = jwtBuilder.signWith(SignatureAlgorithm.HS512, signingKey)
        						.compact();
    	
    	return jwt;
    }
}
