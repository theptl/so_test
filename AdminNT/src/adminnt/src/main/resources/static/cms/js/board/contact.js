var view = {
	initListView: function(){
		activeNav(1);
		
		
		//  검색결과
		{
    		var html = "";
    		if (pageData.contacts.length == 0)
    			html += "<td colspan='12'>조회된 내용이 없습니다.</td>";
    		

        	$.each(pageData.contacts, function (idx, data) {
        		var regDate = (new Date(data.regDate)).format('yyyy-MM-dd<br/>(hh:mm:ss)');
        		
        		html += "<tr>";
        		html += "<td>" + data.idx + "</td>";
        		html += "<td>" + data.name + "</td>";
        		html += "<td>" + data.message.abbreviation(15) + "</td>";
        		html += "<td>" + regDate + "</td>";
        		html += "<td>";
        		html += "<button type='button' class='btn default' onclick='view.showContact(" + data.idx + "); return false;'>보기</button>";
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
 	
 	
	showContact: function(idx) {
 		location.href = '/cms/board/contactDetail?idx=' + idx;
 	},
 	
 	
 	initDetailView: function(){
 		var data = pageData.contact;
 		var regDate = (new Date(data.regDate)).format('yyyy-MM-dd hh:mm:ss');
 		
 		$("#ui_idx").text(data.idx);
 		$("#ui_name").text(data.name);
 		$("#ui_email").text(data.email);
 		$("#ui_regDate").text(regDate);
 		$("#ui_message").text(data.message);
 	}
}
