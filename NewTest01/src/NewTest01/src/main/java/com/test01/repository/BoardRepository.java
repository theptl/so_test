package com.test01.repository;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository("boardRepository")
public interface BoardRepository {
	
	public int GetBoardListCount(HashMap<String, Object> cond);
	
	public List<HashMap<String, Object>> GetBoardList(HashMap<String, Object> cond);
	
	public void DelBoardList(HashMap<String, Object> cond);
	
	public HashMap<String, Object> GetDetailData(HashMap<String, Object> cond);
	
	public void ModifyDetailData(HashMap<String, Object> cond);

	public void CreateDetailData(HashMap<String, Object> cond);

}
