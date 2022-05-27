<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<!-- -------------------------------------------------------------------------------------------------------------- -->

<html lang="ko">

	<head>
		<%@ include file="/WEB-INF/jsp/cms/layout/default_head.jsp" %>
				
		<title></title>

		<!-- CKEditor4 -->
		<script src="https://cdn.ckeditor.com/4.8.0/standard-all/ckeditor.js"></script>
		
		<script type="text/javascript" src="/cms/js/board/articlesDetail.js"></script>
		<script type="text/javascript">
		/*<![CDATA[*/
			var pageData = [[${pageData}]];
			
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
								<a href="#">Board</a>
							</li>
							<li class="fa-circle">
								<span>Articles</span>
							</li>
						</ul>
					</div>
					<!--// page-location e -->	
				   	<!-- page-title s -->
					<h2 class="page-title">Article 관리</h2>
					<!--// page-title e -->
					<!-- page-content-body s -->
					<div class="page-content-body">
						<div class="table_wrapper type01">
							<table>
								<colgroup>
									<col width="140px" />
									<col width="*" />
									<col width="140px" />
									<col width="*" />
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">idx</th>
										<td align="center"><span id="ui_idx">신규 등록</span></td>
										
										<th scope="row">제목</th>
										<td><input type="text" class="form-text" id="ui_title"/></td>
									</tr>
									<tr>
										<th scope="row">대분류</th>
										<td><select class="form-select" id="ui_boardCode"></select></td>
										
										<th scope="row">소분류</th>
										<td><select class="form-select" id="ui_boardSubCode"></select></td>
									</tr>
									<tr>
										<th scope="row">소식일</th>
										<td colspan="3"><input type="text" class="form-text" id="ui_issueDate" readonly="readonly"/></td>
									</tr>
									<tr>
										<th scope="row">내용</th>
										<td colspan="3"><textarea id="ui_content"></textarea></td>
									</tr>
									<tr>
										<th scope="row">Thumbnail URL</th>
										<td colspan="3">
											<input type="text" class="form-text" id="ui_thumbnailUrl" style="width:93%"/>
											<button type="button" class="btn blue" id="ui_thumbnailConfirm_btn">확인</button>
											<br/>
											<img id="ui_thumbnailImage" src="" style="max-width:300px"/>
										</td>
									</tr>
									<tr>
										<th scope="row">Associate URL</th>
										<td colspan="3">
											<input type="text" class="form-text" id="ui_associateUrl" style="width:93%"/>
											<button type="button" class="btn blue" id="ui_associateLink_btn">Link</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
	
						<div class="btn_wrapper ta_c mg_b40">
							<button type="button" class="btn blue" id="ui_save_btn">저장</button>
							<button type="button" class="btn default" id="ui_cancel_btn">취소</button>
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