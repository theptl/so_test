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
	
		<br/> 생성 페이지 <br/><br/>
		<button> <a onclick="href='/'"> 전체 목록 </a> </button>

		<br/><br/>
		
		<table id="boardCreateTitle" border="1" width="480">
		
			<th style="width:25%"> 구분 </th>
			<th style="width:75%"> 상세 내용 </th>

			<tbody id="boardCreate">
				<tr>
					<td> idx </td>
					<td> <text id="input_idx" style="width:99%; border:0; resize:none;"> idx </text> </td>
				</tr>
				<tr>
					<td> title </td>
					<td> <textarea id="input_title" style="width:99%; border:0; resize:none;" placeholder="제목을 입력하세요."></textarea> </td>
				</tr>
				<tr>
					<td> content </td>
					<td> <textarea id="input_content" style="width:99%; height:100px; border:0; resize:none;" placeholder="내용을 입력하세요."></textarea> </td>
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
		<button> <a onclick="inputDataCheckCreate()"> 게시글 생성!! </a> </button>
		
		
		<iframe id="iframe1" name="iframe1" style="display:none"></iframe>		
		
		<form id="createform" action="/api/createdetaildataform" method="POST" style="display:none;" target="iframe1">
			<input name="title" type="text" value="title" />
			<input name="content" type="text" value="content" />
			<input name="writer" type="text" value="writer" />
			<input name="regdate" type="text" value="regdate" />
		</form>
		
	</body>

	
<!-- -------------------------------------------------------------------------------------------------------------- -->

	
	<script type="text/javascript">
	

<!-- -------------------------------------------------------------------------------------------------------------- -->


	// 데이터 입력 확인 & 데이터 생성.
	function inputDataCheckCreate() {
		
		if (document.getElementById("input_title").value == "" || 
				document.getElementById("input_content").value == ""){
			alert("제목과 내용을 모두 입력하세요.");
			return;
			
		} else{
			
			_writer = document.getElementById("input_writer").innerText;
			_regdate = new Date().toISOString().slice(0, 19).replace('T',' ');
			
			$("input[name=title]").val($("#input_title").val());
			$("input[name=content]").val($("#input_content").val());
			$("input[name=writer]").val(_writer);
			$("input[name=regdate]").val(_regdate);
			
//			console.log($("input[name=title]").val());
//			console.log($("input[name=content]").val());
//			console.log($("input[name=writer]").val());
//			console.log($("input[name=regdate]").val());			
			
			document.getElementById('createform').submit();
			
			alert("작성한 내용이 등록되었습니다.");
			
			location.href="/";
		}
		
	}


<!-- -------------------------------------------------------------------------------------------------------------- -->


		
	</script>

</html>