package thrift.test;

import org.apache.thrift.TProcessor;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TSimpleServer;
import org.apache.thrift.transport.TServerSocket;

import thrift.UserService;
import thrift.UserServiceImpl;

public class SimpleServerDemo {
	public static final int SERVER_PORT = 7090;
	
	public void start(){
		try {
			System.out.println("UserServer start ....");
			
			TProcessor processor = new UserService.Processor<UserService.Iface>(new UserServiceImpl());
			TServerSocket socket = new TServerSocket(SERVER_PORT);
			
			TServer.Args a = new TServer.Args(socket).processor(processor).protocolFactory(new TBinaryProtocol.Factory());
			TSimpleServer server = new TSimpleServer(a);
			server.serve();
			
		} catch (Exception e) {
			System.out.println("Server start error!!!");
			e.printStackTrace();
		}
	}
	public static void main(String[] args) {
		SimpleServerDemo simpleServerDemo = new SimpleServerDemo();
		simpleServerDemo.start();
	}
}
