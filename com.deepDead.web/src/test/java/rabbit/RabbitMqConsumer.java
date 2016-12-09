package rabbit;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.AMQP.BasicProperties;
import com.rabbitmq.client.Consumer;
import com.rabbitmq.client.Envelope;
import com.rabbitmq.client.ShutdownSignalException;

public class RabbitMqConsumer extends RabbitMqEndPoint implements Consumer{
	
	public RabbitMqConsumer(String exchangeName) throws IOException,
			TimeoutException {
		super(exchangeName);
		// TODO Auto-generated constructor stub
	}

	private boolean isAutoConfirm;
	 /**
     * 消费者队列名称
     */
    private String queueName;
	/*public RabbitMqConsumer(String exchangeName) throws IOException,
			TimeoutException {
		super(exchangeName);
	}*/
	

	/**
     * 构造函数
     *
     * @param subImpl       具体的业务实现类
     * @param bindingkey    订阅绑定的key
     * @param isAutoConfirm 是否自动确认消息,false的时候要手动调用basicAck
     * @throws Exception
     *//*
    public RabbitMqConsumer( String bindingkey, boolean isAutoConfirm) throws Exception {

        if (bindingkey == null || bindingkey.length() == 0) throw new Exception("bindingkey must not be null or empty");

        this.bindingKey = bindingkey;
        this.isAutoConfirm = isAutoConfirm;

        //第二个参数true设置该队列持久化,第四个参数当队列没有使用的时候是否自动删除
        //如果不用固定的队列名称，使用空字符串，是由rabbitmq自动分配队列名称，下次重启后无法得知
//        queueName = channel.queueDeclare("queue_test", true, false, false, null).getQueue();
//        Map<String, Object> args = new HashMap<>();
//        args.put("x-max-length", 5); //msg max length in queue
//        args.put("x-max-length-bytes", 1024 * 1024 * 8); //limit max size 8mb
//        args.put("x-expires", 1800000); //queue expires after 30 minutes

        queueName = channel.queueDeclare("queue_test", true, false, false, null).getQueue();

        channel.queueBind(queueName, exchangeName, bindingKey);
    }*/
	
	/**
     * 消费
     *
     * @throws IOException
     */
    public void basicConsume() throws IOException {
        channel.basicConsume(queueName, isAutoConfirm, this);
    }
	public RabbitMqConsumer(String exchangeName, String bindingKey,
			boolean isAutoConfirm, String queueName) throws Exception {
		super(exchangeName);
		 if (bindingKey == null || bindingKey.length() == 0) throw new Exception("bindingkey must not be null or empty");

	        this.isAutoConfirm = isAutoConfirm;

	        //第二个参数true设置该队列持久化,第四个参数当队列没有使用的时候是否自动删除
	        //如果不用固定的队列名称，使用空字符串，是由rabbitmq自动分配队列名称，下次重启后无法得知
//	        queueName = channel.queueDeclare("queue_test", true, false, false, null).getQueue();
//	        Map<String, Object> args = new HashMap<>();
//	        args.put("x-max-length", 5); //msg max length in queue
//	        args.put("x-max-length-bytes", 1024 * 1024 * 8); //limit max size 8mb
//	        args.put("x-expires", 1800000); //queue expires after 30 minutes

	        queueName = channel.queueDeclare("queue_test", true, false, false, null).getQueue();

	        channel.queueBind(queueName, exchangeName, bindingKey);
	}
	@Override
	public void handleConsumeOk(String consumerTag) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void handleCancelOk(String consumerTag) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void handleCancel(String consumerTag) throws IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void handleDelivery(String arg0, Envelope arg1,
			BasicProperties arg2, byte[] arg3) throws IOException {
		// TODO Auto-generated method stub
		 Object msg;
	        try {
	            System.out.println("【body length：】" + bytes2kb(arg3.length));
	            msg = decodeMsg(arg3);
	            //subImpl.handlerReceiveMsg(this, msg);
	            System.out.println(msg);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	}

	@Override
	public void handleShutdownSignal(String consumerTag,
			ShutdownSignalException sig) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void handleRecoverOk(String consumerTag) {
		// TODO Auto-generated method stub
		
	}

    /**
     * 将byte数组长度换算成具体的kb大小
     *
     * @param bytes
     * @return
     */
    public static String bytes2kb(long bytes) {
        BigDecimal fileSize = new BigDecimal(bytes);
        BigDecimal megabyte = new BigDecimal(1024 * 1024);
        float returnValue = fileSize.divide(megabyte, 2, BigDecimal.ROUND_UP).floatValue();
        if (returnValue > 1) return (returnValue + "MB");
        BigDecimal kilobyte = new BigDecimal(1024);
        returnValue = fileSize.divide(kilobyte, 2, BigDecimal.ROUND_UP).floatValue();
        return (returnValue + "KB");
    }
    
    public static void main(String[] args) throws Exception {
    	RabbitMqConsumer rabbitMqConsumer = new RabbitMqConsumer("xpx", "dog", true, "dog");
    	rabbitMqConsumer.basicConsume();
	}
}
