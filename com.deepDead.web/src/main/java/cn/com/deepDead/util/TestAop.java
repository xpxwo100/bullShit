package cn.com.deepDead.util;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import cn.com.deepDead.model.Dog;
@Component
@Aspect
public class TestAop {
	  @Pointcut("execution(* cn.com.deepDead.service.*.*(..))")  
	    private void anyMethod(){}//定义一个切入点  
	/*   @Before("anyMethod()") 
	    public void doAccessCheck(JoinPoint join){ 
		   	String a = join.getSignature().getName();//方法名
		   	Object b = join.getArgs()[0];
	        System.out.println("前置通知----------ss--"+a+b);  
	    }  */
	   @AfterReturning(pointcut = "anyMethod()", returning = "result") 
	   public void doAfter(JoinPoint jp, Object result){
		   System.out.println("后置通知----------ss--"+result);  
	   }
	   @Around("anyMethod()") 
	   public Object doAround(ProceedingJoinPoint pro) throws Throwable{
		   System.out.println("环绕通知----------ss--"); 
		   long start = System.currentTimeMillis();
		   Object result = null;
		   if(pro.getArgs()[0] instanceof  Dog){
			   result = pro.proceed();//目标方法执行
			   System.out.println(result.toString());
			   long end = System.currentTimeMillis();
			   System.out.println("环绕后通知执行时间------------"+(end - start));
			   return result;
		   }
		   return result;
	   }
	 
}
