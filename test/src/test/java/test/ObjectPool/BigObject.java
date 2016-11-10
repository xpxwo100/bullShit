package test.ObjectPool;

public class BigObject implements IBigObject{
	private String connection;
	private Integer Time;
	public String getConnection() {
		return connection;
	}
	public void setConnection(String connection) {
		this.connection = connection;
	}
	public Integer getTime() {
		return Time;
	}
	public void setTime(Integer time) {
		Time = time;
	}
	@Override
	public String invoke() {
		return toString();
	}
	@Override
	public String toString() {
		return "BigObject [connection=" + connection + ", Time=" + Time + "]";
	}
	@Override
	public void init(String s,Integer i) {
		setConnection(s);
		setTime(i);
	}

}
