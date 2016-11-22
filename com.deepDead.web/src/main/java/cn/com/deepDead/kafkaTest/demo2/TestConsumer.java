package cn.com.deepDead.kafkaTest.demo2;
import java.util.Arrays;
import java.util.Properties;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
public class TestConsumer {
	 public static void main(String[] args) {
	        Properties props = new Properties();

	        props.put("bootstrap.servers", "localhost:9093");
	        System.out.println("this is the group part test 1");
	        //消费者的组id
	        props.put("group.id", "GroupA");//这里是GroupA或者GroupB

	        props.put("enable.auto.commit", "true");
	        props.put("auto.commit.interval.ms", "1000");

	        //从poll(拉)的回话处理时长
	        props.put("session.timeout.ms", "30000");
	        //poll的数量限制
	        //props.put("max.poll.records", "100");

	        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

	        props.put("value.deserializer", "org.apache.kafka.common.serialization.IntegerDeserializer");

	        KafkaConsumer<String, Integer> consumer = new KafkaConsumer<String, Integer>(props);
	        //订阅主题列表topic
	        consumer.subscribe(Arrays.asList("foo"));

	        while (true) {
	            ConsumerRecords<String, Integer> records = consumer.poll(100);
	            for (ConsumerRecord<String, Integer> record : records){
	            	System.out.printf("offset = %d, key = %s, value = %s", record.offset(),record.partition(), record.key(), record.value()+"\n");
	            }
	        }
	    }

}
