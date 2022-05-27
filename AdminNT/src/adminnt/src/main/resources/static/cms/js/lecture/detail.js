var view = {
	init: function(){
		activeNav(1);
		
		$("input[name=isVisible]:input[value='Y']").attr("checked", true);
		
		//  저장
		$("#ui_save_btn").on("click", function(){
			view.save();
			return false;			
		});
		
		
		//  취소 
		$("#ui_cancel_btn").on("click", function(){
			location.href = '/cms/lecture/list';
			return false;
		});
		
		
		//  Category
		waffle.api.getSystemCodes(false, "LectureCat", function(result) {
			var html = "";
			result.data.forEach(function(item, idx) {
				html += "<option value='" + item.code + "'>" + item.codeName + "</option>"; 
			});
			$("#ui_category").html(html);
		});

		
		
		//  파일 등록(Ajax 방식)
		$("#ui_files").on("change", function() {
	 		if ($("#ui_files")[0].files.length > 0) {
				$.showMask('파일을 업로드 중입니다.', '/cms/images/loading.png');
				
				var formData = new FormData();
		        formData.append('fileTypeCode', 'FT002');
				formData.append('files', $("#ui_files")[0].files[0]);
				
				$.ajax({
					url: '/cms/file/upload',
					type: 'POST',
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						$("#ui_thumbnailUrl").val(location.origin + '/sys/file/download/' + result);
		            	$.hideMask();
					},
					error: function(xhr, status, error) {
						console.log(xhr);
						$.hideMask('파일 업로드에 실패하였습니다.');
					}
				});
	 		}
		});
		
		
		//  CKEditor
		waffle.ui.attachCKEditor("ui_content");

		
		//  초기값
		if (pageData && pageData.article) {
			$("#ui_idx").text(pageData.article.idx);
			$("#ui_category").val(pageData.article.category);
			$("#ui_orderNo").val(pageData.article.orderNo);
			$("#ui_title").val(pageData.article.title);
			$("#ui_summary").val(pageData.article.summary);
			$("#ui_thumbnailUrl").val(pageData.article.thumbnailUrl || '');
			$("#ui_thumbnailQuote").text(pageData.article.thumbnailQuote || '');
			
			$("input[name=isVisible]:input[value='" + pageData.article.isVisible + "']").attr("checked", true);
			$("#ui_tags").val(pageData.article.tags);
			
			CKEDITOR.instances.ui_content.setData(pageData.article.content);
		}
	},
	
	checkValidate: function() {
		var params = {
			idx: (pageData.article ? pageData.article.idx : null),
			category: $("#ui_category").val(),
			orderNo: $("#ui_orderNo").val(),
			title: $("#ui_title").val(),
			summary: $("#ui_summary").val(),
			thumbnailQuote: $("#ui_thumbnailQuote").val(),
			content: CKEDITOR.instances.ui_content.getData(),
			thumbnailUrl: $("#ui_thumbnailUrl").val(),
			isVisible: $("input[name=isVisible]:checked").val(),
			tags: "",
		};
		
		
		if (params.orderNo == "") {
			alert("순서를 입력하세요.");
			return null;
		}
		if (params.title == "") {
			alert("제목을 입력하세요.");
			return null;
		}
		if (params.summary == "") {
			alert("Summary를 입력하세요.");
			return null;
		}
		if (params.content == "") {
			alert("내용을 입력하세요.");
			return null;
		}
		
		
		var tags = $("#ui_tags").val().split(",");
		tags.forEach(function(val, idx) {
			val = val.trim();
			if (val != "") {
				params.tags += (params.tags == "" ? val : ", " + val);
			}
		});
		
		return params;
	},
 	
 	save: function() {
 		var params = view.checkValidate();
 		if (params == null)
 			return;
 		
 		
 		var url = "/cms/lecture/insert";
 		if (pageData.article)
 			url = "/cms/lecture/update";
 		
 		$.showMask('', '/cms/images/loading.png');
 		$.ajax({
 			type: "POST",
 			url: url,
 			cache: false,
 			data: params,
            success: function (result) {
            	$.hideMask("저장되었습니다.", function() {
            		location.href = "/cms/lecture/list";
            	});
            },
            error: function (xhr, ajaxOptions, thrownError) {
            	alert("에러가 발생하였습니다.");
            	$.hideMask(thrownError);
	        }
	    });
 	}
}
