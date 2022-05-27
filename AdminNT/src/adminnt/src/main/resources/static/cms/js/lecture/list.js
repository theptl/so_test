var view = {
	category: {},
	
	init: function(){
		activeNav(1);
		
		
		//  Category
		waffle.api.getSystemCodes(false, "LectureCat", function(result) {
			var html = '<option value="">전체</option>';
			$.each(result.data, function(idx, item) {
				view.category[item.code] = item;
				
				html += "<option value='" + item.code + "'>" + item.codeName + "</option>";
			});
			$("#ui_category").html(html);
		});
		
		
		
		//  초기화
		$("#ui_reset_btn").on("click", function(){
			view.reset();
			return false;
		});
		
		
		//  검색 
		$("#ui_search_btn").on("click", function(){
			view.search(1);
			return false;
		});
		
		
		//  신규등록
		$("#ui_insertItem_btn").on("click", function(){
			location.href = "/cms/lecture/detail?idx=0";
			return false;
		});
		
		
		//  삭제
		$("#ui_deleteItems_btn").on("click", function(){
			view.remove();
			return false;
		});
		
		
		//  전체 선택
		$("#ui_all_check").on("click", function(){			
			$("#ui_table_body").children("tr").find("input:checkbox").each(function(){
				$(this).prop("checked", $("#ui_all_check").prop("checked"));
			});
		});
		
		
		//  검색어 복원
		{
			$("#ui_searchWord").val(waffle.string.getUrlParameter('searchWord', ''));
			$("#ui_category").val(waffle.string.getUrlParameter('category', ''));
		}
		
		
		//  검색결과
		{
    		var html = "";
    		if (pageData.articles.length == 0)
    			html += "<td colspan='12'>조회된 내용이 없습니다.</td>";
    		

        	$.each(pageData.articles, function (idx, data) {
        		var regDate = (new Date(data.regDate)).format('yyyy-MM-dd<br/>(hh:mm:ss)');
        		
        		html += "<tr>";
        		html += "<td><input type='checkbox' name='chk_info' value='" + data.idx +"' data-idx='"+ data.idx +"' /></td>";
        		html += "<td>" + data.idx + "</td>";
        		html += "<td>" + view.category[data.category].codeName + "</td>";
        		html += "<td>" + data.orderNo + "</td>";
        		html += "<td>" + data.title + "</td>";
        		html += "<td>" + data.isVisible + "</td>";
        		html += "<td>" + regDate + "</td>";
        		html += "<td>";
        		html += "<button type='button' class='btn default' onclick='view.modify(" + data.idx + "); return false;'>수정</button>";
        		html += "&nbsp;&nbsp;";
        		html += "<button type='button' class='btn gray' onclick=\"view.remove('" + data.idx + "'); return false;\">삭제</button>";
        		html += "</td>";
	    	});
			$("#ui_table_body").html(html);
			$("#ui_result_count").html(waffle.pagination.responseData.totalItemCount);
			
			
			//  Pagination 설정
			waffle.pagination.displayPager({
				pagerId: "#ui_pager",
				onClick: function(target, pageNo) {
					view.search(pageNo);
				}
    		});
		}
	},
 	
	
	reset: function(){
		//  검색조건 영역
		$("#ui_searchWord").val('');
		$("#ui_category").val('');
	},
	
	
	search: function(pageNo){
		var params = {
			searchWord: $("#ui_searchWord").val(),
			category: $("#ui_category").val()
		};
		
		waffle.pagination.request({
			url: "/cms/lecture/list",
			param: params,
			pageNo: pageNo,
			hashBang: null
		});
 	},
 	
 	
 	modify: function(idx) {
 		location.href = '/cms/lecture/detail?idx=' + idx;
 	},
 	
 	
 	remove: function(idx) {
		var listIdx = "", listIdxCnt = 0;
        $("#ui_table_body").find("input:checkbox").each(function () {
            if ($(this).prop("checked")) {
        		listIdx += (listIdx == "" ? $(this).val() : "," + $(this).val());
        		++listIdxCnt;
            }
        });
        if (idx && idx != "") {
    		listIdx = idx;
    		listIdxCnt = 1;
	    }
 		
 		if (listIdxCnt == 0 || confirm(listIdxCnt + "개의 항목을 삭제하시겠습니까?") == false)
 			return;
        

 		$.showMask('', '/cms/images/loading.png');
        $.ajax({
            type: "DELETE",
            url: "/cms/lecture/delete?idx=" + listIdx,
            cache: false,
            success: function (result) {
    			$.hideMask("삭제가 완료되었습니다.", function() {
    				location.reload();
    			});
            },
            error: function (xhr, ajaxOptions, thrownError) {
        		$.hideMask(thrownError);
            }
        });
 	}
}
