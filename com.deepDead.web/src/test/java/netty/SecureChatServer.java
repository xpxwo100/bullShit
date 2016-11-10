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

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
//import io.netty.example.telnet.TelnetServer;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.util.SelfSignedCertificate;

import java.awt.Button;
import java.awt.Frame;
import java.awt.Label;
import java.awt.Panel;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import org.junit.Test;

/**
 * Simple SSL chat server modified from {@link TelnetServer}.
 */
public final class SecureChatServer {

    static final int PORT = Integer.parseInt(System.getProperty("port", "8992")); 
	public static java.awt.List cList = new java.awt.List(6);
	TextField chatField = new TextField(45);

	TextField tfData = new TextField(20);
	Label label = new Label("对话框");
	Button btnSend = new Button("确定");

	public static Channel ch = null;//netty 接口
	public static EventLoopGroup clientGroup = null;
	static private String loginName = "";

	public static String getName() {
		return loginName;
	}
	/*
	 * ��ɴ���
	 */

	void showFrame() {

		Frame cFrame = new Frame("server");
		cFrame.setSize(500, 350);
		cFrame.setVisible(true);
		cFrame.setLocationRelativeTo(null);
		cFrame.setResizable(false);
		cFrame.addWindowListener(new WindowAdapter() {

			@Override
			public void windowClosing(WindowEvent e) {
				clientGroup.shutdownGracefully();
				System.exit(0);
			}

		});

		cFrame.add(cList, "Center");
		Panel p = new Panel();
		// p.setLayout(new BorderLayout());
		p.add(label);
		p.add(chatField);
		p.add(btnSend);
		cFrame.add(p, "South");

		chatField.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {

				try {

					if (!chatField.getText().trim().equals("")) {
						String line = "[" + loginName + "]"
								+ chatField.getText();

						ChannelFuture lastWriteFuture = null;
						lastWriteFuture = ch.writeAndFlush(line + "\r\n");//接收数据

						chatField.setText("");

						if (line.equalsIgnoreCase("bey")) {
							ch.closeFuture().sync();//结束
						}

						if (lastWriteFuture != null) {
							lastWriteFuture.sync();//同步过去
						}
					}
				} catch (InterruptedException e3) {
					// TODO Auto-generated catch block
					e3.printStackTrace();
				} finally {
					// clientGroup.shutdownGracefully();
				}

			}
		});

		btnSend.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				try {
					if (!chatField.getText().trim().equals("")) {
						String line = "[" + loginName + "]"
								+ chatField.getText();
						System.out.println("btnSend :"+line);
						ChannelFuture lastWriteFuture = null;
						lastWriteFuture = ch.writeAndFlush(line + "\r\n");

						chatField.setText("");

						if (line.equalsIgnoreCase("bey")) {
							ch.closeFuture().sync();
						}
						if (lastWriteFuture != null) {
							lastWriteFuture.sync();
						}
					}
				} catch (InterruptedException e3) {
					// TODO Auto-generated catch block
					e3.printStackTrace();
				} finally {
					// clientGroup.shutdownGracefully();
				}

			}
		});

	}
    public  void testServer() throws Exception {
    	//SelfSignedCertificate��һ�����ڹ��������Ϣ�Ĺ���������
        SelfSignedCertificate ssc = new SelfSignedCertificate();
        	//��������Ȩ�ͷ���˽Կ
        SslContext sslCtx = SslContext.newServerContext(ssc.certificate(), ssc.privateKey());       
        EventLoopGroup bossGroup = new NioEventLoopGroup(1);
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap b = new ServerBootstrap();//��������򣬷������˿�����������
            b.group(bossGroup, workerGroup)
             .channel(NioServerSocketChannel.class)
             .handler(new LoggingHandler(LogLevel.INFO))
             .childHandler(new SecureChatServerInitializer(sslCtx));
            ch = b.bind(PORT).sync().channel().closeFuture().sync().channel();
            new SecureChatServer().showFrame();//显示面板
            	//bind�󶨶˿ڣ�����һ��channnel
            	//sync����future ֱ��future��Ϣ�ʹ����future
            	//channel ��future��io��Ϣ������ϵʱ����һ��channel��
            	//closefuture �����ϵ���Ϣ������Ϻ����»�ȡfuture
            	//�����൱��һ��ѭ����������
            
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
    @Test
    public void test2(){
    	try {
			testServer();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
