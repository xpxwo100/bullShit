/**
 * 手动设置头实现跨域访问
 */
//express_demo.js 文件
var express = require('express');
var app = express();

var server = app.listen(3337, function () {
	 console.log("3337");
});
app.get('/*', function (req, res) {
	var a = req.query;
	var b='';
	var c= '';
	for(var i in a){
		b = b +a[i];
		c += i;
	}
	 res.send(req.path+b+'Hello World'+c);
	 console.log("主页get请求");
	  var host = server.address().address;
	  var port = server.address().port;

	  console.log("应用实例，访问地址为", host, port);
});
//allow custom header and CORS
app.all('*', function(req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.post('/*', function (req, res) {
		var aa = {
		      data : ["a",'ss']
		   };
		var b =  ["a",'ss'];
		   console.log(b);
		   var host = server.address().address;
		   var port = server.address().port;
		   console.log("应用实例，访问地址为", host, port);
		   res.json(b);//json响应
	});
