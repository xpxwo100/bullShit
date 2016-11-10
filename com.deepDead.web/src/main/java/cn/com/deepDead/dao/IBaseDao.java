package cn.com.deepDead.dao;

import java.util.List;
import java.util.Map;

import org.hibernate.Session;

public interface IBaseDao<K,T> {
	public Session getSession();
	
	public boolean delete(T entity);
	
	public boolean deleteById(K id);
	
	public T get(K id);
	
	public boolean save(T entity);
	
	public boolean update(T entity);
	
	public List<Object> findBySql(String sql, Map<String, Object> paramMap);
}
