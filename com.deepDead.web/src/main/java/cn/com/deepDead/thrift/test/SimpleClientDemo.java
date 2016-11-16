package cn.com.deepDead.thrift.test;

import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;

import cn.com.deepDead.thrift.LoginResponse;
import cn.com.deepDead.thrift.UserService;

public class SimpleClientDemo {
	public static final String SERVER_IP = "localhost";
	public static final int SERVER_PORT = 7090;
	public static final int TIMEOUT = 30000;
	
	public void login(String username,String password){
		TTransport tTransport = null;
		try {
			//阻塞方式
			tTransport = new TSocket(SERVER_IP, SERVER_PORT);
			//非阻塞
			//tTransport = new TFramedTransport(new TSocket(SERVER_IP, SERVER_PORT));
			
			
			
			
			TProtocol protocol = new TBinaryProtocol(tTransport);
			UserService.Client client = new UserService.Client(protocol);
			tTransport.open();
			LoginResponse loginResponse = client.login(username, password);//调用服务端方法并返回结果
			System.out.println("Thrify client result =: " + loginResponse);
			
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			if(tTransport != null){
				tTransport.close();
			}
		}
		
	}
	public static void main(String[] args) {
		SimpleClientDemo simpleClientDemo = new SimpleClientDemo();
		simpleClientDemo.login("xpx", "123456");
	}
}
