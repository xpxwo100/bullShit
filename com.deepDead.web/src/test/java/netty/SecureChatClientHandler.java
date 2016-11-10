/*
 * Copyright 2012 The Netty Project
 *
 * The Netty Project licenses this file to you under the Apache License,
 * version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
package netty;

import java.awt.List;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

/**
 * Handles a client-side channel.
 */
public class SecureChatClientHandler extends SimpleChannelInboundHandler<String> {

    @Override
    public void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {
    		
    		//String msg2=processMsg(msg);
    		
    		ChatClient.cList.add("\r\n"+msg,-1);
    		System.err.println("ChatClient："+msg);
    		
    	
    }

//    public String processMsg(String msg){	//������Ϣ�����Ծݴ˶����Լ��Ĺ���
//    	//System.out.println("msg is "+msg);
//    	String  str1=msg.replace("[", "");
//    	System.out.println("str is -->"+str1);
//    	String [] strArr=str1.split("\\]");
//    	//System.out.println(strArr.length);
//    	
//    	if(strArr.length>1&&strArr[0].equals(ChatClient.getName())){
//    		System.out.println("process name is -->"+strArr[1]);
//    		return "[��]"+strArr[1];
//    	}
//    	else return msg;
//    }
    
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}
