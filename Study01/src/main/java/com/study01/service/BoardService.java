package com.study01.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study01.common.BoardPostVO;
import com.study01.repository.BoardRepository;

@Service
public class BoardService {
	
	@Autowired private BoardRepository boardRepo;
	
	public HashMap<String, Object> GetPagingData(HashMap<String, Object> pagingRequestData) {
		
		int totalListCount = GetBoardListCount(pagingRequestData);
		
		HashMap<String, Object> pagingCalcData = pagingRequestData;
		
		pagingCalcData.put("totalListCount", totalListCount);
		
		HashMap<String, Object> pagingResponseData = Paging.PagingCalc(pagingCalcData);		

		return pagingResponseData;
	}
	
	public int GetBoardListCount(HashMap<String, Object> cond) {
		int result = boardRepo.getBoardListCount(cond);
		return result;
	}
	
	public List<BoardPostVO> GetBoardListVO(HashMap<String, Object> boradListRequestData) {
		
		HashMap<String, Object> boradListCalcData = BoardList.BoardListCalc(boradListRequestData);
		
		List<BoardPostVO> boradListResponseData = boardRepo.getBoardListVO(boradListCalcData);
		
		return boradListResponseData;
	}
	
	public BoardPostVO GetDetailData(HashMap<String, Object> cond) {
		BoardPostVO postDetailData = boardRepo.getDetailData(cond);
		return postDetailData;
	}

}
