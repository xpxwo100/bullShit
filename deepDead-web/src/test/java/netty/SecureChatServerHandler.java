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

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.handler.ssl.SslHandler;
import io.netty.util.concurrent.Future;
import io.netty.util.concurrent.GenericFutureListener;
import io.netty.util.concurrent.GlobalEventExecutor;

import java.net.InetAddress;

/**
 * Handles a server-side channel.
 */
public class SecureChatServerHandler extends SimpleChannelInboundHandler<String> {

    static final ChannelGroup channels = new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);

    @Override
    public void channelActive(final ChannelHandlerContext ctx) {//�ͻ�������ʱ���ø÷���
    	
//    	System.out.println("channelactive!");
    	
        // Once session is secured, send a greeting and register the channel to the global channel
        // list so the channel received the messages from others.
    	//���ϵͳ��Ϣ
        ctx.pipeline().get(SslHandler.class).handshakeFuture().addListener(
                new GenericFutureListener<Future<Channel>>() {
                    @Override
                    public void operationComplete(Future<Channel> future) throws Exception {
                        ctx.writeAndFlush(
                                "Welcome to " + InetAddress.getLocalHost().getHostName() + " secure chat service!\n");
                        ctx.writeAndFlush(
                                "Your session is protected by " +
                                        ctx.pipeline().get(SslHandler.class).engine().getSession().getCipherSuite() +
                                        " cipher suite.\n");

                        channels.add(ctx.channel());
                    }
        });
    }
    
    @Override
    public void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {//ÿ�η�����Ϣʱ ���ø÷���
        // Send the received message to all channels but the current one.
    	boolean boo=false;
//    	System.out.println("channelread0!");
    	String [] strArr=null;
    	if(msg.startsWith("[")){//�����ϵͳ��ɵ���Ϣ�����û����͵���Ϣ
    		boo=true;
    		strArr=processMsg(msg);
    	}
        for (Channel c: channels) {		//��ͨ���е���Ϣ���б���
            if (c != ctx.channel()) {	//���͸������û�
            	if(boo==true)			//���ǳƵ����
            	c.writeAndFlush( msg + '\n');	
            	else c.writeAndFlush("[" + ctx.channel().remoteAddress() + "] " + msg + '\n');//û���ǳ�
            } else {					//���͸���û�
            	if(boo==true){			//���ǳƵ����
            		c.writeAndFlush("[server data:] " + strArr[2] + '\n');//接受数据返回
            	}else {					//û���ǳ�
            		c.writeAndFlush(msg + '\n');
				}
            }
        }
        
        // Close the connection if the client has sent 'bye'.
        if ("bye".equals(msg.toLowerCase())) {
            ctx.close();
        }
    }

    public String[] processMsg(String msg){
    	String [] strArr=msg.split("\\[|\\]");//������[��]�ָ���ַ��ǽ���Э��Ĺ��
    	
    	return strArr;
    }
    
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}
