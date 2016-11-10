package test.Net;

public interface ClassInInterface {
	 void holdTheDoor();
	 /**
	  * 内部类实现自己的接口，实现这个接口的类将拥有这个实现类 Test
	  * @author xpx
	  *
	  */
	  class Test implements ClassInInterface{
	    @Override public void holdTheDoor() {
	      System.out.println("Hodor");
	    }
	  }
}
