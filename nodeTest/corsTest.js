/**
 * 使用cors实现跨域访问
 * 安装$ npm install cors
 */
var express = require('express')
  , cors = require('cors')
  , app = express();
var test  = require('./testAdd');
var https = require('https');
var testAdd = new test();
var request = require('request');
var bodyParser =  require("body-parser");  
var fs = require("fs");//文件系统

var server = app.listen(3337, function(){
  console.log('CORS-enabled web server listening on port 3337');
});
app.use(cors());//实现跨域
app.use(bodyParser.urlencoded({ extended: false }));  //处理post的参数
app.use(express.static('public'));//使用静态资源
//处理登录数据的提交
app.post('/userLogin',function (req, res,next) {
	   var a=req.body.login;  
	   var b=req.body.password;
	   console.log(a+'....'+b);
	   console.log(req.body);//对象形式
	   res.setHeader("Content-Type", "text/html; charset=UTF-8");  
	   fs.readFile('public/main.html', function (err, data) {
		      if (err) {
		          return console.error(err);
		      }
		      console.log("异步读取: " + data.toString());
		      res.send(data);  
		   });
});
//登录页
app.get('/login',function (req, res,next) {
	 var sum = testAdd.show(121,7374);
	   var b =  ["a",sum];
	   console.log(b);
	   var host = server.address().address;
	   var port = server.address().port;
	   console.log("应用实例，访问地址为", host, port);
	   //发送http请求
	/*   request('http://www.baidu.com', function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    //console.log(body) // Show the HTML for the baidu homepage.
				  console.log(body);
				  res.setHeader("Content-type","text/html; charset=gbk");
				  res.send(body);//json响应
			  }
			});*/
	   res.setHeader("Content-Type", "text/html; charset=UTF-8");  
	   
	// 异步读取
	   fs.readFile('public/login.html', function (err, data) {
	      if (err) {
	          return console.error(err);
	      }
	      console.log("异步读取: " + data.toString());
	      res.send(data);  
	   });
	  
});

