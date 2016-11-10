package test.ObjectPool;

import java.util.NoSuchElementException;

import org.apache.commons.pool2.ObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
/**
 * 对象池
 * @author xpx
 *
 */
public class ObjectPoolTest {
	/**
	 * 线程池配置对象
	 */
	private static GenericObjectPoolConfig objectPoolConfig = new GenericObjectPoolConfig();
	static {
		objectPoolConfig.setMaxTotal(10);// 最大线程
		objectPoolConfig.setMaxIdle(10);// 最大闲置线程
		objectPoolConfig.setMinIdle(10);// 最小闲置线程
	}
	private static ObjectPool<IBigObject> objectPool = null;
	
	
	private static synchronized void myPoolInit(IBigObject bigObject) {
		if (objectPool == null) {
			PooledFactory pooledFactory = new PooledFactory(bigObject);
			objectPool = new GenericObjectPool<IBigObject>(pooledFactory, objectPoolConfig);// 获取线程池
		}
	}
	public static ObjectPool<IBigObject> getMyPool(IBigObject bigObject) {
		if (objectPool == null) {
			myPoolInit(bigObject);
		}
		return objectPool;
	}
	
	public static void main(String[] args) {
		//for(int i = 0; i<100;i++){
			new Thread(new Runnable() {
				@Override
				public void run() throws IllegalStateException {
					Connection bigObject = new Connection();
					//bigObject.init("连接", 1000);
					ObjectPool<IBigObject> objectPool = ObjectPoolTest.getMyPool(bigObject);
					try {
						Connection obj = (Connection) objectPool.borrowObject();
						obj.test();
						IBigObject obj2 = objectPool.borrowObject();
						IBigObject obj3 = objectPool.borrowObject();
						IBigObject obj4 = objectPool.borrowObject();
						System.out.println(Thread.currentThread().getName()+obj.hashCode()+obj.invoke());
						System.out.println(Thread.currentThread().getName()+obj2.hashCode()+obj2.invoke());
						System.out.println(Thread.currentThread().getName()+obj3.hashCode()+obj3.invoke());
						System.out.println(Thread.currentThread().getName()+obj4.hashCode()+obj4.invoke());
						//objectPool.returnObject(obj);
					} catch (NoSuchElementException e) {
						e.printStackTrace();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}).start();
		//}
	}
}
