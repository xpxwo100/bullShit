var path = require('path');
var webpack = require('webpack');
var  NyanProgressPlugin = require('nyan-progress-webpack-plugin');
var rootPath = path.resolve(__dirname, '..'), // 项目根目录
  src = path.join(rootPath, 'src');// 开发源码目录
module.exports = {
	entry: { app: './src/app.js'},
	resolve: {
		modulesDirectories: ["../tools/node_modules", "../tools/node_modules/babel"]
	},
	resolveLoader: {
		root: path.join(rootPath, 'node_modules')
		
	},
	 output: {
            path: './bin',
            filename: 'app.bundle.js'
      },
	module: {
		loaders: [ {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },{
			exclude: /(node_modules)/,
			test: /\.jsx?$/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react']
			}
		}, {
			test: /\.json$/,
			loader: "json"
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.less$/,
			loader: 'style!css!less'	
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=25000'
		}]
	},
	 plugins: [
    new NyanProgressPlugin(), // 进度条
    new webpack.DefinePlugin({
      'process.env': { // 这是给 React / Redux 打包用的
        NODE_ENV: JSON.stringify('production')
      }
      // ================================
      // 配置开发全局常量
      // ================================
     /* __DEV__: env === 'development',*/
     /* __PROD__: env === 'production',
      __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
      __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染*/
    })
  ]
};