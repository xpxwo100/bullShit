package rabbit;

import java.io.IOException;
import java.io.NotSerializableException;
import java.io.Serializable;
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
	
	public  RabbitMqEndPoint(String exchangeName) throws IOException, TimeoutException{
		this.exchangeName = exchangeName;
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("192.168.1.21");
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
	/**
	 * 消息序列化(fst)
	 * 
	 * @param msg
	 *            要序列化的对象
	 * @return 序列化后的二进制数组
	 * @throws NotSerializableException
	 *             如果对象没有实现序列化接口则抛出异常
	 */
	protected byte[] encodeMsg(Object msg) throws NotSerializableException {
		if (!(msg instanceof Serializable))
			throw new NotSerializableException(msg.getClass().getName());
		byte[] encode = FSTUtil.encode(msg);
		byte[] encodeCompress = Compress.pgpCompress(2, encode);
		return encodeCompress;
	}
	/**
	 * 消息反序列化(fst)
	 * 
	 * @param data
	 *            反序列化的二进制数组
	 * @return 反序列化后的对象
	 * @throws Exception
	 */
	protected Object decodeMsg(byte[] data) throws Exception {
		if (data == null || data.length == 0)
			throw new Exception(
					"the decode byte data must not be null or empty");
		byte[] decodeData = Compress.pgpUnCompress(data);
		return FSTUtil.decode(decodeData);
	}
}
