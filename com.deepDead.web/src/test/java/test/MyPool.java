package test;

import java.util.List;

import com.aspose.slides.Collections.ArrayList;
/**
 * 单例
 * @author xpx
 *
 */
public class MyPool {
	private List<People> pool = null;
	private People people = null;
	private static MyPool mypool = null;

	@SuppressWarnings("unchecked")
	private MyPool() {
		pool = new ArrayList();
		for (int i = 0; i < 10; i++) {
			people = new People();
			pool.add(people);
		}
		System.out.println("MyPool初始化");
	}

	private static synchronized void myPoolInit() {
		if (mypool == null) {
			mypool = new MyPool();
		}
	}

	public static MyPool getMyPool() {
		if (mypool == null) {
			myPoolInit();
		}
		return mypool;
	}

	public People getPeople() {
		if (pool.size() > 0) {
			return pool.remove(0);
		} else {
			return null;
		}
	}

	public synchronized void release() {
		pool.add(people);
	}

	public List<People> getPool() {
		return pool;
	}

	public void setPool(List<People> pool) {
		this.pool = pool;
	}

}
