package com.test01.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.test01.service.BoardService;

@Controller
public class BoardController {
	
	@Autowired private BoardService boardService;
	

	@RequestMapping(value="/board", method=RequestMethod.GET)
    public String board(Model model, HttpServletRequest request) {		
		
		int pageNo = 1;
		
		String _pageNo = request.getParameter("pageNo");
		
		try {			
			pageNo = Integer.parseInt(_pageNo);
		} catch (Exception e) {}
		
		String searchword = request.getParameter("searchword");
		
		HashMap<String,Object> pagingData = GetPagingData(pageNo, searchword);		
		
		List<HashMap<String,Object>> boardListData = GetBoardList(pageNo, searchword);
		
		model.addAttribute("pagingData", pagingData);
		
		model.addAttribute("boardListData", boardListData);

		return "/board";
    }
	
	
	public HashMap<String,Object> GetPagingData(int pageNo, String searchword) {
		
		int displayPageNoCount = 3;
		int itemCountPerPage  = 5;
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("searchword", searchword);		
		int totalListCount = boardService.GetBoardListCount(param);
		
		
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

		result.put("totalListCount", totalListCount);
		result.put("viewStartPage", viewStartPage);
		result.put("viewEndPage", viewEndPage);
		result.put("pageNo", pageNo);
		result.put("searchword", searchword);

		return result;

	}
	
	
	
	public List<HashMap<String,Object>> GetBoardList(int pageNo, String searchword) {
		
		String orderby = "idx";
		
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
	
}
