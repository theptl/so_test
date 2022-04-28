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
		int result = boardRepo.GetBoardListCount(cond);
		return result;
	}
	
	
	public List<HashMap<String, Object>> GetBoardList(HashMap<String, Object> cond) {
		List<HashMap<String, Object>> result = boardRepo.GetBoardList(cond);
		return result;
	}
	
	
	public void DelBoardList(HashMap<String, Object> cond) {
		boardRepo.DelBoardList(cond);
	}
	
	
	public HashMap<String, Object> GetDetailData(HashMap<String, Object> cond) {
		HashMap<String, Object> result = boardRepo.GetDetailData(cond);
		return result;
	}
	
	
	public void ModifyDetailData(HashMap<String, Object> cond) {
		boardRepo.ModifyDetailData(cond);
	}
	
	
	public void CreateDetailData(HashMap<String, Object> cond) {
		boardRepo.CreateDetailData(cond);
	}
	
}
