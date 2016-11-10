package test.Adapter;

/**
 * 适配的新类
 * 我这个类只实现接口的部分方法，其他方法我在Source实现了，继承它就行
 * @author xpx
 * 
 */
public class MyAdapter extends Source implements Targetable {

	@Override
	public void update() {
		System.out.println("update");
	}

	@Override
	public void delete() {
		System.out.println("delete");
	}

	/**
	 * 测试
	 * @param args
	 */
	public static void main(String[] args) {
		Targetable t = new MyAdapter();
		t.delete();
		t.save();
		t.select();
		t.delete();
	}
}
