package rabbit;


import java.io.ByteArrayOutputStream;
import java.io.FilterOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import org.bouncycastle.openpgp.PGPCompressedData;
import org.bouncycastle.openpgp.PGPCompressedDataGenerator;
import org.bouncycastle.openpgp.PGPObjectFactory;


public class Compress 
{
	
	public Compress()
	{
		
	}

    /**
     * 通用数据压缩函数,兼容.Net调用
     * 支持Zip,ZLib,BZip2
     * @param type CompressionAlgorithmTags.*
     * @param data
     * @return
     */
    public static byte[] pgpCompress(int type, byte[] data)
    {
        if (data == null)
        {
            return new byte[0];
        }
        PGPCompressedDataGenerator cPacket = null;
        byte[] bts = new byte[0];
        ByteArrayOutputStream bOut = new ByteArrayOutputStream(); 
        try
        {
            cPacket = new PGPCompressedDataGenerator(type);
            int dlen=data.length;
            OutputStream os = cPacket.open(new FilterOutputStream(bOut),new byte[dlen - 1]);
            os.write(data, 0, dlen);
            os.flush();
            os.close();
            os=null;
            bts = bOut.toByteArray();
        }
        catch (Exception e)
        {
        	return new byte[0];
        }
        finally
        {
        	try 
        	{
        		if (cPacket != null)
                {
                    cPacket.close();
                    cPacket=null;
                }
                if (bOut != null)
                {
                    bOut.close();
                    bOut=null;
                }
			} 
        	catch (Exception exp2) 
			{
        		return new byte[0];
			}
        }
        return bts;
    }
    /**
     * 通用数据解压缩函数,兼容.Net调用
     * 支持Zip,ZLib,BZip2
     * @param data
     * @return
     */
    public static byte[] pgpUnCompress(byte[] data)
    {
        if (data == null)
        {
            return new byte[0];
        }
        InputStream pIn = null;
        byte[] bts = new byte[0];
        try
        {
        	PGPObjectFactory pgpFact = new PGPObjectFactory(data, null);
        	PGPCompressedData npo = (PGPCompressedData)pgpFact.nextObject();
            pIn = npo.getDataStream();
            bts =org.bouncycastle.util.io.Streams.readAll(pIn);
        }
        catch (Exception e)
        {
        	return new byte[0];
        }
        finally
        {
        	try 
        	{
        		if (pIn != null)
                {
                    pIn.close();
                    pIn=null;
                }
			} 
        	catch (Exception exp2) 
			{
        		return new byte[0];
			}
            
        }
        return bts;
    }
}
