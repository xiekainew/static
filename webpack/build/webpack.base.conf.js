'use strict'
const path = require('path')
const os = require('os')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const HtmlWabpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const HappyPack = require('happypack')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 创建多个实例
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractSCSS = new ExtractTextPlugin('stylesheets/[name]-two.css');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const marked = require("marked");
const renderer = new marked.Renderer();

const MyPlugin = require('./plugin/myPlugin.js')
const isDev = process.env.NODE_ENV === 'development'
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
    		loader: 'happypack/loader?id=happyBabel',
            // loader: 'babel-loader',
    		exclude: /node_modules/
    	}, {
            test: /\.(sa|sc|c)ss$/,
            use: [
                // MiniCssExtractPlugin.loader,
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
        }, 
        // {
        //     test: /\.scss$/,
        //     use: extractSCSS.extract({
        //         fallback: 'style-loader',
        //         use: ['vue-style-loader', 'css-loader', 'sass-loader']
        //     })
        // }, 
        {
            test: /\.md$/,
            use: [{
                loader: 'html-loader'
            }, {
                loader: 'markdown-loader',
                options: {
                    pedantic: true,
                    renderer
                }
            }]
        }, {
            test: /\.md$/,
            use: {
                loader: require.resolve('./loader/myMarkdown.js'),
                options: {
                    name: 'test'
                }
            }
        }, {
            test: /\.css$/,
            use: {
                loader: require.resolve('./loader/myCss.js')
            }
        }]
    },
    plugins: [
        new HappyPack({
            id: 'happyBabel',
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true'
            }],
            threadPool: happyThreadPool,
            verbose: true
        }),
        // new webpack.optimize.CommonsChunkPlugin({  废弃
        //     name: 'vender'
        // }),
        new MiniCssExtractPlugin({
            // filename: 'style/[name].[contenthash].css'
            filename: 'style/[name].[chunkhash].css'
        }),
    	new VueLoaderPlugin(),
    	new HtmlWabpackPlugin({
    		template: path.resolve(__dirname, '../index.html')
    	}),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        }),
        new PreloadWebpackPlugin({
            rel: 'prefetch'
            // include: ['test-preview']
        }),
        new MyPlugin({
            name: 'my-plugin'
        })
    ]
}