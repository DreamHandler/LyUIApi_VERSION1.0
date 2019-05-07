package Origin.Widget.EpBox;

import org.apache.commons.pool.BaseKeyedPoolableObjectFactory;
import org.apache.commons.pool.KeyedObjectPool;
import org.apache.commons.pool.KeyedPoolableObjectFactory;
import org.apache.commons.pool.impl.GenericKeyedObjectPool;
import org.apache.commons.pool.impl.GenericKeyedObjectPoolFactory;

/**
 * EPBOX对象池
 */
@SuppressWarnings({ "rawtypes", "unchecked" })
public class EpObjectPool{
	
	public static KeyedObjectPool EpactionPool;
	static{
		KeyedPoolableObjectFactory factory = new EpBoxThreadFactory();
		EpactionPool = new GenericKeyedObjectPoolFactory(
				factory,
				100,
				GenericKeyedObjectPool.WHEN_EXHAUSTED_BLOCK,
		        100,
		        100,
		        10,
		        false,
		        false,
		        60*1000,
		        -10,
		        1000*60*60,
		        false).createPool();
	}
	
	public static Object borrowObj(String key){
		Object RtnObj = null;
		try{
			RtnObj =  EpactionPool.borrowObject(key);
		}catch(Exception e){
			System.out.println("Ep借对象失败... ..." + key);
		}
		return RtnObj;
	}
	
	public static void returnObj(String mb,Object obj){
		try{
			EpactionPool.returnObject(mb,obj);
		}catch(Exception e){
			System.out.println("Ep还对象失败... ..." + mb);
		}
	}
 }
//对象生成工厂。
@SuppressWarnings("rawtypes")
class EpBoxThreadFactory extends BaseKeyedPoolableObjectFactory{
	public Object makeObject(Object key) throws Exception{
		return TEpBoxList.getEpDef(key); 
		
	}
	
}