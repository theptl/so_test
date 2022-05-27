var view = {
	fileTypeCodeList: [],
		
	initListView : function(){
		activeNav(0);
		
		//  초기화		
		$('#ui_reset_btn').on('click', function(){
			view.reset();
			return false;			
		});
		
		
		//  검색 
		$('#ui_search_btn').on('click', function(){
			view.search(1);
			return false;
		});
		
		
		//  검색영역에서 엔터
		$('#ui_searchWord_text').keydown(function(e){
			if (e.keyCode == 13){
				view.search(1);	
			}
		});
		
		
		//  선택파일 삭제
		$('#ui_deleteItems_btn').on('click', function(){
			view.remove();
			return false;
		});
		
		
		//  파일 등록
		$('#ui_insertItem_btn').on('click', function(){
			location.href = '/cms/system/file/upload';
			return false;
		});
		
		
		//  전체 선택
		$('#ui_all_check').on('click', function(){			
			$('#ui_table_body').children('tr').find('input:checkbox').each(function(){
				$(this).prop('checked', $('#ui_all_check').prop('checked'));
			});
		});
		
		
		$.ajax({
	        type: "GET",
	        url: "/cms/system/getSystemCodeList",
	        data: {
				groupCode: 'FileType',
				code: null
			},
	        cache: false,
	        async: false,
	        success: function(result) {
				view.fileTypeCodeList = result.data;
				
				
				//  검색영역
				var html = '<option value="">전체</option>';
				$.each(view.fileTypeCodeList, function(idx, data) {
					html += '<option value="' + data.code + '">' + data.codeName + '</option>';
				})
				$('#ui_fileType').html(html);
				
				
				//  결과데이터 처리
	    		html = '';
	    		if (pageData.length == 0)
	    			html += '<td colspan="12">조회된 내용이 없습니다.</td>';
	    		
	        	$.each(resultFileList, function (idx, data) {
	        		html += '<tr>';
	        		html += "<td><input type='checkbox' name='chk_info' value='" + data.hash + "' data-key='" + data.hash + "' /></td>";
	        		html += "<td>" + view.getCodeName(data.tag) + "</td>";
	        		html += "<td class='ta_l'>" + data.filename + "</td>";
	        		html += "<td class='ta_l'>" + (data.description || '') + "</td>";
	        		html += '<td>';
	        		html += "<button type='button' class='btn default' onclick='view.detail(\"" + data.hash + "\"); return false;'>수정</button>";
	        		html += '</td>';
	        		html += '</tr>';
	        	});
	    		$('#ui_table_body').html(html);
				$('#ui_result_count').html(waffle.pagination.responseData.totalItemCount);
		    		
		    	
	    		//  Pagination 설정
	    		waffle.pagination.displayPager({
	    			pagerId: '#ui_pager',
	    			onClick: function(target, pageNo) {
	    				view.search(pageNo);
	    			}
	    		});
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
	    		console.log(xhr.responseJSON);
	        }
	    });
	},
	
	initInsertView: function(){
		activeNav(0);
		
		$.ajax({
	        type: "GET",
	        url: "/cms/system/getSystemCodeList",
	        data: {
				groupCode: 'FileType',
				code: null
			},
	        cache: false,
	        async: false,
	        success: function(result) {
				view.fileTypeCodeList = result.data;

				var html = '';
				$.each(view.fileTypeCodeList, function(idx, data) {
					html += '<option value="' + data.code + '">' + data.codeName + '</option>';
				})
				$('#ui_fileType').html(html);
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
	    		console.log(xhr.responseJSON);
	        }
	    });
		
		
		//  파일 등록
		$('#ui_fileupload_form').ajaxForm({
            beforeSubmit: function (data, form, option) {
            	if (data[0].value == '') {
            		alert('분류를 선택하세요.');
            		document.getElementById('ui_fileType').focus();
            		return false;
            	}
            	if (data[1].value == '') {
            		alert('파일을 선택하세요.');
            		document.getElementById('ui_files').focus();
            		return false;
            	}
            	if (data[2].value == '') {
            		alert('설명을 입력하세요.');
            		document.getElementById('ui_description').focus();
            		return false;
            	}

    			$.showMask('파일을 업로드 중입니다.', '/cms/images/loading.png');
	            return true;
	        },
            success: function(response, status){
            	$.hideMask('업로드 되었습니다.', function() {
    				
            		//  Input 필드 초기화
    				var $element = $('#ui_files');
    				$element.wrap('<form>').closest('form').get(0).reset();
    				$element.unwrap();

            		location.reload();
            	});
            },
            error: function(){
				$.hideMask('실패하였습니다. 파일용량 등의 조건을 확인해보시기 바랍니다.');
            }
        });
	},
	
	initDetailView : function(){
		activeNav(0);
		
		var regDate = new Date(fileInfo.regDate);
		$('#ui_hash').text(fileInfo.hash);
		$('#ui_filename').text(fileInfo.filename);
		$('#ui_description').val(fileInfo.description || '');
		$('#ui_regDate').text(regDate.format('yyyy-MM-dd') + ' ' + regDate.format('hh:mm:ss'));
		
		$.ajax({
	        type: "GET",
	        url: "/cms/system/getSystemCodeList",
	        data: {
				groupCode: 'FileType',
				code: null
			},
	        cache: false,
	        async: false,
	        success: function(result) {
				view.fileTypeCodeList = result.data;
				
				
				//  결과데이터 처리
	    		var html = '';
	        	$.each(view.fileTypeCodeList, function (idx, data) {
	        		html += '<option value="' + data.code + '">' + data.codeName + '</option>';
	        	});
	        	$('#ui_fileType').html(html);
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
	    		console.log(xhr.responseJSON);
	        }
	    });
		
		
		var downloadUrl = '/sys/file/download/' + fileInfo.hash;
		$("#ui_fileType").val(fileInfo.tag);
		$('#ui_fileDownloadUrl').html(
				'<a href="' + downloadUrl + '">' + downloadUrl + '</a>');
	},
 	
	reset: function(){
		//  검색조건 영역
		$('input:text').val('');
		$('#ui_fileType option:eq(0)').attr('selected', 'selected');
		

		//  검색결과 테이블 영역
		$('#ui_table_body').html('');
		$('#ui_result_count').html('0');
		$('#ui_pager').html('');
	},
	
	getCodeName: function(code) {
		var codeName = '';
		$.each(view.fileTypeCodeList, function (idx, data) {
			if (data.code == code) {
				codeName = data.codeName;
				return false;
			}
		});
		return codeName;
	},
	
	search: function(pageNo){
		waffle.pagination.request({
			url: '/cms/system/file',
			param: {
	        	category: document.getElementById('ui_fileType').value,
	        	searchWord: $('#ui_searchWord_text').val()
			},
			pageNo: pageNo,
			hashBang: null
		});
 	},
 	
 	remove: function() {
		var listIdx = '', listCnt = 0;
        $('#ui_table_body').find('input:checkbox').each(function () {
            if ($(this).prop('checked')) {
        		listIdx += (listIdx == '' ? $(this).val() : ',' + $(this).val());
        		listCnt++;
            }
        });
 		if (listCnt == 0 || confirm(listCnt + '개의 항목을 삭제하시겠습니까?') == false)
 			return;
        

		$.showMask('처리 중입니다.', '/cms/images/loading.png');
		$.ajax({
	        type: 'DELETE',
	        url: '/cms/system/file/delete',
	        data: {
	        	targets: listIdx
	        },
	        cache: false,
	        success: function(result) {
    			$.hideMask('삭제되었습니다.', function() {
    				location.reload();
    			});
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
				$.hideMask('오류가 발생했습니다.');
				console.log(xhr.responseJSON);
	        }
	    });
 	},
 	
 	detail: function(idx) {
 		location.href = '/cms/system/file/detail/' + idx;
 		return false;
 	},
	
	modify: function() {
		$.showMask('처리 중입니다.', '/cms/images/loading.png');
		$.ajax({
	        type: 'POST',
	        url: '/cms/system/file/modify',
	        data: {
	        	hash: fileInfo.hash,
	        	category: document.getElementById('ui_fileType').value,
	        	description: $('#ui_description').val()
	        },
	        cache: false,
	        success: function(result) {
    			$.hideMask('수정되었습니다.', function() {
    				location.reload();
    			});
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
				$.hideMask('오류가 발생했습니다.');
				console.log(xhr.responseJSON);
	        }
	    });
	}
}
