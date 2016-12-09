package rabbit;

import java.io.IOException;
import java.io.NotSerializableException;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.MessageProperties;

public class RabbitMqProducer extends RabbitMqEndPoint{

	public RabbitMqProducer(String exchangeName) throws IOException,
			TimeoutException {
		super(exchangeName);//设定主题
	}

	/**
	 * 发布
	 * @param routingKey
	 * @param msg
	 * @throws NotSerializableException
	 * @throws IOException
	 */
	public void basicPublish(String routingKey, Object msg) throws NotSerializableException, IOException{
		channel.basicPublish(exchangeName, routingKey, MessageProperties.MINIMAL_PERSISTENT_BASIC, encodeMsg(msg));
	}
	 public static void main(String[] args) throws IOException, TimeoutException {
	    	RabbitMqProducer rabbitMqProducer = new RabbitMqProducer("xpx");
	    	 for (int i = 1; i <= 100; i++) {
	    		 rabbitMqProducer.basicPublish("dog", "hello");
	    		 System.out.println(i);
	    	 }
	    	 rabbitMqProducer.connectionClose();
		}
}
