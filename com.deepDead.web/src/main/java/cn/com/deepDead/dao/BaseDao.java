package cn.com.deepDead.dao;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseDao<K,T> implements IBaseDao<K, T>{

	@Autowired
	private SessionFactory sessionFactory;
	private static Logger logger = Logger.getLogger(BaseDao.class);
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	@Override
	public boolean delete(T entity) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deleteById(K id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public T get(K id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean save(T entity) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean update(T entity) {
		// TODO Auto-generated method stub
		return false;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object> findBySql(String sql, Map<String, Object> paramMap) {
		try {
			Query query =  getSessionFactory().openSession().createSQLQuery(sql);
			query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
			if (paramMap != null && paramMap.size() != 0) {
				Iterator<String> iter = paramMap.keySet().iterator();
				while (iter.hasNext()) {
					String key = iter.next();
					Object param = paramMap.get(key);
					if (param instanceof Collection) {
						query.setParameterList(key, (Collection) param);
					}
					else {
						query.setParameter(key, param);
					}
				}
			}
			return query.list();
		} catch (Exception e) {
			logger.error("Error Sql : "+sql);
			throw e;
		}
	}

}
