package test.Interpreter;

public class Test {
	public static void main(String[] args) {
        int value = new Puls().interpreter(new Context(5, 4));
        int value2 = new Minus().interpreter(new Context(5, 4));
        System.out.println(value2);
	}
}
