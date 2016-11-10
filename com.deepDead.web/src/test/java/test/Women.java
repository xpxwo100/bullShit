package test;

import org.junit.Test;

public class Women extends People implements Cloneable{
    public Women(){
    	System.out.println("女人初始化");
    }
	@Override
	public void work() {
		//super.work();
		System.out.println("女人在工作");
	}
	public void shoping(){
		System.out.println("女人在购物");   
	}
	
	public Object clone() throws CloneNotSupportedException{	
		Women women = (Women)super.clone();
		return women;
	}
	/*@Override
	public void hey(String a){
		System.out.println(a);
		System.out.println(a);
		System.out.println(a);
	}*/
	@Test
	public void ssd(){
		People p = new Women();
		AllJob a = new Women();
	}
}
