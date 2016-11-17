import React from '../react'
import ReactDOM from '../react-dom'

var path = require('path');
var rootPath = path.resolve(__dirname, '..'), // 项目根目录
  src = path.join(rootPath, 'src');// 开发源码目录
  console.log(path.join(src, 'app.js'));
  

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('demo1')
);