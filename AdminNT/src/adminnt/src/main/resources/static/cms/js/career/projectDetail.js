var view = {
		
	init: function(){
		activeNav(3);
		
		
		//  CKEditor
		waffle.ui.attachCKEditor("ui_projectGoal", 170);
		waffle.ui.attachCKEditor("ui_devEnv", 170);
		waffle.ui.attachCKEditor("ui_reference", 120);
		waffle.ui.attachCKEditor("ui_note", 350);
		
		
		//  저장
		$("#ui_save").on("click", function(){
			view.save();
			return false;			
		});
		
		
		//  목록
		$("#ui_back").on("click", function(){
			location.href = "/cms/career/project";
			return false;			
		});
		
		
		//  Thumbnail 확인
		$("#ui_thumbnailConfirm").on("click", function(){
			var url = $("#ui_thumbnailUrl").val();
			$("#ui_thumbnailImage").attr("src", url);
		});
		
		
		//  수행기간
		{
			$("#ui_workBegin").datepicker({
				dateFormat: "yy-mm-dd",
				changeYear: true,
				changeMonth: true,
				yearRange: "1999:2050" 
			});
			$("#ui_workEnd").datepicker({
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
	        	var html = "";
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
		
		
		//  초기값
		if (pageData.project) {
			var project = pageData.project;
    		var workBegin = project.workBegin.substring(0, 4)
								+ '-' + project.workBegin.substring(4, 6)
								+ '-' + project.workBegin.substring(6, 8);
    		var workEnd = project.workEnd.substring(0, 4)
								+ '-' + project.workEnd.substring(4, 6)
								+ '-' + project.workEnd.substring(6, 8);
			
			$("#ui_companyList").val(project.companyId);
			$("#ui_workBegin").val(workBegin);
			$("#ui_workEnd").val(workEnd);
			$("#ui_projectName").val(project.projectName);
			$('input:radio[name=workType]:input[value="' + project.workType + '"]').attr("checked", true);
			$("#ui_thumbnailUrl").val(project.thumbnailUrl);
			if (project.thumbnailUrl && project.thumbnailUrl != '')
				$("#ui_thumbnailImage").attr("src", project.thumbnailUrl);

			
			CKEDITOR.instances.ui_projectGoal.setData(project.projectGoal);
			CKEDITOR.instances.ui_devEnv.setData(project.devEnv);
			CKEDITOR.instances.ui_reference.setData(project.reference);
			CKEDITOR.instances.ui_note.setData(project.note);
		}
	},
 	
 	save: function() {
 		var param = {
 			idx: (pageData.project ? pageData.project.idx : null),
			companyId: $("#ui_companyList").val(),
			thumbnailUrl: $("#ui_thumbnailUrl").val(),
			workBegin: $("#ui_workBegin").val(),
			workEnd: $("#ui_workEnd").val(),
			projectName: $("#ui_projectName").val(),
			workType: $("input[name=workType]:checked").val(),
			projectGoal: CKEDITOR.instances.ui_projectGoal.getData(),
			devEnv: CKEDITOR.instances.ui_devEnv.getData(),
			reference: CKEDITOR.instances.ui_reference.getData(),
			note: CKEDITOR.instances.ui_note.getData(),
			isVisible: $("input[name=isVisible]:checked").val()
 		}
 		
 		
 		var url = "";
 		if (pageData.project)
 			url = "/cms/career/project/update";
 		else
 			url = "/cms/career/project/insert";

 		
 		$.showMask("요청중입니다.");
		$.ajax({
	        type: "POST",
	        url: url,
	        data: param,
	        cache: false,
	        async: false,
	        success: function(result) {
        		$.hideMask("완료되었습니다.", function(){
        			location.href = "/cms/career/project";
        		});
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
	        	$.hideMask("서비스에 장애가 발생하였습니다.");
	        	console.log(xhr.responseJSON);
	        }
	    });
 		
 		
 		return param;
 	}
}
