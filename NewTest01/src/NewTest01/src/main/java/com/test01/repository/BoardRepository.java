package com.test01.repository;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository("boardRepository")
public interface BoardRepository {
	
	public int getBoardListCount(HashMap<String, Object> cond);
	
	public List<HashMap<String, Object>> getBoardList(HashMap<String, Object> cond);
	
	public void delBoardList(HashMap<String, Object> cond);
	
	public HashMap<String, Object> getDetailData(HashMap<String, Object> cond);
	
	public void modifyDetailData(HashMap<String, Object> cond);

	public void createDetailData(HashMap<String, Object> cond);

}
