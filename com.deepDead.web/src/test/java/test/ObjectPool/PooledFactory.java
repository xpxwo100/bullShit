package test.ObjectPool;

import org.apache.commons.pool2.BasePooledObjectFactory;
import org.apache.commons.pool2.PooledObject;
import org.apache.commons.pool2.impl.DefaultPooledObject;

public class PooledFactory extends BasePooledObjectFactory<IBigObject>{
	private IBigObject bigObject;

	public PooledFactory(IBigObject bigObject) {
		super();
		this.bigObject = bigObject;
	}

	@Override
	public IBigObject create() throws Exception {
		return bigObject;
	}
	/**
	 * 包装对象
	 */
	@Override
	public PooledObject<IBigObject> wrap(IBigObject bigObject) {
		return new DefaultPooledObject<IBigObject>(bigObject);
	}


}
