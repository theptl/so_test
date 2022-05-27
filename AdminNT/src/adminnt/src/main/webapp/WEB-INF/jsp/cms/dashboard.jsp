<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<!-- -------------------------------------------------------------------------------------------------------------- -->

<html lang="ko">

	<head>
		<%@ include file="/WEB-INF/jsp/cms/layout/default_head.jsp" %>
	</head>

<!-- -------------------------------------------------------------------------------------------------------------- -->
	
	<body>

		<div id="header">
			<%@ include file="/WEB-INF/jsp/cms/layout/default_header.jsp" %>
		</div>

<!-- -------------------------------------------------------------------------------------------------------------- -->

		<!-- content s -->		
		<div id="content">
		
			<!-- page-sidebar s -->
			<%@ include file="/WEB-INF/jsp/cms/layout/fragments/lnb.jsp" %>
			<!--// page-sidebar e -->
			
			<!-- page-content-wrapper s -->
			<div id="page-content-wrapper">
			
				<!-- page-content s -->
				<section id="sub_section" class="page-content">
						
					<!-- page-content s -->
					Dashboard
					<!--// page-content e -->
					
				</section>
				<!--// page-content e -->
				
			</div>
			<!--// page-content-wrapper e -->
			
		</div>
		<!--// content e -->
		
<!-- -------------------------------------------------------------------------------------------------------------- -->
		
		<footer>
		<%@ include file="/WEB-INF/jsp/cms/layout/default_footer.jsp" %>
		</footer>

	</body>

	
</html>