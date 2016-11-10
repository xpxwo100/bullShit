package test.Adapter.Adapter2;

/**
 * 适配的新类(这种方式是对象适配器)
 * 我实现了接口的所有方法，但某些方法内部引用的第三方类去处理。
 * 
 * @author xpx
 * 
 */
public class MyAdapter implements Targetable {

	private Source source;
	
	public MyAdapter(Source source){
		this.source = source;
	}
	@Override
	public void update() {
		System.out.println("update");
	}

	@Override
	public void delete() {
		System.out.println("delete");
	}
	@Override
	public void save() {
		System.out.println("装饰save");
		source.save2();
	}
	@Override
	public void select() {
		System.out.println("装饰select");
		source.select2();
	}

	/**
	 * 测试
	 * @param args
	 */
	public static void main(String[] args) {
		Source source = new Source();
		Targetable t = new MyAdapter(source);
		t.delete();
		t.save();
		t.select();
		t.delete();
	}
}
