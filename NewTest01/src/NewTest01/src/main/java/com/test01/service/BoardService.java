package com.test01.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test01.repository.BoardRepository;

@Service
public class BoardService {
	
	@Autowired private BoardRepository boardRepo;
	
	public int GetBoardListCount(HashMap<String, Object> cond) {
		int result = boardRepo.getBoardListCount(cond);
		return result;
	}
	
	
	public List<HashMap<String, Object>> GetBoardList(HashMap<String, Object> cond) {
		List<HashMap<String, Object>> result = boardRepo.getBoardList(cond);
		return result;
	}
	
	
	public void DelBoardList(HashMap<String, Object> cond) {
		boardRepo.delBoardList(cond);
	}
	
	
	public HashMap<String, Object> GetDetailData(HashMap<String, Object> cond) {
		HashMap<String, Object> result = boardRepo.getDetailData(cond);
		return result;
	}
	
	
	public void ModifyDetailData(HashMap<String, Object> cond) {
		boardRepo.modifyDetailData(cond);
	}
	
	
	public void CreateDetailData(HashMap<String, Object> cond) {
		boardRepo.createDetailData(cond);
	}
	
}
