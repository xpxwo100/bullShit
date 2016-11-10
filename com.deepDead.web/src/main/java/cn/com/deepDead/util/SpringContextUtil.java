package cn.com.deepDead.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Component;
/**
 * 可以实现ApplicationContextAware，得到ApplicationContext
 * 本类得到可以得到bean
 * @author xpx
 *
 */
@Component
public class SpringContextUtil implements ApplicationContextAware{
	private static ConfigurableApplicationContext appContext;
	@Override
	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
			SpringContextUtil.appContext = (ConfigurableApplicationContext) applicationContext;
	}
	public static Object getBean(String bean) throws BeansException{
		return appContext.getBean(bean);
	}
	/**
	 * 如果BeanFactory包含一个与所给名称匹配的bean定义，则返回true
	 * 
	 * @param name
	 * @return boolean
	 */
	public static boolean containsBean(String bean){
		return appContext.containsBean(bean);
	}
	public static ConfigurableApplicationContext getAppContext() {
		return appContext;
	}
}
