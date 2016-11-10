package netty;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;

import java.awt.Button;
import java.awt.Frame;
import java.awt.Label;
import java.awt.Panel;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.net.ssl.SSLException;
import javax.swing.JOptionPane;

import org.junit.Test;

/*
 * �ͻ���
 * �Ӵ������ͻ���
 */

public class ChatClient {

	public static final String HOST = System.getProperty("host", "127.0.0.1");
	public static final int PORT = Integer
			.parseInt(System.getProperty("port", "8992"));
	static private String loginName = "";

	public static String getName() {
		return loginName;
	}

	public static java.awt.List cList = new java.awt.List(6);
	TextField chatField = new TextField(45);

	TextField tfData = new TextField(20);
	Label label = new Label("对话框");
	Button btnSend = new Button("确定");

	public static Channel ch = null;//netty 接口
	public static EventLoopGroup clientGroup = null;

	/*
	 * ��ɴ���
	 */

	void showFrame() {

		Frame cFrame = new Frame("CallMe");
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

	public void testChat() throws SSLException,
			InterruptedException {
		/*try {
			// �������һ���û�Ĭ�ϵ��û���
			String a = JOptionPane
					.showInputDialog("Input your nickname please");
			if (a != null) {
				if (!a.trim().equals(""))
					loginName = a;
				else {
					loginName = InetAddress.getLocalHost().toString();
					System.out.println(loginName);
				}
			}
		} catch (UnknownHostException e) {

			e.printStackTrace();
		}*/
		final SslContext sslctx = SslContext
				.newClientContext(InsecureTrustManagerFactory.INSTANCE);
		clientGroup = new NioEventLoopGroup();
		Bootstrap b = new Bootstrap();
		b.group(clientGroup).channel(NioSocketChannel.class)
				.handler(new SecureChatClientInitializer(sslctx));
		ch = b.connect(HOST, PORT).sync().channel();//建立连接
		new ChatClient().showFrame();//显示面板
	}
      @Test
      public void test(){
    	  try {
			testChat();//
		} catch (SSLException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
      }
}
