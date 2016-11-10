package test;

import org.springframework.stereotype.Component;

@Component
public class Man extends People{
     public Man(){
    	 System.out.println("男人初始化");
     }
	public void work() {
		System.out.println("男人在工作");
	}
  public void sport(){ 
	  System.out.println("男人在运动");
  }
}
