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
	
		<br/> 시작 페이지 <br/><br/>
		<button onclick='listDel()'> 선택 삭제 </button>
		
		<br/><br/>
		
		<table id="boardListTitle" border="1" width="800">
		
			<th style="width:5%"> <input type='checkbox' name='thCheck' value='thCheckCondition' onclick='changeCheck(this)' /> </th>
			<th style="width:5%"> idx </th>
			<th style="width:15%"> 제목 </th>
			<th style="width:35%"> 내용 </th>
			<th style="width:10%"> 작성자 </th>
			<th style="width:15%"> 수정일 </th>
			<th style="width:15%"> 내용 수정 </th>

			<tbody id="boardList">
				<tr>
					<td> checkbox </td>
					<td> idx </td>
					<td> title </td>
					<td> content </td>
					<td> writer </td>
					<td> regdate </td>
					<td> moidfy </td>
				</tr>
			</tbody>
				
		</table>
		
		<br/> 
		<button style='left:500px;' onclick=location.href='./createpage';> 게시글 작성하기 </button>
		
	</body>

	
<!-- -------------------------------------------------------------------------------------------------------------- -->

	
	<script type="text/javascript">
	
		// 페이지 로딩 시, 게시글 목록 출력 함수 출력.
		boardListRefresh("idx");
		
		
<!-- -------------------------------------------------------------------------------------------------------------- -->

	// 선택한 게시글 삭제
	function listDel() {

		var _delidx = ""
	
		$("input[name='tdCheck']").each(function(){

			if( $(this).is(":checked") == true ){
			
				if(_delidx != ""){
					_delidx = _delidx + ","
				}
				
				var temp = $(this).data("idx") ;
				_delidx = _delidx + temp;
				
			}
		});
		
		if(_delidx != ""){
			//console.log(_delidx);
			
			var DelData = confirm("선택하신 게시글을 삭제하시겠습니까?");
			
			if (DelData == false) {
				alert("게시글 삭제를 취소하셨습니다.");
				return;
			}
		}else{
			alert("삭제할 게시글이 선택되지 않았습니다.");
			return;
		}
		
		$.ajax({
					type: "PUT",
					url: "http://localhost:8080/api/delboardlist",
					cache: false,
					async: false,
					data: {
						delidx : _delidx
					}	
		});
		
		boardListRefresh("idx");
		
		alert("선택한 게시글이 삭제되었습니다.");
		
	}

	
<!-- -------------------------------------------------------------------------------------------------------------- -->

	// 체크박스 전체 선택/취소
	function changeCheck(thCheck) {
	
		const tdCheckbox = document.getElementsByName('tdCheck');

		tdCheckbox.forEach(function(checkbox){
 			checkbox.checked = thCheck.checked;
		});

	}


<!-- -------------------------------------------------------------------------------------------------------------- -->

	// 게시글 목록 출력/갱신.
	function boardListRefresh(_orderby) {

		$.ajax({
					type: "GET",
					url: "http://localhost:8080/api/getboardlist",
					cache: false,
					async: false,
					data: {
						orderby : _orderby
					},
					success: function (result) {
                        boardListData = result;
					}
				
		});
		
		//console.log(boardListData);
		
		$("#boardList").empty();
		
		var html = $("#boardList").html();
		
		$.each(boardListData, function(index, item){
		
			html += "<tr>"
					+ "<td> <input type='checkbox' name='tdCheck' data-idx='" + item.idx + "' value='" + item.idx + "' /> </td>"
					+ "<td>" + item.idx + "</td>"
					+ "<td>" + item.title + "</td>"
					+ "<td> <a href='./detailpage?idx=" + item.idx + "';'>" + item.content + "</td>"
					+ "<td>" + item.writer + "</td>"
					+ "<td>" + item.regdate.replace('T',' ').substring(0, 19) + "</td>"
					+ "<td> <button onclick=" + "location.href='./modifypage?idx=" + item.idx + "';>" + "바로가기 </button> </td>"
					+ "</tr>";
		})
		
		$("#boardList").html(html);
		
	}


<!-- -------------------------------------------------------------------------------------------------------------- -->
		
	// 상세 페이지로 이동	
	function onclick_moveDetail(idx) {
	
		location.href = '/detailpage?idx=' + idx;
		
	}


<!-- -------------------------------------------------------------------------------------------------------------- -->


		
	</script>

</html>