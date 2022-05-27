
(function() {
	
	var pagination = waffle.on("pagination");
	
	
	
	
	
	pagination.requestData = {
		pageNo: 1,
		itemCountPerPage: 10,
		displayPageNoCount: 10
	};
	
	
	
	

	pagination.responseData = {
		displayStartPageNo: 0,
		displayEndPageNo: 0,
		totalItemCount: 0,
		startItemNo: 0,
		maxPageNo: 0
	};

	
	
	
	
	pagination.onClick = null;
	
	
	
	
	
	pagination.request = function(data) {
		//  요청할 페이지 번호
		pagination.requestData.pageNo = data.pageNo;
		
		//  페이징 관련 데이터를 요청 파라메터에 추가
		if (data.param == null)
			data.param = {};
		
		data.param.pageNo = pagination.requestData.pageNo;
		data.param.itemCountPerPage = pagination.requestData.itemCountPerPage;
		data.param.displayPageNoCount = pagination.requestData.displayPageNoCount;
		
		
		//  data.param의 내용을 url parameter 형식으로 변환
		var params = "";
		$.each(data.param, function(key, value){
			params += (params == "" ? "?" : "&");
			params += key + "=" + value;
		});
		
		
		//  페이지 호출
		if (data.hashBang)
			location.href = data.url + params + "#" + data.hashBang;
		else
			location.href = data.url + params;
	};
	
	
	
	
	
	pagination.displayPager = function(data) {
		var iterPageNo = pagination.responseData.displayStartPageNo;
		var requestData = pagination.requestData;
		var responseData = pagination.responseData;
		var html = "";
		
		
		pagination.onClick = data.onClick;
		
		if (responseData.maxPageNo == 0) {
	    		$(data.pagerId).html("");
				return;
		}

		if (pagination.onClick == null) {
			//  Prev 버튼
			html = "<li class='prev'><a href='javascript:void(0);' title='Prev'><i class='fa fa-angle-left'></i></a></li>";

			//  PageNo 버튼
	    		for (; iterPageNo <= responseData.displayEndPageNo ; iterPageNo++) {
	    			if (iterPageNo == requestData.pageNo) {
	    				html += "<li class='active'><a href='javascript:void(0);'>" + iterPageNo + "</a></li>";
	    			}
	    			else {
	    				html += "<li><a href='javascript:void(0);'>" + iterPageNo + "</a></li>";
	    			}
	    		}
    		
	    		//  Next 버튼
			html += "<li class='next'><a href='javascript:void(0);' title='Next'><i class='fa fa-angle-right'></i></a></li>";		
		}
		else {
			//  Prev 버튼
    			html = "<li class='prev'><a href='javascript:void(0);' title='Prev' onclick='waffle.pagination.onClick(\"prev\", "
    				+ (requestData.pageNo == 1 ? 1 : requestData.pageNo - 1)
    				+ ")'><i class='fa fa-angle-left'></i></a></li>";
			
			//  PageNo 버튼
    			for (; iterPageNo <= responseData.displayEndPageNo ; iterPageNo++) {
	    			if (iterPageNo == requestData.pageNo) {
	    				html += "<li class='active'><a href='javascript:void(0);' >" + iterPageNo + "</a></li>";
	    			}
	    			else {
	    				html += "<li><a href='#' onclick='waffle.pagination.onClick(\"pageNo\", " + iterPageNo + ")'>" + iterPageNo + "</a></li>";
	    			}
	    		}
	    		
	    		// Next 버튼
	    		html += "<li class='next'><a href='javascript:void(0);' title='Next' onclick='waffle.pagination.onClick(\"next\", "
					+ (requestData.pageNo == responseData.maxPageNo ? requestData.pageNo : requestData.pageNo + 1)
	    				+ ")'><i class='fa fa-angle-right'></i></a></li>";
		}

		$(data.pagerId).html(html);
	}
})();