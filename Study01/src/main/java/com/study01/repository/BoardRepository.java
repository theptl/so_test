package com.study01.repository;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.study01.common.BoardPostVO;

@Repository("boardRepository")
public interface BoardRepository {
	
	public int getBoardListCount(HashMap<String, Object> cond);
	
	public List<BoardPostVO> getBoardListVO(HashMap<String, Object> cond);
	
	public BoardPostVO getDetailData(HashMap<String, Object> cond);

}
