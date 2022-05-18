<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<!-- -------------------------------------------------------------------------------------------------------------- -->

<html>
	
	<body>
		<br/>
		<button onclick='ListDel()'> 선택 삭제 </button>
		<br/><br/>
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
			<input type="text" id="searchWordInput" placeholder="    제목 & 내용 통합 검색">
			<button id="searchBtn" onclick="Search();"> 검색하기 </button>
		</div>
		
	</body>
<!-- -------------------------------------------------------------------------------------------------------------- -->
	<script type="text/javascript">
	
	// 페이징 초기값 설정.
	_pageNo = "";
	_searchWord = "";
	
	// 메인 페이지 정보 호출. (페이징 > 게시글)
	BoardPagingRefresh(_pageNo, _searchWord);
	
	
	
	
<!-- -------------------------------------------------------------------------------------------------------------- -->

	// 페이징 정보 처리.
	function BoardPagingRefresh(_pageNo, _searchWord) {
		
		// pageNo 오류 시, 1로 고정.
		if (_pageNo == "" || _pageNo == null) {
			_pageNo = 1;
		}

		// 페이징 정보 호출.
		$.ajax({
				type: "GET",
				url: "/api/getpagingdata",
				cache: false,
				async: false,
				data: {
					pageNo : _pageNo,
					searchWord : _searchWord
				},
				success: function (result) {
                    pagingData = result;
				}
			
		});
		
		// 페이징 정보 출력. (게시글 하단 페이지 이동 버튼)
		document.getElementById("startPageNo").innerText = pagingData.viewStartPage;
		document.getElementById("pageNo").innerText = pagingData.pageNo;
		document.getElementById("endPageNo").innerText = pagingData.viewEndPage;
		
		// 게시글 출력 함수 호출.
		BoardListRefresh(pagingData.pageNo, _searchWord);
		
	}
	
<!-- -------------------------------------------------------------------------------------------------------------- -->

	// 게시글 정보 처리.
	function BoardListRefresh(_pageNo, _searchWord) {
	
		// 게시글 정보 호출.
		$.ajax({
				type: "GET",
				url: "/api/getboardlist",
				cache: false,
				async: false,
				data: {
					pageNo : _pageNo,
					searchWord : _searchWord
					
				},
				success: function (result) {
					boardListData = result;
				}
			
		});
		
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
	
	function BoardPagingRefreshPrev() {
		
		_pageNo = Number(document.getElementById("pageNo").innerText) - 1;

		BoardPagingRefresh(_pageNo, _searchWord);
	}	
	
<!-- -------------------------------------------------------------------------------------------------------------- -->

	function BoardPagingRefreshNext() {
		
		_pageNo = Number(document.getElementById("pageNo").innerText) + 1;

		BoardPagingRefresh(_pageNo, _searchWord);
	}

<!-- -------------------------------------------------------------------------------------------------------------- -->

	function Search() {
		
		_searchWord = document.getElementById("searchWordInput").value;	
		
		_pageNo = 1;
		
		BoardPagingRefresh(_pageNo, _searchWord);
	}

<!-- -------------------------------------------------------------------------------------------------------------- -->
	</script>

</html>