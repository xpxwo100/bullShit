package test.Net;

import com.alibaba.fastjson.JSON;

public class NetTest<K,T> implements ClassInInterface{

	public void save(K enty,T kk){
		save2(enty, kk);
		new Test().holdTheDoor();
	}
	/**
	 * 子类重写
	 * @param enty
	 * @param kk
	 */
	public void save2(K enty,T kk){
	}
	@Override
	public void holdTheDoor() {
		Job j = new Job();
		j.setA(1);
		j.setB(33);
		j.setC(88);
		JSON.toJSONString(j);
	}
}
