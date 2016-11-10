package test.Interpreter;
/**
 * 减法
 * @author xpx
 *
 */
public class Minus implements Expression{
	@Override
	public int interpreter(Context context) {
		return context.getNum1() - context.getNum2();
	}

}
