package test;
/**
 * 装饰
 * @author xpx
 *
 */
public class MyDecorate implements AllJob{
	
	private People people;

	public MyDecorate(People people){
		this.people = people;
	}
	@Override
	public void work() {
		people.work();
	}

	@Override
	public void jump() {
		System.out.println("装饰类jump");
	}

}
