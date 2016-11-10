package cn.com.deepDead.daomapper;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * Mybatis接口Mapper对象 
 */
@Repository
public interface TestMapper {
    //自定义Dao层调用接口
	public Integer getCount();
	
	/**
	 * 注解模式 ，用于简单的sql
	 * @return
	 */
	@Select(value = { "SELECT top 10 * FROM PuPurchase" })
	public List<Map<String, Object>> getTest();
}
