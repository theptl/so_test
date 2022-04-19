package com.test01.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.test01.service.BoardService;

@RestController
@RequestMapping("/api/")
public class ApiController {
	
	@Autowired private BoardService boardService;
	
	
	
	@RequestMapping(value="/getboardlist", method=RequestMethod.GET)	
	public List<HashMap<String,Object>> getboardlist(HttpServletRequest request) {
		
		String orderby = request.getParameter("orderby");
			
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("orderby", orderby);
		
		List<HashMap<String, Object>> result = boardService.getBoardList(param);
		
		return result;

	}
	
	
	
	@RequestMapping(value="/delboardlist", method=RequestMethod.PUT)	
	public void delboardlist(HttpServletRequest request) {
		
		String _delidx = request.getParameter("delidx");
		String[] delidxArray = _delidx.split(",");
		delidxArray.toString();
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("delidxArray", delidxArray);
		
		boardService.delBoardList(param);
	
	}	
	
	
	
	@RequestMapping(value="/getdetaildata", method=RequestMethod.GET)	
	public HashMap<String,Object> getdetaildata(HttpServletRequest request) {
		
		String idx = request.getParameter("idx");
			
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("idx", idx);
		
		HashMap<String, Object> result = boardService.getDetailData(param);
		
		return result;

	}
	
	
	
	@RequestMapping(value="/modifydetaildata", method=RequestMethod.POST)	
	public void modifydetaildata(HttpServletRequest request) {
		
		String idx = request.getParameter("idx");
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String regdate = request.getParameter("regdate");
			
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("modifyIdx", idx);
		param.put("modifyTitle", title);
		param.put("modifyContent",content);
		param.put("modifyRegdate", regdate);
		
		boardService.modifyDetailData(param);

	}	
	
	
	
	@RequestMapping(value="/createdetaildata", method=RequestMethod.POST)	
	public void createdetaildata(HttpServletRequest request) {
		
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String writer = request.getParameter("writer");
		String regdate = request.getParameter("regdate");
			
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("createTitle", title);
		param.put("createContent",content);
		param.put("createWriter",writer);
		param.put("createRegdate", regdate);
		
		boardService.createDetailData(param);

	}		
	

}
