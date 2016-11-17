/**
 * thrift RPC调用
 */
var thrift = require('thrift');
var login_types = require('../gen-nodejs/login_types');
var userService = require('../gen-nodejs/UserService');
var transport = thrift.TSocket; //和TBufferedTransport TSocket使用阻塞方式
var protocol = thrift.TBinaryProtocol; //传输协议

function aaa() {
	var connection = thrift.createConnection("localhost", 7090, {
		transport: transport,
		protocol: protocol
	});

	client = thrift.createClient(userService, connection);
	/**
	 * 绑定错误
	 */
	connection.on('error', function(err) {
		console.error(err);
	});
	var t1 = new Date().getTime();
	var t2 = t1;
	var interval = 0;
	console.log('发出请求');
	var pass = 1;
	t1 = process.uptime() * 1000;
	for(var i = 0; i < 5; i++) {
		pass = pass + i;
		console.log(pass);
		client.login('xpx', pass + '', function(err, res) {
			if(err) {
				console.error(err);
				connection.end();
			} else {
				console.log("代码:", res.code);
				console.log("消息:", res.msg);
				console.log("token:", res.token);
				connection.end();

			}
		});
		t2 = process.uptime() * 1000;
	}
	interval = (t2 - t1);
	console.log('【process.uptime()】interval: ', interval);
}

module.exports = aaa