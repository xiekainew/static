'use strict'
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const HtmlWabpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 创建多个实例
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractSCSS = new ExtractTextPlugin('stylesheets/[name]-two.css');

module.exports = {
    mode: process.env.NODE_ENV,
	context: path.resolve(__dirname, '../'), // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
	entry: {
		app: './src/main.js'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'], // 默认扩展名
		alias: {
			'@': path.resolve(__dirname, '../src/') // 快捷路径
		}
	},
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/chunk/[id].[chunkhash].js'
    },
    module: {
    	rules: [{
    		test: /\.vue$/,
    		loader: 'vue-loader'
    	}, {
    		test: /\.js$/,
    		loader: 'babel-loader',
    		exclude: /node_modules/
    	}, {
            test: /\.css$/,
            use: extractCSS.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        }, {
            test: /\.scss$/,
            use: extractSCSS.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({  废弃
        //     name: 'vender'
        // }),
        new ExtractTextPlugin({
            filename: 'style/[name].[chunkhash].css'
        }),
    	new VueLoaderPlugin(),
    	new HtmlWabpackPlugin({
    		template: path.resolve(__dirname, '../index.html')
    	})
    ]
}