<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<!-- -------------------------------------------------------------------------------------------------------------- -->

<html lang="ko">

	<head>
		<meta charset="utf-8"/>
		<title>NTSphere CMS</title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<meta property="og:type" content="website"/>
		<meta property="og:title" content=""/>
		<meta property="og:url" content=""/>
		<meta property="og:image" content=""/>
		<meta property="og:description" content=""/>
		<meta name="description" content=""/>
		<link rel="shortcut icon" href="" type="image/x-icon"/>
	 
		<script src="https://code.jquery.com/jquery-3.4.1.min.js"
				integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
				crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"></script>
	
		<link rel="stylesheet" type="text/css" href="/cms/css/ui.common.css"/>
		<link rel="stylesheet" type="text/css" href="/cms/css/ui.import.css"/>
		
		<script type="text/javascript" src="/common/waffle/waffle.common.js"></script>
		<script type="text/javascript" src="/common/waffle/waffle.jwt.js"></script>
	</head>

<!-- -------------------------------------------------------------------------------------------------------------- -->
	
	<body id="login_wrapper">
	
		<div class="logo">
		    <a href="index.html">
		        <img src="/cms/images/common/logo.png" width="200px" alt="" />
		    </a>
		</div>
		
		<div class="login_content">
		    <h3>NTSphere CMS</h3>
		    <div class="form-group">
		        <input type="text" class="form-text" placeholder="아이디" id="userId" th:value="${testId}"/>
		    </div>
		    <div class="form-group">
		        <input type="password" class="form-text" placeholder="비밀번호" id="password" th:value="${testPwd}"/>
		    </div>
		
		    <button type="button" class="btn_login" onclick="location.href='/cms/dashboard'">로그인</button>
		
		    <p>
		        본 시스템은 등록된 관리자에 한하여 사용하실 수 있습니다.<br />
		        불법적인 접근 및 사용 시 관련 법규에 의해 처벌 될 수 있습니다.
		    </p>
		</div>
		<div class="copyright">© 2020. NTSphere All rights reserved.</div>
	
	
		<script type="text/javascript">
		var login = {
				init : function(){
					$("#userId, #password").keydown(function(e){
						if (e.keyCode == 13){
							login.doLogin();	
						}
					});
					$("#ui_login_btn").on("click", function(){
						login.doLogin();	
					});
					
					$("#userId").focus();
				},
				doLogin : function(){
					var param = {
						userId: $("#userId").val(),
				   		password: $("#password").val()
					};
		
					$.ajax({
				        type: "POST",
				        url: "/cms/doLogin",
				        data : param,
				        async: false,
				        cache: false,
				        success: function (result) {
				        	var token = result.data.authToken;
				        	$.setCookie('authToken', token, 60 * 60 * 24);
		
				        	location.href = "/cms";
				        },
				        error: function (xhr, ajaxOptions, thrownError) {
				        	var json = JSON.parse(xhr.responseText);
				        	alert("인증에 실패하였습니다.\n(" + json.message + ")");
				        }
				    });
				}
			}
		
		
		$(document).ready(function () {
			login.init();
		});
		</script>
	</body>
	
</html>