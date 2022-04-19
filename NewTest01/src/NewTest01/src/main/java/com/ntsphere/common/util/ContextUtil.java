package com.ntsphere.common.util;

import java.util.Arrays;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.util.Assert;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.ntsphere.common.exception.AuthException;

public class ContextUtil {
	
	public static final String AuthTokenName = "authToken";
	
	
	
	
	
	////////////////////////////////////////////////////////////////////////////////
	//  Servlet
	public static HttpServletRequest getRequest() {
		RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
		Assert.state(requestAttributes != null, "Could not find current request via RequestContextHolder");
		Assert.isInstanceOf(ServletRequestAttributes.class, requestAttributes);

		HttpServletRequest servletRequest = ((ServletRequestAttributes) requestAttributes).getRequest();
		Assert.state(servletRequest != null, "Could not find current HttpServletRequest");
		
		return servletRequest;
	}
	
	
	public static HttpServletResponse getResponse() {
		RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
		Assert.state(requestAttributes != null, "Could not find current request via RequestContextHolder");
		Assert.isInstanceOf(ServletRequestAttributes.class, requestAttributes);

		HttpServletResponse servletResponse = ((ServletRequestAttributes) requestAttributes).getResponse();
		Assert.state(servletResponse != null, "Could not find current HttpServletResponse");
		
		return servletResponse;
	}
	
	
	public static String getJwtFromRequestHeader() throws AuthException {
		
		try {
			HttpServletRequest request = getRequest();
			String authHeader = request.getHeader("Authorization");
			String token = "";

			//  Header 확인
	        if (authHeader != null && authHeader.startsWith("Bearer ") == true) {
	        	token = authHeader.substring(7);
	        }
        	//  Header에 없다면 Request Parameter를 확인
	        else {
	        	token = request.getParameter("AuthToken");
	        	
	        	if (token == null)
	        		throw new AuthException(HttpStatus.UNAUTHORIZED, "Invalid token.");
	        }

	    	return token;
		}
		catch (Exception e) {
        	throw new AuthException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	
	
	
	////////////////////////////////////////////////////////////////////////////////
	//  Session & Cookie
	public static void setSessionAttribute(String name, Object o) {
		try {
			HttpServletRequest request = getRequest();
			request.getSession().setAttribute(name, o);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public static Object getSessionAttribute(String name) {
		try {
			HttpServletRequest request = getRequest();
			return request.getSession().getAttribute(name);
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	public static String getCookie(String name) {
		
		HttpServletRequest request = getRequest();
		
		if (request.getCookies() == null)
			return null;
		
		return Arrays.stream(request.getCookies())
	            .filter(c -> c.getName().equals(name))
	            .findFirst()
	            .map(Cookie::getValue)
	            .orElse(null);
	}
	
	
	public static void setCookie(String name, String value) {
		
		HttpServletResponse response = getResponse();
		Cookie cookie = new Cookie(name, value);

		if (value == null) {
			cookie.setMaxAge(0);
			cookie.setPath("/");
		}
		
		response.addCookie(cookie);
	}
	
	
	public static void setCookie(String path, String name, String value) {
		
		HttpServletResponse response = getResponse();
		Cookie cookie = new Cookie(name, value);

		cookie.setPath(path);
		if (value == null) {
			cookie.setMaxAge(0);
			cookie.setPath("/");
		}
		
		response.addCookie(cookie);
	}
}
