package com.ntsphere.common.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ntsphere.common.exception.*;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BaseController {
	
	
	@Autowired private Environment environment;
	
	
	
	
	
	protected String getCurrentProfile() {
		String[] profiles = environment.getActiveProfiles();
		if (profiles == null || profiles.length == 0)
			return "";
		
		return profiles[0];
	}
	
	
	protected String[] getCurrentProfiles() {
		String[] profiles = environment.getActiveProfiles();
		return profiles;
	}
	
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//  Request Parameter
	protected String getRawBody() throws IOException {
		HttpServletRequest request = ContextUtil.getRequest();
        String body = null;
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;
 
        
        InputStream inputStream = request.getInputStream();
        if (inputStream != null) {
            bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            char[] charBuffer = new char[128];
            int bytesRead = -1;
            while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                stringBuilder.append(charBuffer, 0, bytesRead);
            }
        }
        else
            stringBuilder.append("");
        
        
        if (bufferedReader != null)
        	bufferedReader.close();
 
        body = stringBuilder.toString();
        return body;
    }
	
	
	protected ObjectHashMap getParameters() {
		HttpServletRequest request = ContextUtil.getRequest();
		ObjectHashMap ret = new ObjectHashMap();
		
		
		for (Map.Entry<String, String[]> iter : request.getParameterMap().entrySet()) {
			String key = iter.getKey();
			String[] val = iter.getValue();
			
			ret.add(key, val);
		}
		
		return ret;
	}
	
	
	protected String getParameter(String key) throws RestBaseException {
		
		HttpServletRequest request = ContextUtil.getRequest();
		String val = request.getParameter(key);
		
		if (val == null) {
			throw new RestBaseException(String.format("Argument '%s' is not exists.", key));
		}
		
		return val;
	}
	
	
	protected String getParameter(String key, String defaultVal) {
		
		HttpServletRequest request = ContextUtil.getRequest();
		String val = request.getParameter(key);
		
		if (val == null) {
			return defaultVal;
		}
		
		return val;
	}
	
	
	protected Integer getIntParameter(String key) throws RestBaseException {
		
		try {
			HttpServletRequest request = ContextUtil.getRequest();
			String val = request.getParameter(key);
			
			if (val == null) {
				throw new RestBaseException(String.format("Argument '%s' is not exists.", key));
			}
			
			return Integer.parseInt(val);
		}
		catch (RestBaseException e) {
			throw e;
		}
		catch (Exception e) {
			throw new RestBaseException(String.format("Argument '%s' is not a number.", key));
		}
	}
	
	
	protected Integer getIntParameter(String key, Integer defaultVal) {
		
		try {
			HttpServletRequest request = ContextUtil.getRequest();
			String val = request.getParameter(key);
			
			if (val == null) {
				return defaultVal;
			}
			
			return Integer.parseInt(val);
		}
		catch (Exception e) {
			return defaultVal;
		}
	}
	
	
	protected Long getLongParameter(String key) throws RestBaseException {
		
		try {
			HttpServletRequest request = ContextUtil.getRequest();
			String val = request.getParameter(key);
			
			if (val == null) {
				throw new RestBaseException(String.format("Argument '%s' is not exists.", key));
			}
			
			return Long.parseLong(val);
		}
		catch (RestBaseException e) {
			throw e;
		}
		catch (Exception e) {
			throw new RestBaseException(String.format("Argument '%s' is not a number.", key));
		}
	}
	
	
	protected Long getLongParameter(String key, Long defaultVal) {
		
		try {
			HttpServletRequest request = ContextUtil.getRequest();
			String val = request.getParameter(key);
			
			if (val == null) {
				return defaultVal;
			}
			
			return Long.parseLong(val);
		}
		catch (Exception e) {
			return defaultVal;
		}
	}
	
	
	protected Double getDoubleParameter(String key) throws RestBaseException {
		
		try {
			HttpServletRequest request = ContextUtil.getRequest();
			String val = request.getParameter(key);
			
			if (val == null) {
				throw new RestBaseException(String.format("Argument '%s' is not exists.", key));
			}
			
			return Double.parseDouble(val);
		}
		catch (RestBaseException e) {
			throw e;
		}
		catch (Exception e) {
			throw new RestBaseException(String.format("Argument '%s' is not a double.", key));
		}
	}
	
	
	protected Double getDoubleParameter(String key, Double defaultVal) {
		
		try {
			HttpServletRequest request = ContextUtil.getRequest();
			String val = request.getParameter(key);
			
			if (val == null) {
				return defaultVal;
			}
			
			return Double.parseDouble(val);
		}
		catch (Exception e) {
			return defaultVal;
		}
	}
	
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//  Parser
	protected Integer parseInt(String value) {
		
		try {
			return Integer.parseInt(value);
		} catch (Exception e) {
			return null;
		}
	}
	
	
	protected Integer parseInt(String value, Integer defaultValue) {
		
		try {
			return Integer.parseInt(value);
		} catch (Exception e) {
			return defaultValue;
		}
	}
	
	
	protected Double parseDouble(String value) {
		
		try {
			return Double.parseDouble(value);
		} catch (Exception e) {
			return null;
		}
	}
	
	
	protected Double parseDouble(String value, Double defaultValue) {
		
		try {
			return Double.parseDouble(value);
		} catch (Exception e) {
			return defaultValue;
		}
	}
	
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//  Comparer
	protected Boolean equals(Double left, Double right) {
		return left.equals(right);
	}
	
	
	protected Boolean equals(String left, String right) {
		return left.equals(right);
	}
	
	
	protected Boolean equalsNoCase(String left, String right) {
		return left.toLowerCase().equals(right.toLowerCase());
	}
	
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//  Etc
	protected void checkSqlInjection(String src) throws RestBaseException {
		if (src == null)
			return;
		
		if (src.contains("--") == true || src.contains("*") == true)
			throw new RestBaseException(HttpStatus.BAD_REQUEST, "Invalid Argument");
	}
	
	
	
	
	
	////////////////////////////////////////////////////////////////////////////////
	//  Exception Handler
	
	//  AuthException
	@ExceptionHandler(value=AuthException.class)
	private ResponseEntity<?> AuthExceptionHandler(AuthException e) {
		
		log.debug(e.getMessage());
		return RestResponse.build(e.getHttpStatus(), e.getMessage())
				.responseEntity();
	}
	
	
	//  InvalidApiVersionException
	@ExceptionHandler(value=InvalidApiVersionException.class)
	private ResponseEntity<?> InvalidApiVersionExceptionHandler(InvalidApiVersionException e) {
		
		log.debug(e.getMessage());
		return RestResponse.build(HttpStatus.FORBIDDEN, "Invalid API version.")
				.responseEntity();
	}
	
	
	//  RestBaseException
	@ExceptionHandler(value=RestBaseException.class)
	private ResponseEntity<?> RestBaseExceptionHandler(RestBaseException e) {
		
		log.debug(e.getMessage());
		return RestResponse.build(e.getHttpStatus(), e.getMessage())
				.setSubCode(e.getSubCode())
				.responseEntity();
	}
}
