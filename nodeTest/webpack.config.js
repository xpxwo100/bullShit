var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './main.js',

	resolve: {
		modulesDirectories: ["../tools/node_modules", "../tools/node_modules/babel"]
	},

	resolveLoader: {
		root: path.resolve(__dirname, 'node_modules')
	},

	output: {
		path: './',
		filename: 'index.js',
	},

	module: {
		loaders: [{
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
	}
};