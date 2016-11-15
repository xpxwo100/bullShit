import org.apache.thrift.TException;

public class UserServiceImpl implements UserService.Iface{

	@Override
	public LoginResponse login(String username, String password)
			throws TException {
		// TODO Auto-generated method stub
		LoginResponse response = new LoginResponse();
		if ("xpx".equals(username) && "123456".equals(password)) {
			response.setCode("0000");
			response.setMsg("成功");
			response.setToken("" + System.currentTimeMillis());
		} else {
			response.setCode("1000");
			response.setMsg("失败");
		}
		return response;
	}

}
