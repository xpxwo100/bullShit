package test;

public class People implements AllJob{
	//do noting
	public People(){
		System.out.println("人类初始化");
	}
/*	public void work(){
		System.out.println("人类在工作");
	}*/
	public void eat(){ 
		work();
		jump();
	}
	@Override
	public void work() {
		System.out.println("人类在工作");
	}
	@Override
	public void jump() {
		System.out.println("人类在跳");
	}
	public void hey(String s){
		System.out.println(s);
	}
}
