<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<!-- -------------------------------------------------------------------------------------------------------------- -->

<html lang="ko">

	<head>
		<%@ include file="/WEB-INF/jsp/cms/layout/default_head.jsp" %>
		
		<title></title>
		
		<!-- jQuery DateTimePicker -->
		<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		
		<script type="text/javascript" src="/cms/js/board/contact.js"></script>
		<script type="text/javascript" th:inline="javascript">
		/*<![CDATA[*/
			var pageData = [[${pageData}]];
			waffle.pagination.requestData = pageData.pagination.requestData;
			waffle.pagination.responseData = pageData.pagination.responseData;
			
			$(document).ready(function(){
				view.initListView();
			});
		/*]]>*/
		</script>
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
				<section id="sub_section" class="page-content" layout:fragment="contentFragment">				
					<!-- page-location s -->
					<div class="page-location">
						<ul class="page-breadcrumb">
							<li>
								<a href="#">Home</a>
							</li>
							<li class="fa-circle">
								<a href="#">Board</a>
							</li>
							<li class="fa-circle">
								<span>Contact</span>
							</li>
						</ul>
					</div>
					<!--// page-location e -->	
				   	<!-- page-title s -->
					<h2 class="page-title">
						Contact
						<button type="button" class="btn blue" onclick="location.href='/cms/board/contactDetail'"> Detail </button>
					</h2>
					
					<!--// page-title e -->
					<!-- page-content-body s -->
					<div class="page-content-body">
						<div class="table_top_wrapper">
							<div class="table_top_left">
								<p>전체: <span id="ui_result_count">0</span></p>
							</div>
						</div>
						<div class="table_wrapper type01 ta_c">
							<table>
								<colgroup>
									<col width="100px" />
									<col width="*" />
									<col width="*" />
									<col width="200px" />
									<col width="200px" />
								</colgroup>
								<thead>
									<tr>
										<th scope="col">Idx</th>
										<th scope="col">이름</th>
										<th scope="col">메세지</th>
										<th scope="col">등록일</th>
										<th scope="col">기능</th>
									</tr>
								</thead>
								<tbody id="ui_table_body">
								</tbody>
							</table>
						</div>
	
						<!-- pager -->
						<div class="dataTables_paginate">
							<ul class="pagination" id="ui_pager">
							</ul>
						</div>
					</div>
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