package cn.com.deepDead.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.junit.Test;
import org.springframework.stereotype.Component;

import com.maxmind.geoip.Location;
import com.maxmind.geoip.LookupService;
/**
 * 定时计划测试
 * @author xpx
 *
 */
@Component
public class MyTest {
	// @Scheduled(cron="0/5 * *  * * ? ") 
	 public void myTest(){  
         System.out.println("进入测试");  
  } 
	 @Test
	 public void test() throws IOException{
		 FileOutputStream f = null;
		 FileInputStream fis = null;
		 try {
			 f	= new FileOutputStream("D:/test.txt");
			 f.write( "几把222" .getBytes());
			 fis  =  new FileInputStream("D:/test.txt");
			 byte [] buf  =  new   byte [ 100 ];
			 int len = fis.read(buf);
			 System.out.println(new String(buf,  0 , len));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}finally{
			f.close();
			fis.close();
		}
	 }
	 @Test
	 public void test2(){
		  try {
	            LookupService cl = new LookupService("D:/DeepDead/src/main/webapp/WEB-INF/lib/GeoLiteCity-2013-01-18.dat", LookupService.GEOIP_MEMORY_CACHE);
	            Location l2 = cl.getLocation("144.0.9.29");
	            System.out.println(
	                    "countryCode: " + l2.countryCode +"\n"+
	                    "countryName: " + l2.countryName +"\n"+
	                    "region: " + l2.region +"\n"+
	                    "city: " + l2.city +"\n"+
	                    "latitude: " + l2.latitude +"\n"+
	                    "longitude: " + l2.longitude);
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	 }
}
