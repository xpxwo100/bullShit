package test;

import java.util.ArrayList;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import org.junit.Test;

/**
 * 线程锁
 * 
 * @author xpx
 * 
 */
public class MyTest {
	private ArrayList<Integer> arrayList = new ArrayList<Integer>();
	private Lock lock = new ReentrantLock();
	int count = 0;

	private boolean hasDataToProcess = false;//共享变量
	boolean wasSignalled = false;
	private ThreadLocal myThreadLocal = new ThreadLocal();//两个线程不共用
	
	
	/**
	 * 共享变量同步快
	 * @return
	 */
	public synchronized boolean hasDataToProcess() {
		return this.hasDataToProcess;
	}
	public synchronized void setHasDataToProcess(boolean hasData) {
		this.hasDataToProcess = hasData;
	}
    public void doWait(){
    	synchronized(this){
    		if(!wasSignalled){
    			try {
    				this.wait();
    			} catch (InterruptedException e) {
    				e.printStackTrace();
    			}
    		}
    		wasSignalled = false;
    	}
    }
    
    public void doNotify(){
    	synchronized(this){
    		wasSignalled = true;
    		this.notify();
    	}
    }
	@Test
	public synchronized void test() {
		final MyTest test1 = new MyTest();
		new Thread() {
			public void run() {
				myThreadLocal.set("aaaa");
				System.out.println(Thread.currentThread().getName());
				System.out.println(myThreadLocal.get());
			};
		}.start();
		new Thread() {
			public void run() {
				myThreadLocal.set("bbbbb");
				System.out.println(Thread.currentThread().getName());
				System.out.println(myThreadLocal.get());
			};
		}.start();
	}

	public void insert(Thread thread) {
		lock.lock();
		try {
			System.out.println(thread.getName() + "得到了锁");
			for (int i = 0; i < 1000; i++) {
				arrayList.add(i);
			}
		} catch (Exception e) {
		} finally {
			lock.unlock();
			System.out.println(thread.getName() + "释放了锁");
		}
	}

	public void test2() {
		System.out.println(Thread.currentThread().getName());
		for (int i = 0; i < 19; i++) {
			new Thread(new Runnable() {
				public void run() {
					add();
					System.out.println("Thread: "
							+ Thread.currentThread().getName() + "running");
				}
			}).start();
		}
		System.out.println(count);
	}

	public void add() {
		synchronized (this) {
			this.count = count + 1;
		}
	}
}