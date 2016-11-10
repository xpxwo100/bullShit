package cn.com.deepDead.start;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

/**
 * 系统启动初始化监听
 * 
 * @author x
 * 
 */
public class StartupExecuteListener implements ServletContextListener {

	private Logger log = Logger.getLogger(StartupExecuteListener.class);

	public void contextInitialized(ServletContextEvent sce) {
		log.info("StartupInitListener - contextInitialized");
		String webAppRootKey = sce.getServletContext().getRealPath("/");
		System.setProperty("deepDead.webapp.root" , webAppRootKey);
		System.out.println("this is contextInitialized");      
		StartupExecuteHelper.exeute();
		
		/*if (GlobalInfo.isLinkSSO()) {
			DynamicLoadBean dynamicLoadBean = (DynamicLoadBean) SpringContextUtil.getBean("dynamicLoadBean");
			dynamicLoadBean.loadBean("/WEB-INF/config/spring/dynamicLoad-mq.xml");
			
			SpringContextUtil.getBean("amqConnectionFactory");
			SpringContextUtil.getBean("connectionFactory");
			SpringContextUtil.getBean("queueDestination");
			SpringContextUtil.getBean("defaultMessageListenerContainer");
			
		}*/
	}

	public void contextDestroyed(ServletContextEvent sce) {
		log.info("StartupInitListener - contextDestroyed");
	}

}
