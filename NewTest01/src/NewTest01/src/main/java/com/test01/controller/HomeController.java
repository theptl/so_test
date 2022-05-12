package com.test01.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	@RequestMapping(value = {"/", "home"})
    public String home() {
        return "home";
    }
	
	
	@RequestMapping("detailpage")
    public String detailpage(Model model) {
        model.addAttribute("pageType", "detail");
//        return "detailpage";
        return "integratedpage";
    }
	
	
	@RequestMapping("modifypage")
    public String modifypage(Model model) {
		model.addAttribute("pageType", "modify");
        return "modifypage";
//        return "integratedpage";
    }
	
	
	@RequestMapping("createpage")
    public String createpage(Model model) {
		model.addAttribute("pageType", "create");
//        return "createpage";
        return "integratedpage";
    }
	
	
}
