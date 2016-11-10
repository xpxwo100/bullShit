package test.Command;

public class Invoker {
	private Command command;//命令接口引用

	public Invoker(Command command) {
		this.command = command;
	}
	public void action() {
		command.exe();//指向实现类
	}
}
