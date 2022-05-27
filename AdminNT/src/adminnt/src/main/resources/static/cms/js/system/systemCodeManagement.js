var view = {
	systemCodeMap: new Object(),

	init: function() {
		activeNav(0);

		
		// 전체 선택
		$('#ui_all_check').on('click', function() {
			$('#ui_table_body').children('tr').find('input:checkbox').each(function() {
				$(this).prop('checked', $('#ui_all_check').prop('checked'));
			});
		});
		
		// 초기화
		$('#ui_reset_btn').on('click', function() {
			view.reset();
			return false;
		});
		
		// 관리 액션
		$('#ui_action_btn').on('click', function() {
			var method = '';
			var param = view.validation();
			if (param == null)
				return;
			
			$.ajax({
		        type: 'POST',
		        url: '/cms/system/systemCode/' + param.action,
		        data: param,
		        cache: false,
		        success: function(result) {
					alert('처리되었습니다.');
					location.reload();
		        },
		        error: function (xhr, ajaxOptions, thrownError) {
					console.log(xhr.responseJSON || xhr.statusText);
					alert(xhr.responseJSON || xhr.statusText);
					$.hideMask();
		        }
		    });
			
			return false;
		});

		
		//  수신데이터 처리
		{
			var html = '';
			if (pageData.systemCodes.length == 0)
				html += "<td colspan='12'>조회된 내용이 없습니다.</td>";

			$.each(pageData.systemCodes, function(idx, data) {
				html += '<tr>';
				html += '<td>' + data.code + '</td>';
				html += '<td>' + data.groupCode + '</td>';
				html += '<td>' + data.codeName + '</td>';
				html += '<td>' + (data.orderNo ? data.orderNo : '-') + '</td>';
				html += '<td>' + data.enable + '</td>';
				html += '<td>' + (data.description == null ? '' : data.description) + '</td>';
				html += '<td>'
						+ "<button type='button' class='btn default' onclick='view.modify(`" + data.code + "`); return false;'>수정</button>"
						+ "&nbsp;"
						+ "<button type='button' class='btn gray' onclick='view.remove(`" + data.code + "`); return false;'>삭제</button>"
						+ '</td>';
				html += '</tr>';
				
				view.systemCodeMap[data.code] = data;
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
		}
		
		
		view.reset();
	},
	
	validation: function() {

		var param = {
			action: document.getElementById('ui_action_btn').value,
			groupCode: document.getElementById('ui_groupCode').value,
			code: document.getElementById('ui_code').value,
			codeName: document.getElementById('ui_codeName').value,
			description: document.getElementById('ui_description').value,
			orderNo: document.getElementById('ui_orderNo').value,
			enable: document.getElementById('ui_enable').value
		};
		
		if (param.action == 'insert') {
			if (param.groupCode == '' || param.code == '') {
				alert('코드를 지정하세요.');
				return null;
			}
			
			if (param.codeName == '') {
				alert('코드 이름을 지정하세요.');
				return null;
			}
		}
		
		return param;
	},
	
	search: function(pageNo) {
		waffle.pagination.request({
			url: '/cms/system/systemCode',
			param: null,
			pageNo: pageNo,
			hashBang: null
		});
	},
	
	//  초기화
	reset: function() {
		document.getElementById('ui_groupCode').disabled = false;
		document.getElementById('ui_code').disabled = false;
		
		document.getElementById('ui_groupCode').value = '';
		document.getElementById('ui_code').value = '';
		document.getElementById('ui_codeName').value = '';
		document.getElementById('ui_description').value = '';
		document.getElementById('ui_orderNo').value = '';
		document.getElementById('ui_enable').value = 'Y';
		
		$('#ui_action_btn').html('추가하기');
		document.getElementById('ui_action_btn').value = 'insert';
	},

	// 코드 수정
	modify: function(code) {
		var codeInfo = view.systemCodeMap[code];

		document.getElementById('ui_groupCode').disabled = true;
		document.getElementById('ui_code').disabled = true;
		
		document.getElementById('ui_groupCode').value = codeInfo.groupCode;
		document.getElementById('ui_code').value = codeInfo.code;
		document.getElementById('ui_codeName').value = codeInfo.codeName;
		document.getElementById('ui_description').value = (codeInfo.description || '');
		document.getElementById('ui_orderNo').value = codeInfo.orderNo;
		document.getElementById('ui_enable').value = codeInfo.enable;
		
		$('#ui_action_btn').html('수정완료');
		document.getElementById('ui_action_btn').value = 'update';
		
		
		$('#ui_groupCode').scrollTo(300, -70, function() {
		});
	},

	// 코드 수정
	remove: function(code) {
		var codeInfo = view.systemCodeMap[code];
		
		var ret = confirm(codeInfo.codeName + '(' + codeInfo.code + ') 코드를 제거하시겠습니까?');
		if (ret == false)
			return;
		
		$.showMask('', '/cms/images/loading.png');
		$.ajax({
	        type: 'DELETE',
	        url: '/cms/system/systemCode/delete',
	        data: {
				code: codeInfo.code
			},
	        cache: false,
	        success: function(result) {
				alert('처리되었습니다.');
				location.reload();
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
				console.log(xhr.responseJSON || xhr.statusText);
				alert(xhr.responseJSON || xhr.statusText);
				$.hideMask();
	        }
	    });
	}
}
