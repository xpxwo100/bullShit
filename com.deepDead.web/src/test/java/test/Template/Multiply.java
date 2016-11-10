package test.Template;

public class Multiply extends AbstractCalculator{

	@Override
	public int calculate(int i, int j) {
		System.out.println(i*j);
		return i*j;
	}

}
