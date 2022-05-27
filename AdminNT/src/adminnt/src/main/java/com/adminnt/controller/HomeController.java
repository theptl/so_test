package com.adminnt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	@RequestMapping(value = {"/", "/cms", "/cms/login"})
    public String login() {		
		return "cms/login";	
	}
	
	@RequestMapping(value = {"/cms/dashboard"})
    public String dashboard() {		
		return "cms/dashboard";	
	}
	
	@RequestMapping(value = {"/cms/board/articles"})
	public String articles() {		
		return "/cms/board/articles";	
	}
	
	@RequestMapping(value = {"/cms/board/articlesDetail"})
	public String articlesDetail() {		
		return "/cms/board/articlesDetail";	
	}
	
	@RequestMapping(value = {"cms/lecture/list"})
	public String lectureList() {		
		return "/cms/lecture/list";	
	}
	
	@RequestMapping(value = {"/cms/lecture/detail"})
	public String lecture() {		
		return "/cms/lecture/detail";	
	}
	
	@RequestMapping(value = {"/cms/board/contact"})
	public String contact() {		
		return "/cms/board/contact";	
	}
	
	@RequestMapping(value = {"/cms/board/contactDetail"})
	public String contactDetail() {		
		return "/cms/board/contactDetail";	
	}

}
