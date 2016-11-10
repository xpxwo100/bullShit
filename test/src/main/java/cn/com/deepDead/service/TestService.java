package cn.com.deepDead.service;

import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.deepDead.dao.BaseDao;
import cn.com.deepDead.daomapper.TestMapper;
import cn.com.deepDead.model.Dog;
@Service
public class TestService extends BaseDao<Integer, Dog>{
//	                            _ooOoo_  
//	                           o8888888o  
//	                           88" . "88  
//	                           (| -_- |)  
//	                            O\ = /O  
//	                        ____/`---'\____  
//	                      .   ' \\| |// `.  
//	                       / \\||| : |||// \  
//	                     / _||||| -:- |||||- \  
//	                       | | \\\ - /// | |  
//	                     | \_| ''\---/'' | |  
//	                      \ .-\__ `-` ___/-. /  
//	                   ___`. .' /--.--\ `. . __  
//	                ."" '< `.___\_<|>_/___.' >'"".  
//	               | | : `- \`.;`\ _ /`;.`/ - ` : | |  
//	                 \ \ `-. \_ __\ /__ _/ .-` / /  
//	         ======`-.____`-.___\_____/___.-`____.-'======  
//	                            `=---='  
	//  
//	         .............................................  
//	                  佛祖保佑             永无BUG 
//	          佛曰:  
//	                  写字楼里写字间，写字间里程序员；  
//	                  程序人员写程序，又拿程序换酒钱。  
//	                  酒醒只在网上坐，酒醉还来网下眠；  
//	                  酒醉酒醒日复日，网上网下年复年。  
//	                  但愿老死电脑间，不愿鞠躬老板前；  
//	                  奔驰宝马贵者趣，公交自行程序员。  
//	                  别人笑我忒疯癫，我笑自己命太贱；  
//	                  不见满街漂亮妹，哪个归得程序员？ 
	@Autowired
	public TestMapper testMapper;

	public Integer getCount(){
		try {
			return testMapper.getCount();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return null;
	}
	
	public SessionFactory getSessionTest(){
		return getSessionFactory();
	}
	public String show(Dog dog) throws InterruptedException, RemoteException{
		  Thread.sleep(3000);
		System.out.println(dog.toString());
		return "fn show is sucess";
	}
}
