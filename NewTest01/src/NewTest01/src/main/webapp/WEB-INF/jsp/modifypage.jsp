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
	
		<br/> 수정 페이지 <br/><br/>
		<button> <a onclick="href='/'"> 전체 목록 </a> </button>

		<br/><br/>
		
		<table id="boardModifyTitle" border="1" width="480">
		
			<th style="width:25%"> 구분 </th>
			<th style="width:75%"> 상세 내용 </th>

			<tbody id="boardModify">
				<tr>
					<td> idx </td>
					<td> <text id="input_idx" style="width:99%; border:0; resize:none;"> idx </text> </td>
				</tr>
				<tr>
					<td> title </td>
					<td> <textarea id="input_title" style="width:99%; border:0; resize:none;"> title </textarea> </td>
				</tr>
				<tr>
					<td> content </td>
					<td> <textarea id="input_content" style="width:99%; height:100px; border:0; resize:none;"> content </textarea> </td>
				</tr>
				<tr>
					<td> writer </td>
					<td> <text id="input_writer" style="width:99%; border:0; resize:none;"> writer </text> </td>
				</tr>
				<tr>
					<td> regdate </td>
					<td> <text id="input_regdate" style="width:99%; border:0; resize:none;"> regdate </text> </td>
				</tr>
			</tbody>

		</table>
		
		<br/><br/>
		<button> <a onclick="inputDataCheck()"> 게시글 수정!! </a> </button>
		
	</body>

	
<!-- -------------------------------------------------------------------------------------------------------------- -->

	
	<script type="text/javascript">
	
		// 대상 idx 확인
		var idx = getUrlParam("idx");
		
		// 수정 페이지 호출.
		boardModifyRefresh(idx);

<!-- -------------------------------------------------------------------------------------------------------------- -->


	// 데이터 변경 확인.
	// 변경 데이터 적용.
	function inputDataCheck() {
	
		if (document.getElementById("input_title").value == detailData.title && document.getElementById("input_content").value == detailData.content){
			alert("변경된 내용이 없습니다.");
			return;
			
		} else{
			
			_idx = document.getElementById("input_idx").innerText;
			_title = document.getElementById("input_title").value;
			_content = document.getElementById("input_content").value;
			_regdate = new Date().toISOString().slice(0, 19).replace('T',' ');
					
			$.ajax({
						type: "POST",
						url: "http://localhost:8080/api/modifydetaildata",
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


	// 수정 페이지 출력.
	function boardModifyRefresh(_idx) {

		$.ajax({
					type: "GET",
					url: "http://localhost:8080/api/getdetaildata",
					cache: false,
					async: false,
					data: {
						idx : _idx
					},
					success: function (result) {
                        detailData = result;
					}
				
		});		
		
		document.getElementById("input_idx").innerText = detailData.idx;
		document.getElementById("input_title").value = detailData.title;
		document.getElementById("input_content").value = detailData.content;
		document.getElementById("input_writer").innerText = detailData.writer;
		document.getElementById("input_regdate").innerText = detailData.regdate.replace('T',' ').substring(0, 19);
				
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