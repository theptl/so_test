var view = {
	resourseTypeCodes: {},
		
		
	init: function(){
		activeNav(2);
		
		//  목록 보기
		$("#ui_list").on("click", function(){
			location.href = "/cms/board/articles?boardCode=BT003";
			return false;			
		});

		//  저장
		$("#ui_save").on("click", function(){
			view.save();
		});
		
		
		//  썸네일 확인 
		$("#ui_thumbnailConfirm").on("click", function(){
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
				var html = '';
				$.each(result.data, function(idx, item) {
					view.resourseTypeCodes[item.code] = item;
					html += '<option value="' + item.code + '">' + item.codeName + '</option>';
				});
				$("#ui_resourceCode").html(html);
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
				console.log(xhr.responseJSON || xhr.statusText);
				alert(xhr.responseJSON || xhr.statusText);
				$.hideMask();
	        }
	    });


		if (pageData.article) {
			$("#ui_pageTitle").html("Resources");
			$("#ui_idx").html(pageData.article.idx);
			$("#ui_resourceCode").val(pageData.article.itemCode);
			$("#ui_resourceName").val(pageData.article.title);
			$("#ui_thumbnailUrl").val(pageData.article.thumbnailUrl);
			$("#ui_associateUrl").val(pageData.article.associateUrl);
			$("#ui_description").val(pageData.article.content);
			
			if (pageData.article.thumbnailUrl)
				$("#ui_thumbnailImage").attr("src", pageData.article.thumbnailUrl);
		}
		else {
			$("#ui_pageTitle").html("Resource Register");
		}
	},
	
	checkValidate: function() {
		var param = {
			idx: (pageData.article ? pageData.article.idx : null),
			boardCode: pageData.boardCode,
			itemCode: $("#ui_resourceCode").val(),
			title: $("#ui_resourceName").val(),
			content: $("#ui_description").val(),
			thumbnailUrl: $("#ui_thumbnailUrl").val()
		};

		if (param.itemCode == '') {
			$("#ui_resourceCode").focus();
			alert("종류를 선택하세요");
			return null;
		}
		if (param.title == '') {
			$("#ui_resourceName").focus();
			alert("이름을 입력하세요.");
			return null;
		}
		if (param.content == '') {
			$("#ui_description").focus();
			alert("설명을 입력하세요.");
			return null;
		}
		
		return param;
	},
 	
 	save: function() {
 		var params = view.checkValidate();
 		if (params == null)
 			return;
 		
 		var url = "/cms/board/articles/insert";
 		if (pageData.article)
 			url = "/cms/board/articles/update";
 		
 		$.showMask();
 		$.ajax({
 			type: "POST",
 			url: url,
 			cache: false,
 			data: params,
            success: function (result) {
            	$.hideMask("저장되었습니다.", function() {
            		location.href = "/cms/board/articles?boardCode=" + pageData.boardCode;
            	});
            },
            error: function (xhr, ajaxOptions, thrownError) {
            	$.hideMask(thrownError);
	        }
	    });
 	}
}
