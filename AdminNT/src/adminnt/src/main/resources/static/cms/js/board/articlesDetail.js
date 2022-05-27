var view = {
	init: function(){
		activeNav(1);

		
		waffle.api.getSystemCodes(false, "BoardType", function(result) {
			var html = '';
			$.each(result.data, function(idx, item) {
				html += '<option value="' + item.code + '">' + item.codeName + '</option>';
			});
			$("#ui_boardCode").html(html);
		});
		
		waffle.api.getSystemCodes(false, null, function(result) {
			var html = '<option value=""><분류 없음></option>';
			$.each(result.data, function(idx, item) {
				html += '<option value="' + item.code + '">' + item.codeName + '</option>';
			});
			$("#ui_boardSubCode").html(html);
		});
		
		
		//  저장
		$("#ui_save_btn").on("click", function(){
			view.save();
			return false;			
		});
		
		
		//  취소
		$("#ui_cancel_btn").on("click", function(){
			location.href = '/cms/board/articles';
			return false;
		});
		
		
		//  썸네일 확인 
		$("#ui_thumbnailConfirm_btn").on("click", function(){
			var url = $("#ui_thumbnailUrl").val();
			$("#ui_thumbnailImage").attr("src", url);
			return false;
		});
		
		
		//  연관URL 확인 
		$("#ui_associateLink_btn").on("click", function(){
			var url = $("#ui_associateUrl").val();
			if (url && url != '')
				window.open(url, '_blank');
			return false;
		});
		
		
		//  소식일
		$("#ui_issueDate").datepicker();
		$("#ui_issueDate").datepicker("option", "dateFormat", "yy-mm-dd");
		
		
		//  CKEditor
		waffle.ui.attachCKEditor("ui_content");

		
		//  초기값
		if (pageData.article) {
			var issueDate = '';
			if (pageData.article.issueDate) {
				issueDate = pageData.article.issueDate.toDateFormat('yyyymmdd', 'yyyy-mm-dd');
			}
			else {
				issueDate = '';
			}
			
			$("#ui_idx").text(pageData.article.idx);
			$("#ui_title").val(pageData.article.title);
			$("#ui_boardCode").val(pageData.article.boardCode);
			$("#ui_boardSubCode").val(pageData.article.boardSubCode);
			$("#ui_thumbnailUrl").val(pageData.article.thumbnailUrl);
			$("#ui_associateUrl").val(pageData.article.associateUrl);
			$("#ui_issueDate").val(issueDate);
			
			if (pageData.article.thumbnailUrl && pageData.article.thumbnailUrl != '')
				$("#ui_thumbnailImage").attr("src", pageData.article.thumbnailUrl);
			
			CKEDITOR.instances.ui_content.setData(pageData.article.content);
		}
	},
	
	checkValidate: function() {
		var params = {
			idx: (pageData.article ? pageData.article.idx : null),
			boardCode: $("#ui_boardCode").val(),
			boardSubCode: $("#ui_boardSubCode").val(),
			title: $("#ui_title").val(),
			content: CKEDITOR.instances.ui_content.getData(),
			issueDate: $("#ui_issueDate").val().replaceAll('-', ''),
			thumbnailUrl: $("#ui_thumbnailUrl").val(),
			associateUrl: $("#ui_associateUrl").val()
		};
		
		
		if (params.title == "") {
			alert("제목을 입력하세요.");
			return null;
		}
		if (params.content == "") {
			alert("내용을 입력하세요.");
			return null;
		}
		
		return params;
	},
 	
 	save: function() {
 		var params = view.checkValidate();
 		if (params == null)
 			return;
 		
 		var url = "/cms/board/articles/insert";
 		if (pageData.article)
 			url = "/cms/board/articles/update";
 		
 		$.showMask('', '/cms/images/loading.png');
 		$.ajax({
 			type: "POST",
 			url: url,
 			cache: false,
 			data: params,
            success: function (result) {
            	$.hideMask("저장되었습니다.", function() {
            		location.href = "/cms/board/articles";
            	});
            },
            error: function (xhr, ajaxOptions, thrownError) {
            	$.hideMask(thrownError);
	        }
	    });
 	}
}
