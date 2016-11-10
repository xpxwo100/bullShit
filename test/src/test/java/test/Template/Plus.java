package test.Template;

public class Plus extends AbstractCalculator{

	@Override
	public int calculate(int exp, int opt) {
		System.out.println(exp+opt);
		return  exp+opt;
	}
	
	public static void main(String[] args) {
		AbstractCalculator a = new Plus();
		AbstractCalculator b = new Multiply();
		a.calculate(34, 5, false);
		b.calculate(12, 33, false);
	}
}
