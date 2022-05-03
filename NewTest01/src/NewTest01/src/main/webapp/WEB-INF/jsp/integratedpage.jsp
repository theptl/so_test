<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>


<!-- -------------------------------------------------------------------------------------------------------------- -->


<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>


<!-- -------------------------------------------------------------------------------------------------------------- -->


<html>
	
	<body>
		<c:if test="${pageType eq 'detail' }"> 
			<br/> 상세 페이지 <br/><br/>
		</c:if>
		
		<c:if test="${pageType eq 'modify' }"> 
			<br/> 수정 페이지 <br/><br/>
		</c:if>
		
		<c:if test="${pageType eq 'create' }"> 
			<br/> 생성 페이지 <br/><br/>
		</c:if>

		<button> <a onclick="href='/'"> 전체 목록 </a> </button>

		<br/><br/>
		
		<table id="boardTitle" border="1" width="480">
		
			<th style="width:25%"> 구분 </th>
			<th style="width:75%"> 상세 내용 </th>

			<tbody id="boardContent">
				<tr>
					<td> idx </td>
					<c:if test="${pageType eq 'create' }"> 
						<td> <text id="input_idx" style="width:99%; border:0; resize:none;"> idx </text> </td>
					</c:if>
					<c:if test="${pageType eq 'detail' }"> 
						<td> idx </td>
					</c:if>
					<c:if test="${pageType eq 'modify' }"> 
						<td> <text id="input_idx" style="width:99%; border:0; resize:none;"> idx </text> </td>
					</c:if>
				</tr>
				<tr>
					<td> title </td>
					<c:if test="${pageType eq 'create' }"> 
						<td> <textarea id="input_title" style="width:99%; border:0; resize:none;" placeholder="제목을 입력하세요."></textarea> </td>
					</c:if>
					<c:if test="${pageType eq 'detail' }"> 
						<td> title </td>
					</c:if>
					<c:if test="${pageType eq 'modify' }"> 
						<td> <textarea id="input_title" style="width:99%; border:0; resize:none;"> title </textarea> </td>
					</c:if>
				</tr>
				<tr>
					<td> content </td>
					<c:if test="${pageType eq 'create' }"> 
						<td> <textarea id="input_content" style="width:99%; height:100px; border:0; resize:none;" placeholder="내용을 입력하세요."></textarea> </td>
					</c:if>
					<c:if test="${pageType eq 'detail' }"> 
						<td> content </td>
					</c:if>
					<c:if test="${pageType eq 'modify' }"> 
						<td> <textarea id="input_content" style="width:99%; height:100px; border:0; resize:none;"> content </textarea> </td>
					</c:if>
				</tr>
				<tr>
					<td> writer </td>
					<c:if test="${pageType eq 'create' }"> 
						<td> <text id="input_writer" style="width:99%; border:0; resize:none;"> writer </text> </td>
					</c:if>
					<c:if test="${pageType eq 'detail' }"> 
						<td> writer </td>
					</c:if>
					<c:if test="${pageType eq 'modify' }"> 
						<td> <text id="input_writer" style="width:99%; border:0; resize:none;"> writer </text> </td>
					</c:if>
				</tr>
				<tr>
					<td> regdate </td>
					<c:if test="${pageType eq 'create' }"> 
						<td> <text id="input_regdate" style="width:99%; border:0; resize:none;"> regdate </text> </td>
					</c:if>
					<c:if test="${pageType eq 'detail' }"> 
						<td> regdate </td>
					</c:if>
					<c:if test="${pageType eq 'modify' }"> 
						<td> <text id="input_regdate" style="width:99%; border:0; resize:none;"> regdate </text> </td>
					</c:if>
				</tr>
			</tbody>

		</table>
		
		<br/><br/>
		
		<c:if test="${pageType eq 'detail' }"> 
			<button> <a onclick='moveModifyPage()'> 게시글 수정하기 </a> </button>
		</c:if>
		
		<c:if test="${pageType eq 'modify' }"> 
			<button> <a onclick="inputDataCheckModify()"> 게시글 수정!! </a> </button>
		</c:if>
		
		<c:if test="${pageType eq 'create' }"> 
			<button> <a onclick="inputDataCheckCreate()"> 게시글 생성!! </a> </button>
		</c:if>
		
	</body>

	
<!-- -------------------------------------------------------------------------------------------------------------- -->

	
	<script type="text/javascript">
	
		<c:if test="${pageType eq 'detail' }"> 
			// 대상 idx 확인
			var idx = getUrlParam("idx");		
			// 상세 페이지 호출.
			boardDetailRefresh(idx);
		</c:if>
		
		<c:if test="${pageType eq 'modify' }"> 
			// 대상 idx 확인
			var idx = getUrlParam("idx");			
			// 수정 페이지 호출.
			boardModifyRefresh(idx);
		</c:if>


