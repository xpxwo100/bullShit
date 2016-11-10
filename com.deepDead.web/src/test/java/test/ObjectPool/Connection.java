package test.ObjectPool;

public class Connection extends BigObject{

	@Override
	public String invoke() {
		return "Connection";
	}
	public void test(){
		System.out.println("test");
	}
}
