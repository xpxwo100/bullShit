package cn.com.deepDead.start;


/**
 * 启动初始化辅助类 启动初始化配置来自于 WEB-INF/config/satrtupInit/下的所有xml文件 初始化信息
 * 
 * @author csh
 * 
 */
@SuppressWarnings("unchecked")
public class StartupExecuteHelper {

	public static void exeute() {
		String s = System.getProperty("deepDead.webapp.root");
		System.out.println(s);
	}
}
