package cn.com.deepDead.util;

import java.io.Serializable;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Repository;


@SuppressWarnings("deprecation")
@Repository
public class HibernateUtil {
	
	protected Logger log = Logger.getLogger(HibernateUtil.class);
	public static SessionFactory sessionFactory;
	
	@Resource(name="hibernateTemplate")
	private HibernateTemplate hibernateTemplate; 
	
	public static final ThreadLocal<Session> session = new ThreadLocal<Session>();
	/**
	 * 得到Session
	 * @return
	 * @throws HibernateException
	 */
	public  Session currentSession() throws HibernateException {
		if(sessionFactory == null){
			sessionFactory = hibernateTemplate.getSessionFactory();
		}
		Session s = (Session) session.get();
		if (s == null) {
			if(sessionFactory != null){
				s = sessionFactory.openSession();
				session.set(s);
			}
		}
		log.debug(s.toString());
		return s;
	}
	/**
	 * 关闭Session
	 * @throws HibernateException
	 */
	public void closeSession() throws HibernateException {
		Session s = (Session) session.get();
		if (s != null) {
			s.close();
		}
		session.set(null);
	}
	/**
	 * 根据id查实体
	 * @param clazz
	 * @param id
	 * @return
	 */
	public synchronized <T> T selectById(Class<T> clazz,int id){
		try {
			Session session = currentSession();
			Object obj = session.get(clazz, (Serializable)id);
			return (T) obj;
		} catch (Exception e) {
			log.error("HibernateUtil.selectById() :" + e.getMessage(), e);
			throw e;
		}finally{
			closeSession();
		}
	}
	/**
	 * 保存实体
	 * @param entity
	 * @return
	 */
	public synchronized <T> boolean save(T entity){
		try {
			currentSession().save(entity);
			return true;
		} catch (Exception e) {
			log.error("HibernateUtil.save() :" + e.getMessage(), e);
			throw e;
		}finally{
			closeSession();
		}
	}
	public synchronized <T> boolean update(T entity) {
		try {
			currentSession().update(entity);
			// session.flush();
			return true;
		} catch (Exception e) {
			log.error("BaseDao.update() :" + e.getMessage(), e);
			throw e;
		}finally{
			closeSession();
		}
	}
	/**
	 * 通过传入 sql,参数,结果集格式 查询
	 * @param sql
	 * @param paramMap 参数
	 * @param resultTransformer 结果集格式
	 * @return
	 */
	public synchronized Object findBySql(String sql, Map<String, Object> paramMap) {
		try {
			Query query = currentSession().createSQLQuery(sql);
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
			log.error("Error Sql : "+sql);
			throw e;
		}finally{
			if(paramMap != null){
				log.info("findBySql : "+sql);
				log.info("paramMap: " + paramMap.toString());
			}
			closeSession();
		}
	}
	/**
	 * hql查询
	 * @param hql
	 * @param paramMap
	 * @return
	 */
	public  List<? extends Object> findList(String hql, Map<String, Object> paramMap) {
		try {
			Query query = currentSession().createQuery(hql);
			if (paramMap != null && paramMap.size() != 0) {
				Iterator<String> iter = paramMap.keySet().iterator();
				while (iter.hasNext()) {
					String key = iter.next();
					Object param = paramMap.get(key);
					if(param instanceof List) {
						query.setParameterList(key, (List)param);
					} else {
						query.setParameter(key, param);
					}
				}
			}
			return query.list();
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw e;
		}finally{
			closeSession();
		}
	}
	/**
	 * 删除 这是测试分支
	 * @param entity
	 * @return
	 * @throws DataAccessException
	 */
	public <T> boolean delete(T entity) throws DataAccessException {
		try {
			currentSession().delete(entity);
			return true;
		} catch (Exception e) {
			log.error("delete() :" + e.getMessage(), e);
			throw e;
		}finally{
			closeSession();  
		}
	}
}
