<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<!-- -------------------------------------------------------------------------------------------------------------- -->

<html lang="ko">

	<head>
		<%@ include file="/WEB-INF/jsp/cms/layout/default_head.jsp" %>
		
		<title></title>
		<script type="text/javascript" src="/cms/js/lecture/list.js"></script>
		<script type="text/javascript">
		/*<![CDATA[*/
			var pageData = [[${pageData}]];
			waffle.pagination.requestData = pageData.pagination.requestData;
			waffle.pagination.responseData = pageData.pagination.responseData;
			
			$(document).ready(function(){
				view.init();
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
								<a href="#">Lecture</a>
							</li>
							<li class="fa-circle">
								<span>Lectures</span>
							</li>
						</ul>
					</div>
					<!--// page-location e -->	
				   	<!-- page-title s -->
					<h2 class="page-title">Lecture Management</h2>
					<!--// page-title e -->
					<!-- page-content-body s -->
					<div class="page-content-body">
						<div class="table_wrapper type01">
							<table>
								<colgroup>
									<col width="200px" />
									<col width="*" />
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">검색어</th>
										<td colspan="3"><input type="text" class="form-text" id="ui_searchWord"/></td>
									</tr>
									<tr>
										<th scope="row">분류</th>
										<td colspan="3">
											<select class="form-select" id="ui_category"></select>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
	
						<div class="btn_wrapper ta_c mg_b40">
							<button type="button" class="btn default" id="ui_reset_btn">초기화</button>
							<!-- <button type="button" class="btn blue" id="ui_search_btn">검색</button> -->
							<button type="button" class="btn blue" onclick="location.href='/cms/lecture/detail'">검색</button>
						</div>
	
						<div class="table_top_wrapper">
							<div class="table_top_left">
								<p>전체: <span id="ui_result_count">0</span></p>
							</div>
						</div>
						<div class="table_wrapper type01 ta_c">
							<table>
								<thead>
									<tr>
										<th class="none"><input type="checkbox" id="ui_all_check" width="5%" /></th>
										<th scope="col">Idx</th>
										<th scope="col">Category</th>
										<th scope="col">순서</th>
										<th scope="col">제목</th>
										<th scope="col">Visible</th>
										<th scope="col">등록일</th>
										<th scope="col">작업</th>
									</tr>
								</thead>
								<tbody id="ui_table_body">
								</tbody>
							</table>
						</div>
	
						<button type="button" class="btn blue" id="ui_insertItem_btn">신규 등록</button>
						<button type="button" class="btn gray" id="ui_deleteItems_btn">선택 삭제</button>
						
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