package cn.com.deepDead.thrift.test;

import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;

import cn.com.deepDead.thrift.LoginResponse;
import cn.com.deepDead.thrift.UserService;

public class SimpleClientDemo {
	public static final String SERVER_IP = "localhost";
	public static final int SERVER_PORT = 7090;
	public static final int TIMEOUT = 30000;
	
	public void login(String username,String password){
		TTransport tTransport = null;
		try {
			tTransport = new TSocket(SERVER_IP, SERVER_PORT);
			TProtocol protocol = new TBinaryProtocol(tTransport);
			UserService.Client client = new UserService.Client(protocol);
			tTransport.open();
			LoginResponse loginResponse = client.login(username, password);//调用服务端方法并返回结果
			System.out.println("Thrify client result =: " + loginResponse);
		} catch (TTransportException  e) {
			// TODO: handle exception
			e.printStackTrace();
		} catch (TException e) {
			// TODO Auto-generated catch block
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
