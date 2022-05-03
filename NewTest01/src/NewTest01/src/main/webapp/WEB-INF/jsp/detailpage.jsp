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
	
		<br/> 상세 페이지 <br/><br/>
		<button> <a onclick="href='/'"> 전체 목록 </a> </button>

		<br/><br/>
		
		<table id="boardDetailTitle" border="1" width="480">
		
			<th style="width:25%"> 구분 </th>
			<th style="width:75%"> 상세 내용 </th>

			<tbody id="boardDetail">
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
	
		// 대상 idx 확인
		var idx = getUrlParam("idx");
		
		// 상세 페이지 호출.
		boardDetailRefresh(idx);


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
		
		$("#boardDetail").empty();
		
		var html = $("#boardDetail").html();
	
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
		
		$("#boardDetail").html(html);
		
	}
	
	
<!-- -------------------------------------------------------------------------------------------------------------- -->


	// 하단 버튼 - 수정 페이지로 이동.
	function moveModifyPage() {
	
		var idx = getUrlParam("idx");
		
		location.href="/modifypage?idx=" + idx ;	
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