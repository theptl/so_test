package com.test01.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	@RequestMapping("/")
    public String home() {
        return "home";
    }
	
	
	@RequestMapping("detailpage")
    public String detailpage() {
        return "detailpage";
    }
	
	
	@RequestMapping("modifypage")
    public String modifypage() {
        return "modifypage";
    }
	
	
	@RequestMapping("createpage")
    public String createpage() {
        return "createpage";
    }
	
	
	
}
