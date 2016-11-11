/**
 * 最原始的http
 */
var http = require('http');
var testAdd = require('./testAdd');
http.createServer(function handler(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var a = new testAdd(4,4);
    var s = a.show();
    res.end(s+'Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
