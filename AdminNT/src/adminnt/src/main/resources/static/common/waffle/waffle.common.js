
if (typeof waffle == 'undefined') {
	var waffle = {};
}

waffle.on = function (namespace) {
	var parts = namespace.split('.');
	var node = waffle, i;

	
	//  루트 제거
	if (parts[0] == waffle) {
		parts = parts.slice(1);
	}
	
	for (var i = 0 ; i < parts.length ; i += 1) {
		//  프로퍼티가 없으면 생성
		if (typeof node[parts[i]] == 'undefined') {
			node[parts[i]] = {};
		}
		
		node = node[parts[i]];
	}

	return node;
};





////////////////////////////////////////////////////////////////////////////////////////////////////
//  Extentions
(function() {
	/*
	 * 문자열의 길이가 maxLen을 넘어갈 경우 이하 문자열들을 말줄임 처리
	 */
	String.prototype.abbreviation = function(maxLen) {
		if (this.length > maxLen) {
			return this.substr(0, maxLen) + "...";
		}
		return this;
	}
	
	/*
	 * HTML 특수(Escape)문자 변환
	 */
	String.prototype.escapeHtml = function() {
	    return this
		         .replace(/&/g, "&amp;")
		         .replace(/</g, "&lt;")
		         .replace(/>/g, "&gt;")
		         .replace(/"/g, "&quot;")
		         .replace(/'/g, "&#039;");
	}
	String.prototype.unescapeHtml = function() {
		return this.replace(/&amp;/g, '&')
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
					.replace(/&quot;/g, '"')
					.replace(/&#039;/g, "'")
					.replace(/&#63;/g, '?');
	}
	
	String.prototype.getFilename = function() {
		return this.replace(/^.*(\\|\/|\:)/, '');
	}
	
	String.prototype.getFileExtension = function() {
		var regex = /(?:\.([^.]+))?$/;
		var parts = regex.exec(this);
		
		if (parts.length > 1)
			return parts[1];
		
		return "";
	}

	String.prototype.isNumber = function() {
		var reg = /^[0-9]*$/;
		return reg.test(this);
	}

	String.prototype.isDouble = function() {
		var reg = /^(\d{1,2}([.]\d{0,2})?)?$/;
		return reg.test(this);
	}

	String.prototype.isDate = function() {
		var reg = /^(19[7-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
		return reg.test(this);
	}

	String.prototype.isEmail = function() {
		var reg = new RegExp("^[\\w\\-]+(\\.[\\w\\-_]+)*@[\\w\\-]+(\\.[\\w\\-]+)*(\\.[a-zA-Z]{2,3})$", "gi");
		return reg.test(this)
	}

	String.prototype.isPhone = function() {
		var reg = /^\d{2,3}-\d{3,4}-\d{4}$/;
		return reg.test(this);
	}
	
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
	
    String.prototype.padLeft = function(n, padString){
    		return Array(n - String(this).length + 1).join(padString || '0') + this;
    }
    
    String.prototype.replaceAll = function(searchStr, replaceStr) {
    	  return this.split(searchStr).join(replaceStr);
    }
    
    String.prototype.toDateFormat = function(srcFmt, convFmt) {
        var yyyy, mm, dd;
        var idx = 0, ret = '';


        while (idx < srcFmt.length) {
            if (srcFmt.substring(idx,  idx + 4) == 'yyyy') {
                yyyy = this.substring(idx,  idx + 4);
                idx += 4;
            }
            else if (srcFmt.substring(idx,  idx + 2) == 'yy') {
                yyyy = '00' + this.substring(idx, idx + 2);
                idx += 2;
            }
            else if (srcFmt.substring(idx,  idx + 2) == 'mm') {
                mm = this.substring(idx,  idx + 2);
                idx += 2;
            }
            else if (srcFmt.substring(idx,  idx + 2) == 'dd') {
                dd = this.substring(idx,  idx + 2);
                idx += 2;
            }
            else
            	idx += 1;
        }


        idx = 0;
        while (idx < convFmt.length) {
            if (convFmt.substring(idx,  idx + 4) == 'yyyy') {
                ret += yyyy;
                idx += 4;
            }
            else if (convFmt.substring(idx,  idx + 2) == 'yy') {
                ret += yyyy.substring(2, 4);
                idx += 2;
            }
            else if (convFmt.substring(idx,  idx + 2) == 'mm') {
                ret += mm;
                idx += 2;
            }
            else if (convFmt.substring(idx,  idx + 2) == 'dd') {
                ret += dd;
                idx += 2;
            }
            else {
                ret += convFmt.substring(idx, idx + 1);
                idx += 1;
            }
        }

        return ret;
    }
    
    Date.prototype.format = function(format){
		var dt = this;
		var dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
	    var z = {
	        M: dt.getMonth() + 1,
	        d: dt.getDate(),
	        h: dt.getHours(),
	        m: dt.getMinutes(),
	        s: dt.getSeconds(),
	        w: dayOfWeek[dt.getDay()]
	    };
	    format = format.replace(/(M+|d+|h+|m+|s+|w)/g, function(v) {
	        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
	    });

	    return format.replace(/(y+)/g, function(v) {
	        return dt.getFullYear().toString().slice(-v.length)
	    });
    }
})();





(function($){
	 /*====================================================================================
    ' 함수명 : $.showMask(msg, image)
    ' 인  수 : msg - 로딩 메세지
    ' 기  능 : 페이지 마스크 처리 및 로딩문구 노출
    ' 리턴값 : 없음.
    '=====================================================================================*/	
	$.showMask = function(msg, image){
		
		image = (image || '/cms/images/loading.png');
		
		$.blockUI({
			message: "<img src='" + image + "' alt=''>",
            css: {
            	 border: 'none',
                 padding: '15px',
                 backgroundColor: "rgba(255, 255, 255, 0)",
                 '-webkit-border-radius': '10px',
                 '-moz-border-radius': '10px',
                 opacity: 5,
                 color: 'rgba(255, 255, 255, 0)',
                zIndex: 99999999999999
            },
            overlayCSS: {
            	backgroundColor: '#ffffff',
                opacity: 0.6,
                cursor: 'wait',
                zIndex: 99999999999000
            }
        });
	},
	/*====================================================================================
    ' 함수명 : $.hideMask(msg)
    ' 인  수 : msg - 완료 메세지
    ' 기  능 : 페이지 마스크 제거
    ' 리턴값 : 없음.
    '=====================================================================================*/
	$.hideMask = function(msg, action){
		if (msg == "" || msg == undefined) {
            //setTimeout($.unblockUI(), 9000);
            $.unblockUI();
        }
        else {
            $.unblockUI({
            		onUnblock: function () {
            			alert(msg);
            			if (action != undefined) {
            				action();
                    }
                }
            });
        }
	},
	
	
	
	
	
	$.setCookie = function(name, value, seconds) {
		var date = new Date();
		date.setTime(date.getTime() + seconds * 1000);
		document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
	};
	
	
	$.getCookie = function(name) {
		var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		return value ? value[2] : null;
	};





	////////////////////////////////////////////////////////////////////////////////
	//  waffle.string
	var string = waffle.on("string");
	
	
	
	
	
	/*
	 * URL Parameter 값 가져오기
	 */
	string.getUrlParameter = function(name, defaultValue, url) {
	    if (!url) {
	    	url = window.location.href;
	    }
	    
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    
	    if (!results) {
    		if (defaultValue || defaultValue == '')
    			return defaultValue;
    	
    		return null;
	    }
	    if (!results[2]) {
    		return '';
	    }
	    
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	    /*
	    
	    paramName = paramName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	    
	    var regexS = "[\\?&]" + paramName + "=([^&#]*)";
	    var regex = new RegExp(regexS);
	    var results = regex.exec(url);
	    
	    return (results == null ? null : decodeURIComponent(results[1]));
	    
	    */
	}
	
	
	string.parameterize = function(obj, prefix) {
		var str = [], p;
		
		for (p in obj) {
			if (obj.hasOwnProperty(p)) {
				var k = prefix ? prefix + "[" + p + "]" : p,
						v = obj[p];
				str.push((v !== null && typeof v === "object") ?
						waffle.string.parameterize(v, k) :
							encodeURIComponent(k) + "=" + encodeURIComponent(v));
			}
		}
		return str.join("&");
	}
    
	string.prototype.numberWithCommas = function() {
        return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }




	
	////////////////////////////////////////////////////////////////////////////////
	//  waffle.ui
	var ui = waffle.on("ui");
	
	
	
	
	
	ui.attachCKEditor = function(elementId, height) {
		
		CKEDITOR.config.enterMode = CKEDITOR.ENTER_BR;
		CKEDITOR.replace(elementId, {
			filebrowserUploadUrl: '/sys/file/ckeditor/upload',
			toolbar: [
				{ name: 'clipboard', items: [ 'Undo', 'Redo' ] },
				{ name: 'document', items: [ 'Find','Replace'] },
				{ name: 'styles', items: [ 'Styles', 'Format' ] },
				{ name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
			    { name: 'paragraph', items : [ 'Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
				{ name: 'links', items: [ 'Link', 'Unlink' ] },
				{ name: 'insert', items: [ 'Image'/*, 'EmbedSemantic'*/, 'Table' ] },
				['Source'/*, 'Table'*/ ]
			],
			customConfig: '',
			
			//Can I tell CKeditor to NOT TOUCH my HTML code?
			fillEmptyBlocks : false,
			autoParagraph : false,
			allowedContent : true,
			
			
			extraPlugins: 'autoembed,embedsemantic,image2,uploadimage',
			//removePlugins: 'image',
			// Make the editing area bigger than default.
			height: height || 350,
			contentsCss: [ 'https://cdn.ckeditor.com/4.8.0/standard-all/contents.css' ],
			bodyClass: 'article-editor',
			format_tags: 'p;h1;h2;h3;pre',
			removeDialogTabs: 'image:advanced;link:advanced',
			stylesSet: [
				/* Inline Styles */
				{ name: 'Marker',			element: 'span', attributes: { 'class': 'marker' } },
				{ name: 'Cited Work',		element: 'cite' },
				{ name: 'Inline Quotation',	element: 'q' },
				/* Object Styles */
				{
					name: 'Special Container',
					element: 'div',
					styles: {
						padding: '5px 10px',
						background: '#eee',
						border: '1px solid #ccc'
					}
				},
				{
					name: 'Compact table',
					element: 'table',
					attributes: {
						cellpadding: '5',
						cellspacing: '0',
						border: '1',
						bordercolor: '#ccc'
					},
					styles: {
						'border-collapse': 'collapse'
					}
				},
				{ name: 'Borderless Table',		element: 'table',	styles: { 'border-style': 'hidden', 'background-color': '#E6E6FA' } },
				{ name: 'Square Bulleted List',	element: 'ul',		styles: { 'list-style-type': 'square' } },
				/* Widget Styles */
				// We use this one to style the brownie picture.
				{ name: 'Illustration', type: 'widget', widget: 'image', attributes: { 'class': 'image-illustration' } },
				// Media embed
				{ name: '240p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-240p' } },
				{ name: '360p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-360p' } },
				{ name: '480p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-480p' } },
				{ name: '720p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-720p' } },
				{ name: '1080p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-1080p' } }
			],
			extraAllowedContent: 'iframe[*]'
		} );
	}
	
	
	
	
	
	ui.getCheckedRadioValue = function(elementName) {
		return $(":radio[name='" + elementName + "']:checked").val();
	}
	
	ui.setRadioCheck = function(elementName) {
		$(":radio[name=isVisible]:input[value='" + elementName + "']").attr("checked", true);
	}
    
    ui.toDateStr = function(date) {
		if (!date)
			return null;
	
		var weekday = ['일', '월', '화', '수', '목', '금', '토'];
		var regDate = new Date(date);
		var str = regDate.format('yyyy.MM.dd') + '(' + weekday[regDate.getDay()] + ')';
		return str;
    }
    
    ui.scrollTo = function (target, speed, offsetY, completeCallback) {
	    if (typeof speed != 'number')
	        speed = 100;
	    
	    if (typeof offsetY != 'number')
	    	offsetY = 0;
	    

	    if (typeof completeCallback == 'function') {
		    $('html, body').animate({
		        scrollTop: parseInt($(target).offset().top + offsetY)
		    }, speed).promise().done(completeCallback);
	    }
	    else {
		    $('html, body').animate({
		        scrollTop: parseInt($(target).offset().top + offsetY)
		    }, speed);
	    }
	};
    
    
    
    

	ui.control.input = function(target, val) {
		if (typeof val == 'undefined') {
			return $(target).val();
		}
		
		$(target).val(val);
		return val;
	}
	
	ui.control.select = function(target, val) {
		if (typeof val == 'undefined') {
			return $(target).val();
		}
		
		$(target).val(val);
		return val;
	}
	
	ui.control.select_text = function(target, txt) {
		if (typeof txt == 'undefined') {
			return $(target + ' option:checked').text();
		}
		
		$(target + ' option:checked').text(txt);
		return txt;
	}

	ui.control.checked = function(target, flag) {
		if (typeof flag == 'undefined') {
			return $(target).is(":checked");
		}
		
		$(target).prop("checked", flag);
	}
	
	ui.control.checked_val = function(name, val) {
		var target = $(name + ':checked');
		
		if (typeof val == 'undefined') {
			if (target.length == 0)
				return null;
			
			var ret = [];
			$.each(target, function() {
				ret.push($(this).val());
			});
			return ret;
		}
		
		$(name).each(function() {
			this.checked = (this.value == val);
		});
		return target.val();
	}


	/*
	input_bind({
	    target: '#test',
	    preventPaste: true,
	    preventSChar: true,
	    numberOnly: true,
	    numberWithComma: true,
	    maxLength: 10,
	    regExp: '',
	    autoReplace: 'Y',
	    onChanged: function(data) {
		    console.log(data);
		},
	    onBlur: function(data) {
		    console.log(data);
		},
	    onError: function(data) {
		    console.log(data);
		}
	});
	*/
	ui.control.input_bind = function(param) {
		var callbackFn = function(fn, target, cmd, data) {
			if (typeof fn == 'function') {
				var ret = fn({
					target: target
					, cmd: (typeof cmd == 'undefined' ? null : cmd)
					, data: (typeof data == 'undefined' ? null : data) 
				});
				
				return ret;
			}
		};
		
		//  븉여넣기 방지(preventPaste)
		if (param.preventPaste == true) {
			$(param.target).bind('paste', function(e) {
				callbackFn(param.onError, $(this), 'paste');
				return false;
			});
		}


		var keydownHandler = function(e) {
			//console.log(e.keyCode);
			return true;
		};
		var keyupHandler = function(e) {
		
			try {
				var changed = true;
				var txt = $(this).val();
				

				//  숫자만
				if (param.numberOnly == true) {
					txt = txt.replaceAll(/[^0-9]/g, '');
					
					//  천단위 콤마인 경우 , 제거
					if (param.numberWithComma == true) {
						txt = txt.replaceAll(',', '');
						if (txt.length > 0)
							txt = parseInt(txt) + '';
					}
				}
				
				//  특수문자 방지(preventSChar)
				if (param.preventSChar == true) {
					var regEx = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
					txt = txt.replace(regEx, '');
				}
				
				//  RegExp 적용(regExp)
				if (param.regExp) {
					txt = txt.replace(param.regExp, '');
				}
				
				//  최대길이 (maxLength)
				if (param.maxLength) {
					if (txt.length > param.maxLength) {
						txt = txt.substring(0, param.maxLength);
						
						callbackFn(param.onError, $(this), 'maxLength', {curLength: txt.length, maxLength: param.maxLength});
						changed = false;
					}
				}

				
				//  천단위 콤마(numberWithComma)
				var applyComma = function(txt) {
					if (param.numberOnly == true
						&& param.numberWithComma == true) {
						txt = waffle.ui.numberWithCommas(txt);
					}
					return txt;
				};

				
				
				//  리턴값이 있으면 강제적용
				var retVal = callbackFn(param.onChanged, $(this), '', {val: txt});
				if (typeof retVal == 'string' || typeof retVal == 'number') {
					txt = applyComma(retVal);
					$(this).val(txt);
				}
				else {
					$(this).val(txt);
				}
				
				
				/*
				//#!  changed 용도가 애매한 듯....
				if (changed == false) {
					txt = applyComma(txt);
					$(this).val(txt);
				}
				
				if (changed == true) {
					//  리턴값이 있으면 강제적용
					var retVal = callbackFn(param.onChanged, $(this), '', {val: txt});
					if (typeof retVal == 'string' || typeof retVal == 'number') {
						txt = applyComma(retVal);
						$(this).val(txt);
					}
				}
				*/
			} catch (err) {
				console.log($(this));
				console.log(err);
				callbackFn(param.onError, $(this), 'exception', {msg: e.message});
			}
		};


		$(param.target).unbind('keydown', keydownHandler);
		$(param.target).unbind('change keyup', keyupHandler);
		
		$(param.target).bind('keydown', keydownHandler);
		$(param.target).bind('change keyup', keyupHandler);
		
		
		//  Blur event
		$(param.target).blur(function() {
			callbackFn(param.onBlur, $(this), '', {val: $(this).val()});
		});
	}
})(jQuery);
