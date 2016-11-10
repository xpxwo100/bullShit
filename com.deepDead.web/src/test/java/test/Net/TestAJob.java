package test.Net;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


public class TestAJob extends NetTest<String, Job> implements ClassInInterface{
	public static void main(String[] args) throws IOException {
		/*String a ="udad";
		Job job = new Job();
		job.setA(787878);
		new TestAJob().save(a, job);*/
		Job j = new Job();
		j.setA(1);
		j.setB(33);
		j.setC(88);
		String s  = JSON.toJSONString(j);
		System.out.println(s);
		JSONObject jj = JSON.parseObject(s);
		//Map 转换为 json 
		 Map<String, String> hashMap = new HashMap<String, String>();  
		  hashMap.put("name", "zhang");  
		  hashMap.put("sex", "1");  
		  hashMap.put("login", "Jack");  
		  hashMap.put("password", "123abc");  
		  ObjectMapper mapper =   new ObjectMapper();
		  String userMapJson = mapper.writeValueAsString(hashMap); 
		  System.out.println(userMapJson);
		  JsonNode node = mapper.readTree(userMapJson);
		  System.out.println(node.get("password").asText());
		  System.out.println(node.get("name"));  
		  
		  //解析 json 格式字符串 
		  
		  String str = "{\"data\":{\"birth_day\":7,\"birth_month\":6},\"errcode\":0,\"msg\":\"ok\",\"ret\":0}";  
		  JsonNode root  = mapper.readTree(str);
		  JsonNode data = root.path("data");  
		  HashMap map = mapper.readValue(str, HashMap.class);
		  System.out.println(map);
	      JsonNode birth_day = data.path("birth_day");  
	      System.out.println(birth_day.asInt());  
	        
	      JsonNode birth_month = data.path("birth_month");  
	      System.out.println(birth_month.asInt());  
	  
	      JsonNode msg = root.path("msg");  
	      System.out.println(msg.textValue());  
		  
	}
	/**
	 * 重写父类方法，泛型会根据传入的类型定义
	 */
	@Override
	public void save2(String enty, Job kk) {
		super.save2(enty, kk);
		System.out.println(enty);
		System.out.println(kk.getA().toString());
	}
	@Override
	public void holdTheDoor() {
		new Test().holdTheDoor();
	}
}
