package rabbit;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
/**
 * Rabbit消息基类
 * @author xpx
 *
 */
public abstract class RabbitMqEndPoint {
	protected final Channel channel;

	protected final Connection connection;

	protected final String exchangeName;
	
	
	public RabbitMqEndPoint() throws IOException, TimeoutException {
		this("dog");
	}
	public  RabbitMqEndPoint(String exchangeName) throws IOException, TimeoutException{
		this.exchangeName = exchangeName;
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		connection = factory.newConnection();
		channel = connection.createChannel();
		channel.exchangeDeclare(exchangeName, "topic");
	}
	/**
	 * 关闭rabbitmq连接
	 * 
	 * @throws IOException
	 */
	public void connectionClose() throws IOException {
		connection.close();
	}
	
}
