package com.test01.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test01.repository.BoardRepository;

@Service
public class BoardService {
	
	@Autowired private BoardRepository boardRepo;
	
	public int getBoardListCount() {
		int result = boardRepo.getBoardListCount();
		return result;
	}
	
	
	public List<HashMap<String, Object>> getBoardList(HashMap<String, Object> cond) {
		List<HashMap<String, Object>> result = boardRepo.getBoardList(cond);
		return result;
	}
	
	
	public void delBoardList(HashMap<String, Object> cond) {
		boardRepo.delBoardList(cond);
	}
	
	
	public HashMap<String, Object> getDetailData(HashMap<String, Object> cond) {
		HashMap<String, Object> result = boardRepo.getDetailData(cond);
		return result;
	}
	
	
	public void modifyDetailData(HashMap<String, Object> cond) {
		boardRepo.modifyDetailData(cond);
	}
	
	
	public void createDetailData(HashMap<String, Object> cond) {
		boardRepo.createDetailData(cond);
	}
	
}