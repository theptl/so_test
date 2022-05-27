<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<!-- -------------------------------------------------------------------------------------------------------------- -->

<html lang="ko">

	<head>
		<%@ include file="/WEB-INF/jsp/cms/layout/default_head.jsp" %>
		
		<title></title>
		
		<script type="text/javascript" src="/cms/js/board/contact.js"></script>
		<script type="text/javascript" th:inline="javascript">
		/*<![CDATA[*/
			var pageData = [[${pageData}]];
			
			$(document).ready(function(){
				view.initDetailView();
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
					<h2 class="page-title">Contact</h2>
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
										<th scope="row">Idx</th>
										<td><span id="ui_idx">-</span></td>
										<th scope="row">이름</th>
										<td><span id="ui_name"></span></td>
									</tr>
									<tr>
										<th scope="row">Email</th>
										<td><span id="ui_email"></span></td>
										<th scope="row">등록일</th>
										<td><span id="ui_regDate"></span></td>
									</tr>
									<tr>
										<th scope="row">내용</th>
										<td colspan="3"><textarea class="form_textarea" id="ui_message" rows="10" readonly></textarea></td>
									</tr>
								</tbody>
							</table>
						</div>
	
						<div class="btn_wrapper ta_c mg_b40">
							<button type="button" class="btn blue" id="ui_list_btn" onclick="location.href='/cms/board/contact';">목록</button>
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