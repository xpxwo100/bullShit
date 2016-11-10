package test.Interpreter;
/**
 * 加法
 * @author xpx
 *
 */
public class Puls implements Expression{
	@Override
	public int interpreter(Context context) {
		return context.getNum1() + context.getNum2();
	}
}
