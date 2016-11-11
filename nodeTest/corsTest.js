/**
 * 使用cors实现跨域访问
 * 安装$ npm install cors
 */
var express = require('express')
  , cors = require('cors')
  , app = express();
 
var test  = require('./testAdd');
var testAdd = new test();


var server = app.listen(3337, function(){
  console.log('CORS-enabled web server listening on port 3337');
});
app.use(cors());
app.post('/*',function (req, res,next) {
	   var sum = testAdd.show(121,7374);
	   var b =  ["a",sum];
	   console.log(b);
	   var host = server.address().address;
	   var port = server.address().port;
	   console.log("应用实例，访问地址为", host, port);
	   res.json(b);//json响应
});
app.get('/*',function (req, res,next) {
	 var sum = testAdd.show(121,7374);
	   var b =  ["a",sum];
	   console.log(b);
	   var host = server.address().address;
	   var port = server.address().port;
	   console.log("应用实例，访问地址为", host, port);
	   res.json(b);//json响应
});