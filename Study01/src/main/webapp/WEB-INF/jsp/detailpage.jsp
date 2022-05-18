<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<!-- -------------------------------------------------------------------------------------------------------------- -->

<html>
	
	<body>
		<br/>
		<button> <a onclick="href='/'"> 전체 목록 </a> </button>

		<br/><br/>
		
		<table id="postDetailTitle" border="1" width="480">
		
			<th style="width:25%"> 구분 </th>
			<th style="width:75%"> 상세 내용 </th>

			<tbody id="postDetail">
				<tr>
					<td> idx </td>
					<td> idx </td>
				</tr>
				<tr>
					<td> title </td>
					<td> title </td>
				</tr>
				<tr>
					<td> content </td>
					<td> content </td>
				</tr>
				<tr>
					<td> writer </td>
					<td> writer </td>
				</tr>
				<tr>
					<td> regdate </td>
					<td> regdate </td>
				</tr>
			</tbody>

		</table>
		
		<br/><br/>
		<button> <a onclick='moveModifyPage()'> 게시글 수정하기 </a> </button>
		
	</body>

	
<!-- -------------------------------------------------------------------------------------------------------------- -->

	
	<script type="text/javascript">
	
		// idx 확인
		var idx = getUrlParam("idx");
		
		postDetailView(idx);


<!-- -------------------------------------------------------------------------------------------------------------- -->


	// 게시글 상세 내용 출력.
	function postDetailView(_idx) {

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
		
		$("#postDetail").empty();
		
		var html = $("#postDetail").html();
	
		html += "<tr>"
				+ "<td> idx </td>"
				+ "<td> " + detailData.idx + " </td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td> title </td>"
				+ "<td> " + detailData.title + " </td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td> content </td>"
				+ "<td> " + detailData.content + " </td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td> writer </td>"
				+ "<td> " + detailData.writer + " </td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td> regdate </td>"
				+ "<td> " + detailData.regdate.replace('T',' ').substring(0, 19) + " </td>"
				+ "</tr>";
		
		$("#postDetail").html(html);
		
	}
	
	
<!-- -------------------------------------------------------------------------------------------------------------- -->


	// 하단 버튼 - 수정 페이지로 이동.
	function moveModifyPage() {
	
		var idx = getUrlParam("idx");
		
		location.href="/modifypage?idx=" + idx ;	
	}


<!-- -------------------------------------------------------------------------------------------------------------- -->


	// url 파라미터 찾기
	function getUrlParam(targetName) {
	    var params = location.search.substr(location.search.indexOf("?") + 1);
	    params = params.split("&");
	    
	    var targetValue = "";
	
	    for (var i = 0; i < params.length; i++) {
	        temp = params[i].split("=");
	        if ([temp[0]] == targetName) {
	        	targetValue = temp[1];
	        }
	    }
	
	    return targetValue;

	}
	

<!-- -------------------------------------------------------------------------------------------------------------- -->

		
	</script>

</html>