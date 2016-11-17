var path = require('path');
var webpack = require('webpack'),
 HtmlWebpackPlugin = require('html-webpack-plugin'),
	 ExtractTextPlugin = require('extract-text-webpack-plugin'),
		 BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
			 NyanProgressPlugin = require('nyan-progress-webpack-plugin');
var rootPath = path.resolve(__dirname, '..'), // 项目根目录
	src = path.join(rootPath, 'src'); // 开发源码目录
module.exports = {
	entry: {
		app: './src/app.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		//root: ['./node_modules']
		alias: {
			// ================================
			// 自定义路径别名
			// ================================
			ASSET: path.resolve(__dirname, "src/assets")
		}
	},
	resolveLoader: {
		root: path.join(rootPath, 'node_modules')
	},
	output: {
		path: __dirname + '/bin',
		filename: 'app.bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
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
		}, {
			test: /\.scss$/,
			loader: 'style!css!sass'
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
			/* __DEV__: env === 'development', */
			/*
			 * __PROD__: env === 'production', __COMPONENT_DEVTOOLS__: false, //
			 * 是否使用组件形式的 Redux DevTools __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
			 */
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('[name].css'),
		new HtmlWebpackPlugin({
			filename: 'login.html',
			template: path.resolve(__dirname, "src/login.html"),
			chunksSortMode: 'none'
		})
	]
};