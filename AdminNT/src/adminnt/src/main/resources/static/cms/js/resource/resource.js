var view = {
	resourceTypeCodes: {},
		
	init: function(){
		activeNav(2);
		
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
			location.href = "/cms/board/articlesDetail?boardCode=" + waffle.string.getUrlParameter("boardCode");
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
		
		
		//  검색  등록일
		{
			$("#ui_regDate_begin").datepicker();
			$("#ui_regDate_begin").datepicker("option", "dateFormat", "yy-mm-dd");
			
			$("#ui_regDate_end").datepicker();
			$("#ui_regDate_end").datepicker("option", "dateFormat", "yy-mm-dd");
		}
		
		
		//  분류
		$.ajax({
	        type: 'GET',
	        url: '/cms/system/getSystemCodeList',
	        data: {
	        	groupCode: 'ResourceType',
				enable: 'Y'
	        },
	        async: false,
	        cache: false,
	        success: function(result) {
				var html = '<option value="">전체</option>';
				$.each(result.data, function(idx, item) {
					view.resourceTypeCodes[item.code] = item;
					html += '<option value="' + item.code + '">' + item.codeName + '</option>';
				});
				$("#ui_resourceType").html(html);
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
				console.log(xhr.responseJSON || xhr.statusText);
				alert(xhr.responseJSON || xhr.statusText);
				$.hideMask();
	        }
	    });
		
		
		//  검색어 복원
		{
			$("#ui_resourceType").val(waffle.string.getUrlParameter('resourceType', ''));
			$("#ui_searchWord").val(waffle.string.getUrlParameter('searchWord', ''));
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
        		if (view.resourceTypeCodes[data.itemCode])
        			html += "<td>" + view.resourceTypeCodes[data.itemCode].codeName + "</td>";
        		else
        			html += "<td></td>";
        		html += "<td>" + data.title + "</td>";
        		
        		if (data.thumbnailUrl)
        			html += "<td><img src='" + data.thumbnailUrl + "' width='120px'/></td>";
        		else
        			html += "<td></td>";

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
		$("#ui_resourceType").val('');
		$("#ui_searchWord").val('');
	},
	
	
	search: function(pageNo){
		var params = {
			boardCode: pageData.boardCode,
			searchWord: $("#ui_searchWord").val(),
			regDateBegin: $("#ui_regDate_begin").val(),
			regDateEnd: $("#ui_regDate_end").val()
		};
		
		waffle.pagination.request({
			url: "/cms/board/articles",
			param: params,
			pageNo: pageNo,
			hashBang: null
		});
 	},
 	
 	
 	modify: function(idx) {
 		location.href = '/cms/board/articlesDetail?boardCode=' + pageData.boardCode + '&idx=' + idx;
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
        

 		$.showMask();
        $.ajax({
            type: "DELETE",
            url: "/cms/board/articles/delete?idx=" + listIdx,
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
