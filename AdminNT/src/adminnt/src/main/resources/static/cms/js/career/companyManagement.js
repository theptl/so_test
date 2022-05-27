var view = {
	companies: [],
	selectedCompanyId: null,
		
	init: function(){
		activeNav(3);
		
		//  수정완료		
 		$("#ui_modifyCareer").hide();
		$("#ui_modifyCareer").on("click", function(){
			view.modify();
			return false;			
		});
		
		
		//  추가 
 		$("#ui_addCareer").show();
		$("#ui_addCareer").on("click", function(){
			view.add();
			return false;
		});
		
		
		//  삭제
		$("#ui_deleteItems").on("click", function(){
			view.remove();
			return false;
		});
		
		
		//  전체 선택
		$("#ui_all_check").on("click", function(){			
			$("#ui_table_body").children("tr").find("input:checkbox").each(function(){
				$(this).prop("checked", $("#ui_all_check").prop("checked"));
			});
		});
		
		
		//  입사/퇴사일
		$("#ui_joinDate").datepicker({
			dateFormat: "yy-mm-dd",
			changeYear: true,
			changeMonth: true,
			yearRange: "1999:2050" 
		});
		$("#ui_leaveDate").datepicker({
			dateFormat: "yy-mm-dd",
			changeYear: true,
			changeMonth: true,
			yearRange: "1999:2050" 
		});
		
		
		//  검색결과
		{
    		var html = "";
    		if (pageData.companies.length == 0)
    			html += "<td colspan='12'>조회된 내용이 없습니다.</td>";
    		

        	$.each(pageData.companies, function (idx, data) {
        		var joinDate = (new Date(data.joinDate)).format('yyyy-MM-dd');
        		var leaveDate = (data.leaveDate ? (new Date(data.leaveDate)).format('yyyy-MM-dd') : null);
        		
        		html += "<tr>";
        		html += "<td>" + data.companyName + "</td>";
        		html += "<td>" + joinDate + "</td>";
        		
        		if (leaveDate == null)
        			html += "<td>-</td>";
        		else
        			html += "<td>" + leaveDate + "</td>";
        		
        		if (data.isFulltime == "Y")
        			html += "<td>정규직</td>";
        		else
        			html += "<td>프리렌서</td>";
        		
        		html += "<td>";
        		html += "<button type='button' class='btn default' onclick='view.modifyEditor(" + data.companyId + "); return false;'>수정</button>";
        		html += "&nbsp;&nbsp;";
        		html += "<button type='button' class='btn gray' onclick=\"view.remove('" + data.companyId + "'); return false;\">삭제</button>";
        		html += "</td>";
        		html += "</tr>";
        	});
    		$("#ui_table_body").html(html);
    		$("#ui_result_count").html(pageData.companies.length);
    		
    		
    		//  Pagination 설정
    		waffle.pagination.displayPager({
    			pagerId: "#ui_pager",
    			onClick: function(target, pageNo) {
    				view.search(pageNo);
    			}
    		});
		}
	},
	
	search: function(pageNo){
		waffle.pagination.request({
			url: "/cms/career/company",
			param: null,
			pageNo: pageNo,
			hashBang: null
		});
 	},
 	
 	checkValidate: function() {
 		var param = {
			companyId: view.selectedCompanyId,
			companyName: $("#ui_companyName").val(),
			isFulltime: (document.formIsFulltime.isFulltime[0].checked == true ? "Y" : "N"),
			joinDate: $("#ui_joinDate").val(),
			leaveDate: $("#ui_leaveDate").val()
        };
 		
 		if (param.companyName == "") {
 			alert("회사명을 입력하세요.");
 			return;
 		}
 		if (!param.isFulltime) {
 			alert("근무형태를 선택하세요.");
 			return;
 		}
 		if (param.joinDate == "") {
 			alert("입사일을 선택하세요.");
 			return;
 		}
 		
 		return param;
 	},
 	
 	add: function() {
 		var param = view.checkValidate();
 		if (param == null)
 			return;
 		
 		
 		$.showMask();
 		$.ajax({
 			type: "POST",
 			url: "/cms/career/company/insert",
 			cache: false,
 			data: param,
            success: function (result) {
            	$.hideMask("추가되었습니다.", function(){
                	view.search(1);
            	});
            },
            error: function (xhr, ajaxOptions, thrownError) {
            	$.hideMask(thrownError);
        	}
    	});
 	},
 	
 	modifyEditor: function(companyId) {
 		var data;
 		$.each(pageData.companies, function(idx, item) {
 			if (item.companyId == companyId) {
 				data = item;
 				view.selectedCompanyId = data.companyId;
 				return false;
 			}
 		});
		var joinDate = (new Date(data.joinDate)).format('yyyy-MM-dd');
		var leaveDate = (data.leaveDate ? (new Date(data.leaveDate)).format('yyyy-MM-dd') : null);
 		
 		document.getElementById("ui_companyName").value = data.companyName;
 		if (data.isFulltime == 'Y') document.formIsFulltime.isFulltime[0].checked = true;
 		if (data.isFulltime == 'N') document.formIsFulltime.isFulltime[1].checked = true;
 		
 		document.getElementById("ui_joinDate").value = joinDate;
 		document.getElementById("ui_leaveDate").value = (leaveDate || "");
		
 		$("#ui_addCareer").hide();
 		$("#ui_modifyCareer").show();
 	},
 	
 	modify: function() {
 		var param = view.checkValidate();
 		if (param == null)
 			return;
 		
 		$.showMask();
 		$.ajax({
 			type: "POST",
 			url: "/cms/career/company/update",
 			cache: false,
 			data: param,
 			success: function (result) {
            	$.hideMask("수정되었습니다.", function() {
                	location.reload();
            	});
            },
            error: function (xhr, ajaxOptions, thrownError) {
	            	$.hideMask(thrownError);
	        	}
	    	});
 	},
 	
 	remove: function(idx) {
 		if (confirm("해당 이력을 삭제하시겠습니까?") == false)
 			return;

 		$.showMask();
        $.ajax({
            type: "DELETE",
            url: "/cms/career/company/delete?idx=" + idx,
            cache: false,
            success: function (result) {
            	
        		$.hideMask("삭제가 완료되었습니다.", function(){
                	location.reload();
        		});
            },
            error: function (xhr, ajaxOptions, thrownError) {
	        		$.hideMask(thrownError);
	            }
	        });
 	}
}
