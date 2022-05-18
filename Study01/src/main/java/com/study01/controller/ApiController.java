package com.study01.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.study01.common.BoardPostVO;
import com.study01.service.BoardService;

@RestController
@RequestMapping("/api/")
public class ApiController {
	
	@Autowired private BoardService boardService;
	
	@RequestMapping(value="/getpagingdata", method=RequestMethod.GET)	
	public HashMap<String,Object> GetPagingData(HttpServletRequest request) {
		
		// pagingRequestData - pageNo
		int pageNo = Integer.parseInt(request.getParameter("pageNo"));
		
		// pageNo 오류 시, 초기값 설정.
		if(pageNo < 1) {
			pageNo = 1;
		}
		
		// pagingRequestData - searchWord 
		String searchWord = request.getParameter("searchWord");
		
		// 컨트롤러에 pagingRequestData 전달.
		HashMap<String, Object> pagingRequestData = new HashMap<String, Object>();
		pagingRequestData.put("pageNo", pageNo);
		pagingRequestData.put("searchWord", searchWord);
		
		// 컨트롤러에 pagingResponseData 요청.		
		HashMap<String, Object> pagingResponseData = boardService.GetPagingData(pagingRequestData);	

		return pagingResponseData;
	}
	
	
	@RequestMapping(value="/getboardlist", method=RequestMethod.GET)	
	public List<BoardPostVO> GetBoardList(HttpServletRequest request) {
		
		int pageNo = Integer.parseInt(request.getParameter("pageNo"));
		String searchWord = request.getParameter("searchWord");
		
		HashMap<String, Object> boradListRequestData = new HashMap<String, Object>();
		boradListRequestData.put("pageNo", pageNo);
		boradListRequestData.put("searchWord", searchWord);
		
		List<BoardPostVO> boradListResponseData = boardService.GetBoardListVO(boradListRequestData);
		
		return boradListResponseData;

	}
	
	
	@RequestMapping(value="/getdetaildata", method=RequestMethod.GET)	
	public BoardPostVO GetDetailData(HttpServletRequest request) {
		
		String idx = request.getParameter("idx");
			
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("idx", idx);
		
		BoardPostVO postDetailData = boardService.GetDetailData(param);
		
		return postDetailData;

	}

}
