package test.ASM;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import javassist.CannotCompileException;
import javassist.ClassPool;
import javassist.CtClass;
import javassist.CtConstructor;
import javassist.CtMethod;
import javassist.CtNewMethod;
import javassist.util.proxy.ProxyFactory;

import org.junit.Test;
import org.objectweb.asm.ClassWriter;
/**
 * 动态生成class文件
 * @author xpx
 *
 */
public class MyClassLoader extends ClassLoader	{
	public Class<?> defineMyClass(String name,byte[] b,int off ,int len){
		return defineClass(name,b, off, len);//生产class
	}
	
	@Test
	public void test() throws CannotCompileException, IOException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException{
		//ClassWriter classWriter = new ClassWriter(ClassWriter.COMPUTE_MAXS);
		ClassPool pool = ClassPool.getDefault();
		CtClass cc = pool.makeClass("People");
		String s = "public void test()"
				+ "{"
				+ " System.out.println(\"测试\");"
				+ " int a = 10;"
				+ " int d = 130;"
				+ " System.out.println(a+d);"
				+ "}";
		CtMethod m = CtNewMethod.make(s, cc);
		//m.insertBefore("System.out.println(\"peolpe\");");
		//m.insertAfter(s);
		//m.insertAfter(s1);
		cc.addMethod(m);
		//byte[] b = cc.toBytecode();
		Class<?> clazz = cc.toClass();//生产class文件
		Object obj1 = clazz.newInstance();
		clazz.getMethod("test", null).invoke(obj1, null);//对象obj，参数无
		/*System.out.println(b.toString());
		MyClassLoader mm  = new MyClassLoader();
		Class<?> mClass = mm.defineMyClass("People", b, 0, b.length);
		Object obj = mClass.newInstance();
		mClass.getMethod("test", null).invoke(obj, null);//对象obj，参数无
*/	}
	
}