<!-- -------------------------------------------------------------------------------------------------------------- -->


	// 상세 페이지 출력.
	function boardDetailRefresh(_idx) {

		$.ajax({
					type: "GET",
					url: "/api/getdetaildata",
					cache: false,
					async: false,
					data: {
						idx : _idx
					},
					success: function (result) {
                        detailData = result;
					}
				
		});
		
		//console.log(detailData);		
		
		$("#boardContent").empty();
		
		var html = $("#boardContent").html();
	
		html += "<tr>"
				+ "<td> idx </td>"
				+ "<td> " + detailData.IDX + " </td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td> title </td>"
				+ "<td> " + detailData.TITLE + " </td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td> content </td>"
				+ "<td> " + detailData.CONTENT + " </td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td> writer </td>"
				+ "<td> " + detailData.WRITER + " </td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td> regdate </td>"
				+ "<td> " + detailData.REGDATE.replace('T',' ').substring(0, 19) + " </td>"
				+ "</tr>";
			
		//console.log(html);
		
		$("#boardContent").html(html);
		
	}
	
	
<!-- -------------------------------------------------------------------------------------------------------------- -->


	// 상세 페이지 - 하단 버튼 : 수정 페이지로 이동.
	function moveModifyPage() {
	
		var idx = getUrlParam("idx");
		
		location.href="/modifypage?idx=" + idx ;	
	}


<!-- -------------------------------------------------------------------------------------------------------------- -->


	// 수정 페이지 - 데이터 변경 확인 & 수정 요청.
	function inputDataCheckModify() {
	
		if (document.getElementById("input_title").value == detailData.title && 
				document.getElementById("input_content").value == detailData.content){
			alert("변경된 내용이 없습니다.");
			return;
			
		} else{
			
			_idx = document.getElementById("input_idx").innerText;
			_title = document.getElementById("input_title").value;
			_content = document.getElementById("input_content").value;
			_regdate = new Date().toISOString().slice(0, 19).replace('T',' ');
					
			$.ajax({
						type: "POST",
						url: "/api/modifydetaildata",
						cache: false,
						async: false,
						data: {
							idx : _idx,
							title : _title,
							content : _content,
							regdate : _regdate
						}
			});
			
			boardModifyRefresh(idx);
			
			alert("수정한 내용이 적용되었습니다.");
	
		}
	
	
				
	}


<!-- -------------------------------------------------------------------------------------------------------------- -->


	// 수정 페이지 - 기존 내용 출력.
	function boardModifyRefresh(_idx) {
	
		$.ajax({
					type: "GET",
					url: "/api/getdetaildata",
					cache: false,
					async: false,
					data: {
						idx : _idx
					},
					success: function (result) {
	                    detailData = result;
					}
				
		});		
		
		document.getElementById("input_idx").innerText = detailData.IDX;
		document.getElementById("input_title").value = detailData.TITLE;
		document.getElementById("input_content").value = detailData.CONTENT;
		document.getElementById("input_writer").innerText = detailData.WRITER;
		document.getElementById("input_regdate").innerText = detailData.REGDATE.replace('T',' ').substring(0, 19);
				
	}


<!-- -------------------------------------------------------------------------------------------------------------- -->


	// 데이터 입력 확인 & 데이터 생성.
	function inputDataCheckCreate() {

		if (document.getElementById("input_title").value == "" || 
				document.getElementById("input_content").value == ""){
			alert("제목과 내용을 모두 입력하세요.");
			return;
			
		} else{
			
			_title = document.getElementById("input_title").value;
			_content = document.getElementById("input_content").value;
			_writer = document.getElementById("input_writer").innerText;
			_regdate = new Date().toISOString().slice(0, 19).replace('T',' ');
			
			$.ajax({
						type: "POST",
						url: "/api/createdetaildata",
						cache: false,
						async: false,
						data: {
							title : _title,
							content : _content,
							writer : _writer,
							regdate : _regdate
						}
			});
			
			alert("작성한 내용이 등록되었습니다.");
			location.href="/";
		}
		
	}


<!-- -------------------------------------------------------------------------------------------------------------- -->


	// url 포함된 파라미터 가져오기
	function getUrlParam(targetName) {
	    var params = location.search.substr(location.search.indexOf("?") + 1);
	    params = params.split("&");
	    //console.log(params);
	    
	    var targetValue = "";
	
	    for (var i = 0; i < params.length; i++) {
	        temp = params[i].split("=");
	        //console.log(temp);
	        if ([temp[0]] == targetName) { targetValue = temp[1]; }
	    }
	
	    return targetValue;

	}
	

<!-- -------------------------------------------------------------------------------------------------------------- -->

		
	</script>

</html>