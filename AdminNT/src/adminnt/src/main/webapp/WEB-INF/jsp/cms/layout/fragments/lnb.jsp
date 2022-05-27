<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

		<div id="page-sidebar">
			<ul class="page-sidebar-menu">
				<li class="nav-item" th:classappend="${lnbMenuCategory eq 0 ? 'active' : ''}" id="lnb_menu0">
					<div class="depth1" ><a href="#" class="icon-layers arrow" >System</a></div>
					<div class="depth2">
						<ul>
							<li><a href="/cms/system/systemCode">시스템코드</a></li>
							<li><a href="/cms/system/file">파일관리</a></li>
						</ul>
					</div>
				</li>
				<li class="nav-item" th:classappend="${lnbMenuCategory eq 1 ? 'active' : ''}" id="lnb_menu1">
					<div class="depth1" ><a href="#" class="icon-layers arrow" >Board</a></div>
					<div class="depth2">
						<ul>
							<li><a href="/cms/board/articles">Articles</a></li>
							<li><a href="/cms/lecture/list">Lectures</a></li>
							<li><a href="/cms/board/contact">Contact</a></li>
						</ul>
					</div>
				</li>
				<li class="nav-item" th:classappend="${lnbMenuCategory eq 2 ? 'active' : ''}" id="lnb_menu2">
					<div class="depth1" ><a href="#" class="icon-layers arrow" >Resource</a></div>
					<div class="depth2">
						<ul>
							<li><a href="/cms/board/articles?boardCode=ResourceType">자원관리</a></li>
						</ul>
					</div>
				</li>
				<li class="nav-item" th:classappend="${lnbMenuCategory eq 3 ? 'active' : ''}" id="lnb_menu3">
					<div class="depth1" ><a href="#" class="icon-layers arrow" >Career</a></div>
					<div class="depth2">
						<ul>
							<li><a href="/cms/career/company">회사이력 관리</a></li>
							<li><a href="/cms/career/project">프로젝트 관리</a></li>
						</ul>
					</div>
				</li>
			</ul>
			
			<script type="text/javascript">
			function activeNav(no){
				$(".nav-item").removeClass("active");
				
				$('#lnb_menu' + no).addClass("active");
				pageNav();
			}
			</script>
			
		</div>
