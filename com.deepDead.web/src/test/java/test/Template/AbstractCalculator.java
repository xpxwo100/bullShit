package test.Template;
/**
 * 解释一下模板方法模式，就是指：一个抽象类中，有一个主方法，
 * 再定义1...n个方法，可以是抽象的，也可以是实际的方法，
 * 定义一个类，继承该抽象类，重写抽象方法，通过调用抽象类，实现对子类的调用，先看个关系图：
 * @author xpx
 *
 */
public  abstract class AbstractCalculator {
	public final int calculate(int exp, int opt,boolean b) {
		show();
		return calculate(exp,opt);//子类重写
	}
    /**
     * 子类重写
     * @param i
     * @param j
     * @return
     */
	public abstract int calculate(int exp,int opt);

	public void show() {
		System.out.println("提前处理");
	}

}
