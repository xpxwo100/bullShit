package cn.com.deepDead.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;

import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;
import java.util.TreeMap;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;

import cn.com.deepDead.model.Dog;
import cn.com.deepDead.service.TestService;
/**********//************//**********//**********//**********//**********//**********//*
					.--,       .--,
					( (  \.---./  ) )
					'.__/o   o\__.'
					   {=  ^  =}
					    >  -  <
					   /       \
					  //       \\
					 //|   .   |\\
					 "'\       /'"_.-~^`'-.
					    \  _  /--'         `
					  ___)( )(___
					 (((__) (__)))    高山仰止,景行行止.虽不能至,心向往之。
*//**********//************//**********//**********//**********//**********//**********/

@Controller
@RequestMapping("/xpx")
public class Test {
	@Autowired
	public TestService test;
	@Autowired
	public 	Dog dog ;
	@RequestMapping(value = "/test", method = { RequestMethod.GET })
	public  ModelAndView toIndex(HttpServletRequest request,HttpServletResponse response,ModelAndView model){
		HashMap<String, Object> map =new HashMap<String, Object>();
		//读取session中的用户    
        //请求的IP    
		/*Integer i = test.getCount();
		map.put("xpx",i);*/
		try {
			
			HttpSession session = request.getSession();
			 String sessionId = session.getId();
			 if (session.isNew()) {
				  response.getWriter().print("session创建成功，session的id是："+sessionId);
		      }else {
				  response.getWriter().print("服务器已经存在该session了，session的id是："+sessionId);
			  }
			Cookie[] cookies=request.getCookies();
			if(cookies != null){
				for(Cookie cookie: cookies){
					String s = cookie.getName();
						 if(session.getAttribute("user") != null){
							String s1 =  session.getAttribute("user").toString();
						 }else{
							 session.setAttribute("user", sessionId);
							session.setMaxInactiveInterval(2 * 3600);  // Session保存两小时
						 }
				}
			}else{
				Cookie cookie = new Cookie("JSESSIONID", session.getId());
				cookie.setMaxAge(2 * 3600);  // 客户端的JSESSIONID也保存两小时
				cookie.setPath("/");        
				response.addCookie(cookie);
			}
			Dog dog = new Dog();
			dog.setAge(11);
			dog.setBirthDay(new Date());
			dog.setName("aDog");
			String s = test.show(dog);//定义了环绕通知
			/*  String sql="select wpId from ScWorkProcess";
			  List<Object> aa =  test.findBySql(sql, null);
		       map.put("xpx11",aa);*/
			if(s == null ){
				s ="null";
			}
		       map.put("data",s);
		       ModelAndView mode = new ModelAndView();
		       mode.addObject("data", JSON.toJSONString(map));
		       mode.setViewName("test");
		       return mode;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	@org.junit.Test
	public void test() throws IOException{
		String url = "http://www.baidu.com";
		String param1 = "56";
		String param2 = "sss";
		String charset = "UTF-8";
		String s;int i=0;
		InputStream outstream=null;
		try {
			s = String.format("param1=%s&param2=%s", 
					URLEncoder.encode(param1, charset), 
				     URLEncoder.encode(param2, charset));
			URLConnection uRLConnection  = new URL(url).openConnection();
			outstream = uRLConnection.getInputStream();
			byte[] b= new byte[1000];
			while( (i=outstream.read(b))!= -1){
				System.out.println(new String(b));
			}
		/*	try (Scanner scanner = new Scanner(outstream)) {
			    String responseBody = scanner.useDelimiter("\\A").next();
			    System.out.println(responseBody);
			}*/
			System.out.println(outstream);
		    System.out.println(URLEncoder.encode(param1, charset));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}finally{
			outstream.close();
		}
	}
	@org.junit.Test
	public void test1(){
		List<String> list = new ArrayList<>();
		list.add("a");
		list.add("b");
		list.add("c");
		list.add("d");
		String s =	list.remove(0);
		System.out.println(s);
		System.out.println(list.toString());
	}
}
