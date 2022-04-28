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
	
		<br/> 시작 페이지 - GET URL 방식
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		<button onclick=location.href='/';> Ajax 방식 페이지로 이동 </button>
		<br/><br/><br/><br/>
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		<button onclick='ListDel()'> 선택 삭제 </button>
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		<button onclick=location.href='/createpage';> 게시글 작성하기 </button>
		<br/><br/>
		
		<table id="boardListTitle" border="1" width="800">
		
			<th style="width:5%"> <input type='checkbox' name='thCheck' value='thCheckCondition' onclick='ChangeCheck(this)' /> </th>
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
		<div>
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
			<button id="pagePrev" onclick="BoardPagingRefreshPrev()"> << </button>
			<button id="startPageNo"> --- </button>
			<button> --- </button>
			<button id="pageNo"> Num </button>
			<button> --- </button>
			<button id="endPageNo"> --- </button>
			<button id="pageNext" onclick="BoardPagingRefreshNext()"> >> </button>
		</div>
		<br/>
		<div>
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
			<input type="text" id="searchwordInput" placeholder="    제목 & 내용 통합 검색">
			<button id="searchBtn" onclick="Search();"> 검색하기 </button>
		</div>
		
		<br/>
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		<button id="pageNoLog"> pageNo </button>
		<button id="searchwordLog"> searchword </button>

		
	</body>
	
<!-- -------------------------------------------------------------------------------------------------------------- -->

	
	<script type="text/javascript">

		document.getElementById("startPageNo").innerText = "${pagingData.viewStartPage}";
		document.getElementById("pageNo").innerText = "${pagingData.pageNo}";
		document.getElementById("endPageNo").innerText = "${pagingData.viewEndPage}";
		
		document.getElementById("pageNoLog").innerText = "pageNo = [ " + ${pagingData.pageNo} + " ]";
		document.getElementById("searchwordLog").innerText = "searchword = [ " + ${pagingData.searchword} + " ]";
		
		var boardListData = [];

		<c:forEach items="${boardListData}" var="item">
		
			var data = {
				idx : "${item.idx}",
				title : "${item.title}",
				content : "${item.content}",
				writer : "${item.writer}",
				regdate : "${item.regdate}"
			};
			
			boardListData.push(data);
			
		</c:forEach>

		BoardListRefresh(boardListData);		

		
<!-- -------------------------------------------------------------------------------------------------------------- -->
		
		
		function BoardPagingRefreshPrev() {
			
			_pageNo = Number(document.getElementById("pageNo").innerText) - 1;

			location.href = "/board?pageNo=" + _pageNo + "&searchword=" + "${pagingData.searchword}";
		}
		
		
<!-- -------------------------------------------------------------------------------------------------------------- -->


		function BoardPagingRefreshNext() {
			
			_pageNo = Number(document.getElementById("pageNo").innerText) + 1;
			
			if(_pageNo > "${pagingData.lastPage}") {
				_pageNo = "${pagingData.lastPage}"				
			}

			location.href = "/board?pageNo=" + _pageNo + "&searchword=" + "${pagingData.searchword}";
		}


<!-- -------------------------------------------------------------------------------------------------------------- -->


		function Search() {
			
			_searchword = document.getElementById("searchwordInput").value;	
			
			_pageNo = 1;
			
			location.href = "/board?pageNo=" + _pageNo + "&searchword=" + _searchword;
		}


<!-- -------------------------------------------------------------------------------------------------------------- -->


	// 게시글 목록 출력/갱신.
	function BoardListRefresh(boardListData) {
		
		$("#boardList").empty();
		
		var html = $("#boardList").html();
		
		$.each(boardListData, function(index, item){
		
			html += "<tr>"
					+ "<td> <input type='checkbox' name='tdCheck' data-idx='" + item.idx + "' value='" + item.idx + "' /> </td>"
					+ "<td>" + item.idx + "</td>"
					+ "<td>" + item.title + "</td>"
					+ "<td> <a href='/detailpage?idx=" + item.idx + "';'>" + item.content + "</td>"
					+ "<td>" + item.writer + "</td>"
					+ "<td>" + item.regdate.replace('T',' ').substring(0, 19) + "</td>"
					+ "<td> <button onclick=" + "location.href='/modifypage?idx=" + item.idx + "';>" + "바로가기 </button> </td>"
					+ "</tr>";
		})
		
		$("#boardList").html(html);
		
	}


<!-- -------------------------------------------------------------------------------------------------------------- -->


	// 선택한 게시글 삭제
	function ListDel() {

		var _delIdx = ""
	
		$("input[name='tdCheck']").each(function(){

			if( $(this).is(":checked") == true ){
			
				if(_delIdx != ""){
					_delIdx = _delIdx + ","
				}
				
				var temp = $(this).data("idx") ;
				_delIdx = _delIdx + temp;
				
			}
		});
		
		if(_delIdx != ""){
			
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
						delIdx : _delIdx
					}	
		});
		
		boardListRefresh("idx", "1");
		
		alert("선택한 게시글이 삭제되었습니다.");
		
	}

	
<!-- -------------------------------------------------------------------------------------------------------------- -->

	// 체크박스 전체 선택/취소
	function ChangeCheck(thCheck) {
	
		const tdCheckbox = document.getElementsByName('tdCheck');

		tdCheckbox.forEach(function(checkbox){
 			checkbox.checked = thCheck.checked;
		});

	}


<!-- -------------------------------------------------------------------------------------------------------------- -->

		
	// 상세 페이지로 이동	
	function Onclick_MoveDetail(idx) {
	
		location.href = '/detailpage?idx=' + idx;
		
	}


<!-- -------------------------------------------------------------------------------------------------------------- -->


	function getURIParam(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}


<!-- -------------------------------------------------------------------------------------------------------------- -->

		
	</script>

</html>