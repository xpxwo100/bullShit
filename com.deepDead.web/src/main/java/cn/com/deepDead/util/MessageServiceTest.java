package cn.com.deepDead.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

import cn.com.deepDead.daomapper.TestMapper;

import com.maxmind.geoip.Location;
import com.maxmind.geoip.LookupService;

// 事务回滚，所有方法执行完后将自动回滚，不需要显式回滚事务
// 使用junit4
@ContextConfiguration(locations = {"classpath:config/spring-config.xml"})
// 加载必须的配置文件，数据源/hibernate/mybatis/redis/ftp/注解扫描
public class MessageServiceTest extends AbstractTransactionalJUnit4SpringContextTests {
	@Value("${dbdriver}")
	private String aa;//获得配置信息
	@Autowired 
	private TestMapper testMapper;
	@Autowired
	private HibernateUtil hibernateUtil;
	@Test
	public void test3() throws IOException {
		System.out.println(aa);
		String sql = "SELECT "+
						" top 10 *"+
						" FROM"+
						" SysFlowLog";
		List<HashMap<String, Object>> list = (List<HashMap<String, Object>>) hibernateUtil.findBySql(sql, null);
		//List<Map<String, Object>> list2 = testMapper.getTest();
		for(HashMap<String, Object> map : list){
			String id = (String) map.get("ipAddr");
			 LookupService cl = new LookupService("D:/DeepDead/src/main/webapp/WEB-INF/lib/GeoLiteCity-2013-01-18.dat", LookupService.GEOIP_MEMORY_CACHE);
	         Location l2 = cl.getLocation(id);
	         System.out.println(id);
	         System.out.println(
	                    "国家代码: " + l2.countryCode +"\n"+
	                    "国家名称: " + l2.countryName +"\n"+
	                    "地区: " + l2.region +"\n"+
	                    "城市: " + l2.city +"\n"+
	                    "纬度: " + l2.latitude +"\n"+
	                    "经度: " + l2.longitude);
		}
		
		//System.out.println(list2.toString());
	}
	public void test2() throws IOException{
		String resource = "org/mybatis/example/mybatis-config.xml";
		InputStream inputStream = Resources.getResourceAsStream(resource);
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		SqlSession session = sqlSessionFactory.openSession();
		TestMapper testMapper = session.getMapper(TestMapper.class);
	}
}
