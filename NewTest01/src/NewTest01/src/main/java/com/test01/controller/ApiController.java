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

	
	@RequestMapping(value="/getpagingdata", method=RequestMethod.GET)	
	public HashMap<String,Object> GetPagingData(HttpServletRequest request) {
		
		int pageNo = Integer.parseInt(request.getParameter("pageNo"));
		if(pageNo < 1) {
			pageNo = 1;
		}
		
		String searchword = request.getParameter("searchword");
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("searchword", searchword);
		
		int totalListCount = boardService.GetBoardListCount(param);
		
		
		int displayPageNoCount = 3;
		int itemCountPerPage  = 5;
		
		int lastPage = (int) Math.ceil((double)totalListCount / (double)itemCountPerPage);
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		int viewEndPage = ((int) Math.ceil((double)pageNo / (double)displayPageNoCount)) * displayPageNoCount;		
		if (pageNo > lastPage) {
			pageNo = lastPage;
		} if(viewEndPage > lastPage) {
			viewEndPage = lastPage;
		}
		
		int viewStartPage = viewEndPage - displayPageNoCount + 1;
		if (viewStartPage < 1) {
			viewStartPage = 1;
			pageNo = 1;
		} else if (lastPage - viewEndPage < lastPage % displayPageNoCount) {			
			viewStartPage = lastPage - (lastPage % displayPageNoCount) + 1;	
		}

		result.put("viewStartPage", viewStartPage);
		result.put("viewEndPage", viewEndPage);
		result.put("pageNo", pageNo);

		return result;

	}
	
	
	
	@RequestMapping(value="/getboardlist", method=RequestMethod.GET)	
	public List<HashMap<String,Object>> GetBoardList(HttpServletRequest request) {
		
		String orderby = request.getParameter("orderby");
		int pageNo = Integer.parseInt(request.getParameter("pageNo"));
		String searchword = request.getParameter("searchword");
		
		int itemCountPerPage  = 5;
		int viewMinIdx = (pageNo * itemCountPerPage ) - itemCountPerPage;
		
		if (viewMinIdx < 0) {
			viewMinIdx = 0;
		}
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("orderby", orderby);
		param.put("viewMinIdx", viewMinIdx);
		param.put("itemCountPerPage", itemCountPerPage);
		param.put("searchword", searchword);
		
		List<HashMap<String, Object>> result = boardService.GetBoardList(param);
		
		return result;

	}
	
	
	
	@RequestMapping(value="/delboardlist", method=RequestMethod.PUT)	
	public void DelBoardList(HttpServletRequest request) {
		
		String _delIdx = request.getParameter("delIdx");
		String[] delIdxArray = _delIdx.split(",");
		delIdxArray.toString();
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("delidxArray", delIdxArray);
		
		boardService.DelBoardList(param);
	
	}	
	
	
	
	@RequestMapping(value="/getdetaildata", method=RequestMethod.GET)	
	public HashMap<String,Object> GetDetailData(HttpServletRequest request) {
		
		String idx = request.getParameter("idx");
			
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("idx", idx);
		
		HashMap<String, Object> result = boardService.GetDetailData(param);
		
		return result;

	}
	
	
	
	@RequestMapping(value="/modifydetaildata", method=RequestMethod.POST)	
	public void ModifyDetailData(HttpServletRequest request) {
		
		String idx = request.getParameter("idx");
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String regdate = request.getParameter("regdate");
			
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("modifyIdx", idx);
		param.put("modifyTitle", title);
		param.put("modifyContent",content);
		param.put("modifyRegdate", regdate);
		
		boardService.ModifyDetailData(param);

	}	
	
	
	
	@RequestMapping(value="/CreateDetailData", method=RequestMethod.POST)	
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
		
		boardService.CreateDetailData(param);

	}
	

}
