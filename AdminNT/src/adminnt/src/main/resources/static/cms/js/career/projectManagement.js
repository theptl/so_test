var view = {
	init: function(){
		activeNav(3);
		
		//  수정완료		
 		$("#ui_modifyCareer").hide();
		$("#ui_modifyCareer").on("click", function(){
			view.modify();
			return false;			
		});
		
		
		//  추가 
 		$("#ui_addProject").show();
		$("#ui_addProject").on("click", function(){
			view.modify();
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
		
		
		//  초기화
		$("#ui_reset").on("click", function(){
			$("#ui_companyList").val("");
			$("#ui_projectName").val("");
			$("#ui_searchDateBegin").val("");
			$("#ui_searchDateEnd").val("");
			$("#ui_workType").val("");
			return false;
		});
		
		
		//  검색
		$("#ui_search").on("click", function(){
			view.search();
			return false;
		});
		
		
		//  입사/퇴사일
		{
			$("#ui_searchDateBegin").datepicker({
				dateFormat: "yy-mm-dd",
				changeYear: true,
				changeMonth: true,
				yearRange: "1999:2050" 
			});
			$("#ui_searchDateEnd").datepicker({
				dateFormat: "yy-mm-dd",
				changeYear: true,
				changeMonth: true,
				yearRange: "1999:2050" 
			});
		}
		
		
		//  회사 목록
		$.ajax({
	        type: "POST",
	        url: "/cms/career/company/list",
	        data: null,
	        cache: false,
	        async: false,
	        success: function(result) {
	    		var html = '<option value="">전체</option>';
	    		$.each(result.data, function(idx, item) {
	    			html += '<option value="' + item.companyId + '">' + item.companyName + '</option>';
	    		});
	    		$("#ui_companyList").html(html);
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
	    		if (arg.error)
	    			arg.error(xhr.responseJSON);
	    		else
	    			console.log(xhr.responseJSON);
	        }
	    });
		
		
		//  프로젝트 목록
		var projects = [];
		$.ajax({
	        type: "GET",
	        url: "/cms/career/projectList",
	        data: null,
	        cache: false,
	        async: false,
	        success: function(result) {
	        	projects = result.data;
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
	    		if (arg.error)
	    			arg.error(xhr.responseJSON);
	    		else
	    			console.log(xhr.responseJSON);
	        }
	    });
		
		
		//  검색어 복원
		{
			$("#ui_companyList").val(waffle.string.getUrlParameter('companyId', ''));
			$("#ui_projectName").val(waffle.string.getUrlParameter('projectName', ''));
			$("#ui_searchDateBegin").val(waffle.string.getUrlParameter('searchDateBegin', ''));
			$("#ui_searchDateEnd").val(waffle.string.getUrlParameter('searchDateEnd', ''));
			$("#ui_workType").val(waffle.string.getUrlParameter('workType', ''));
		}
		
		
		//  검색결과
		{
    		var html = "";
    		if (projects.length == 0)
    			html += "<td colspan='12'>조회된 내용이 없습니다.</td>";
    		

        	$.each(projects, function (idx, item) {
        		var workBegin = item.workBegin.substring(0, 4)
									+ '-' + item.workBegin.substring(4, 6)
									+ '-' + item.workBegin.substring(6, 8);
        		var workEnd = item.workEnd.substring(0, 4)
									+ '-' + item.workEnd.substring(4, 6)
									+ '-' + item.workEnd.substring(6, 8);
        		
        		html += "<tr>";
        		html += "<td><input type='checkbox' name='chk_info' value='" + item.idx +"' data-idx='"+ item.idx +"' /></td>";
        		html += "<td>" + item.companyName + "</td>";
        		html += "<td>" + item.projectName + "</td>";
        		html += "<td>" + workBegin + " ~ " +  workEnd + "</td>";
        		
        		if (item.workType == "O")
        			html += "<td>내근</td>";
        		else if (item.workType == "D")
        			html += "<td>파견</td>";
        		else if (item.workType == "H")
        			html += "<td>비상주</td>";
        		else
        			html += "<td>unknown code=" + item.workType + "</td>";
        		
        		html += "<td>";
        		html += "<button type='button' class='btn default' onclick='view.modify(" + item.idx + "); return false;'>수정</button>";
        		html += "&nbsp;&nbsp;";
        		html += "<button type='button' class='btn gray' onclick=\"view.remove('" + item.idx + "'); return false;\">삭제</button>";
        		html += "</td>";
        		html += "</tr>";
        	});
    		$("#ui_table_body").html(html);
    		$("#ui_result_count").html(projects.length);
		}
	},
	
	search: function(){
 		var param = {
			companyId: $("#ui_companyList").val(),
			projectName: $("#ui_projectName").val(),
			workType: $("#ui_workType").val(),
			searchDateBegin: $("#ui_searchDateBegin").val(),
			searchDateEnd: $("#ui_searchDateEnd").val()
        };
		
 		location.href = "/cms/career/project?" + waffle.string.parameterize(param);
 	},
 	
 	modify: function(idx) {
 		if (idx)
 			location.href = "/cms/career/project/" + idx;
 		else
 			location.href = "/cms/career/project/register";
 	},
 	
 	remove: function(idx) {
 		if (confirm("해당 이력을 삭제하시겠습니까?") == false)
 			return;

 		$.showMask();
        $.ajax({
            type: "DELETE",
            url: "/cms/career/project/delete?idx=" + idx,
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
