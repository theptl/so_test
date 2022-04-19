package com.ntsphere.common.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.regex.Pattern;

public class StringHelper
{
	/**
	 * source값이 null일 경우 defaultValue를 반환하고, null이 아닐 경우 source를 반환합니다.
	 * @param source
	 * @param defaultValue
	 * @return
	 */
	public static String ifNull(String source, String defaultValue)
	{
		if (source == null)
			return defaultValue;
		
		return source;
	}
	
	/**
	 * 무조건 반올림
	 * @param num1
	 * @param num2
	 * @return
	 */
	public static int getCeil(double num1, double num2) {
		return (int)Math.ceil(num1 / num2);
	}
	
	/**
	 * source가 null이 아니면 notNull값을 반환하고, null이면 whenNull값을 반환합니다.
	 * @param source
	 * @param notNull
	 * @param whenNull
	 * @return
	 */
	public static String ifNull(String source, String notNull, String whenNull)
	{
		if (source != null)
			return notNull;
		
		return whenNull;
	}
	
	
	/**
	 * source가 빈 문자열('')이거나 'null', '(null)' 문자열인 경우 null을 반환하고, 아닐 경우에는 source를 반환합니다.
	 * @param source
	 * @return
	 */
	public static String checkNull(String source)
	{
		if (source == null)
			return null;
		
		String tmp = source.toLowerCase();
		if (tmp.equals("null") || tmp.equals("(null)") || tmp.equals(""))
			return null;
		
		return source;
	}
	
	
	/**
	 * source의 길이를 반환합니다. 만약 source가 null일 경우 0을 반환합니다.
	 * @param source
	 * @return
	 */
	public static int getLength(String source)
	{
		if (source == null)
			return 0;
		
		return source.length();
	}
	
	
	/**
	 * length 길이만큼의 임의 문자열을 생성하여 반환합니다.
	 * @param length
	 * @return
	 */
	public static String getRandomString(int length)
	{
		char[] charaters = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
				's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
		StringBuffer sb = new StringBuffer();
		Random rn = new Random();
		
		for (int i = 0; i < length; i++)
			sb.append(charaters[rn.nextInt(charaters.length)]);
		return sb.toString();
	}
	
	
	/**
	 * source가 정수형인지 여부를 확인합니다.
	 * @param source
	 * @return
	 */
	public static Boolean isNumberic(String source)
	{
		try
		{
			Long.parseLong(source);
			return true;
		}
		catch (Exception e)
		{
			return false;
		}
	}
	
	
	/**
	 * source가 실수형(float)인지 여부를 확인합니다.
	 * @param source
	 * @return
	 */
	public static Boolean isFloat(String source)
	{
		try
		{
			Float.parseFloat(source);
			return true;
		}
		catch (Exception e)
		{
			return false;
		}
	}
	
	
	/**
	 * source가 실수형(double)인지 여부를 확인합니다.
	 * @param source
	 * @return
	 */
	public static Boolean isDouble(String source)
	{
		try
		{
			Double.parseDouble(source);
			return true;
		}
		catch (Exception e)
		{
			return false;
		}
	}
	
	
	/**
	 * source 문자열을 Integer형으로 변환합니다. 만약 문자열이 Integer타입이 아닌 경우 defaultValue를 반환합니다.
	 * @param source
	 * @param defaultValue
	 * @return
	 */
	public static Boolean toBoolean(String source, Boolean defaultValue)
	{
		try
		{
			source = source.trim();
			if (source.equals("true")
					|| source.equals("1")
					|| source.equals("yes")) {
				return true;
			}
			
			return false;
		}
		catch (Exception e)
		{
			return defaultValue;
		}
	}
	
	
	/**
	 * source 문자열을 Integer형으로 변환합니다. 만약 문자열이 Integer타입이 아닌 경우 defaultValue를 반환합니다.
	 * @param source
	 * @param defaultValue
	 * @return
	 */
	public static Integer toInteger(String source, Integer defaultValue)
	{
		try
		{
			return Integer.parseInt(source);
		}
		catch (Exception e)
		{
			return defaultValue;
		}
	}
	
	
	/**
	 * source 문자열을 Long형으로 변환합니다. 만약 문자열이 Long타입이 아닌 경우 defaultValue를 반환합니다.
	 * @param source
	 * @param defaultValue
	 * @return
	 */
	public static Long toLong(String source, Long defaultValue)
	{
		try
		{
			return Long.parseLong(source);
		}
		catch (Exception e)
		{
			return defaultValue;
		}
	}
	
	
	/**
	 * source 문자열을 Float형으로 변환합니다. 만약 문자열이 Float타입이 아닌 경우 defaultValue를 반환합니다.
	 * @param source
	 * @param defaultValue
	 * @return
	 */
	public static Float toFloat(String source, Float defaultValue)
	{
		try
		{
			return Float.parseFloat(source);
		}
		catch (Exception e)
		{
			return defaultValue;
		}
	}
	
	
	/**
	 * source 문자열을 Double형으로 변환합니다. 만약 문자열이 Double타입이 아닌 경우 defaultValue를 반환합니다.
	 * @param source
	 * @param defaultValue
	 * @return
	 */
	public static Double toDouble(String source, Double defaultValue)
	{
		try
		{
			return Double.parseDouble(source);
		}
		catch (Exception e)
		{
			return defaultValue;
		}
	}
	
	
	/**
	 * 현재년월일시간을 문자열로 변환 출력
	 * @return
	 */
	public static String getTimestamp() {
		String rtnStr = null;
		
		// 문자열로 변환하기 위한 패턴 설정(년도-월-일 시:분:초:초(자정이후 초))
		String pattern = "yyyyMMddhhmmssSSS";
		SimpleDateFormat sdfCurrent = new SimpleDateFormat(pattern, Locale.KOREA);
		Timestamp ts = new Timestamp(System.currentTimeMillis());
		rtnStr = sdfCurrent.format(ts.getTime());
		return rtnStr;
	}
	
	
	public static List<String> convertStringList(String source, String regex)
	{
		List<String> result = new ArrayList<String>();
		String[] split = source.split(regex);
		for (String item : split)
			result.add(item);
		
		return result;
	}
	
	
	public static List<Integer> convertIntegerList(String source, String regex)
	{
		List<Integer> result = new ArrayList<Integer>();
		String[] split = source.split(regex);
		for (String item : split)
		{
			try
			{
				result.add(Integer.parseInt(item));
			}
			catch (Exception e)
			{
			}
		}
		
		return result;
	}
	
	
	/**
	 * 숫자 to 전화번호형식으로 변환
	 * @param num
	 * @param mask
	 * @return
	 */
	public static String formatPhoneNumber(String num, String mask) {

	    String formatNum = "";
	    if (ifNull(num, "").equals("")) return formatNum;
	    num = num.replaceAll("-","");

	    if (num.length() == 11) {
	        if (mask.equals("Y")) {
	            formatNum = num.replaceAll("(\\d{3})(\\d{3,4})(\\d{4})", "$1-****-$3");
	        }else{
	            formatNum = num.replaceAll("(\\d{3})(\\d{3,4})(\\d{4})", "$1-$2-$3");
	        }
	    }else if(num.length()==8){
	        formatNum = num.replaceAll("(\\d{4})(\\d{4})", "$1-$2");
	    }else{
	        if(num.indexOf("02")==0){
	            if(mask.equals("Y")){
	                formatNum = num.replaceAll("(\\d{2})(\\d{3,4})(\\d{4})", "$1-****-$3");
	            }else{
	                formatNum = num.replaceAll("(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3");
	            }
	        }else{
	            if(mask.equals("Y")){
	                formatNum = num.replaceAll("(\\d{3})(\\d{3,4})(\\d{4})", "$1-****-$3");
	            }else{
	                formatNum = num.replaceAll("(\\d{3})(\\d{3,4})(\\d{4})", "$1-$2-$3");
	            }
	        }
	    }
	    return formatNum;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////
	//  정규식
	public static final String RegEx_Number = "^[0-9]*$";
	public static final String RegEx_Alphabet = "^[a-zA-Z]*$";
	public static final String RegEx_Korean = "^[가-힣]*$";
	public static final String RegEx_AlphabetAndNumber = "^[a-zA-Z0-9]*$";
	public static final String RegEx_EMail = "^[a-zA-Z0-9]+@[a-zA-Z0-9]+$";
	public static final String RegEx_MobilePhone = "^01(?:0|1|[6-9]) - (?:\\d{3}|\\d{4}) - \\d{4}$";
	public static final String RegEx_Phone = "^\\d{2.3} - \\d{3,4} - \\d{4}$";
	public static final String RegEx_ResidentNumber = "\\d{6} \\- [1-4]\\d{6}";
	public static final String RegEx_IPAddress = "([0-9]{1,3}) \\. ([0-9]{1,3}) \\. ([0-9]{1,3}) \\. ([0-9]{1,3})\r\n";
	
	/**
	 * source가 정규식(pattern)에 부합하는지 여부를 확인합니다.
	 * @param pattern
	 * StringUtil.RegEx_ 에 자주 사용하는 정규식이 정의되어있습니다.
	 * @param source
	 * @return
	 */
	public static Boolean checkRegEx(String pattern, String source)
	{
		return Pattern.matches(pattern, source);
	}
	
	
	public static Boolean isMatchUriRegEx(String pattern, String uri)
	{
		pattern = "^" + pattern;								//  RegEx 시작문자
    	pattern = pattern.replaceAll("[*][*]", ".+");			//  ** 을 .+으로 변환 (one or more)
    	pattern = pattern.replaceAll("[*]", ".*");				//  * 을 .*으로 변환 (zero or more)
    	pattern = pattern.replaceAll("\\/", "\\\\/");			//  / 를 \/로 변환
    	pattern = pattern + "(\\/*)";							//  마지막에 / 로 끝나는 것 포함

		return StringHelper.checkRegEx(pattern, uri);
	}
}
