package rabbit;


import org.nustaq.serialization.FSTObjectInput;
import org.nustaq.serialization.FSTObjectOutput;

import java.io.ByteArrayInputStream;
import java.io.IOException;

public class FSTUtil {

    /**
     * 基础序列化函数
     *
     * @param obj
     * @param cls
     * @return
     */
    public static byte[] encode(Object obj, Class<?> cls) {
        return encodeFST(obj, cls);
    }

    /**
     * 基础序列化函数
     *
     * @param obj
     * @return
     */
    public static byte[] encode(Object obj) {
        return encodeFST(obj, null);
    }

    /**
     * 序列化函数.Java FST格式
     *
     * @param obj
     * @return
     */
    public static byte[] encodeFST(Object obj, Class<?> cls) {
        byte[] mBytes = new byte[0];
        if (obj == null) {
            return mBytes;
        }
        FSTObjectOutput fstOut = null;
        try {
            fstOut = new FSTObjectOutput();
            if (cls != null) {
                fstOut.writeObject(obj, cls);
            } else {
                fstOut.writeObject(obj);
            }
            //不产生byte[]数组拷贝
            mBytes = fstOut.getBuffer();
        } catch (Exception exp) {
            exp.printStackTrace();
        } finally {
            try {
                if (fstOut != null) {
                    fstOut.flush();
                    fstOut.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return mBytes;
    }

    //反序列化函数

    /**
     * 基础反序列化函数
     *
     * @param data
     * @param cls
     * @return
     */
    public static <T> T decode(byte[] data, Class<?> cls) {
        return FSTUtil.decodeFST(data, cls);
    }

    /**
     * 基础反序列化函数
     *
     * @param data
     * @return
     */
    public static <T> T decode(byte[] data) {
        return FSTUtil.decodeFST(data, null);
    }

    /**
     * 反序列化函数.Java FST格式
     *
     * @param data
     * @return
     */
    public static <T> T decodeFST(byte[] data, Class<?> cls) {
        T obj = null;
        if (data == null || data.length == 0) {
            return obj;
        }
        ByteArrayInputStream inStream = null;
        FSTObjectInput fstIn = null;
        try {
            inStream = new ByteArrayInputStream(data);
            fstIn = new FSTObjectInput(inStream);
            if (cls != null) {
                obj = (T) fstIn.readObject(cls);
            } else {
                obj = (T) fstIn.readObject();
            }
        } catch (Exception exp) {
            exp.printStackTrace();
        } finally {
            try {
                if (inStream != null) {
                    inStream.close();
                }
                if (fstIn != null) {
                    fstIn.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return obj;
    }
}
