const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpackbar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Loaders = require('./loader.js')

const isDev = process.env.NODE_ENV === 'development'
console.log('isDev', isDev)
module.exports = {
	mode: process.env.NODE_ENV,
	devtool: isDev ? '#cheap-module-source-map' : false,
	entry: {
		app: './src/entry-client.js'
		// vendor: [
		// 	'vue',
		// 	'vue-router',
		// 	'vuex'
		// ]
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/',
		filename: 'js/[name].[chunkhash].js', // 用于长效缓存
		chunkFilename: 'js/chunk/[id].[chunkhash].js'
	},
	optimization: {
		splitChunks: {
			chunks: 'async',
		}
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'public': path.resolve(__dirname, '../public'),
			'@': path.resolve(__dirname, '../src')
		}
	},
	module: {
		noParse: /es6-promise\.js$/,
		rules: Loaders
		// rules: [
		// 	{
		// 		test: /\.vue$/,
		// 		loader: 'vue-loader',
		// 		options: {
		// 			extractCSS: true
		// 			// preserveWhitespace: false
		// 			// postcss: [
		// 			// 	require('autoprefixer')({
		// 			// 		browsers: ['last 3 versions']
		// 			// 	})
		// 			// ]
		// 		}
		// 	}, {
		// 		test: /\.js$/,
		// 		loader: 'buble-loader',
		// 		exclude: /node_modules/,
		// 		options: {
		// 			objectAssign: 'Object.assign'
		// 		}
		// 	}, {
		// 		test: /\.(png|jpg|gif|svg)$/,
		// 		loader: 'url-loader',
		// 		options: {
		// 			limit: 10000,
		// 			name: '[name].[ext]?[hash]'
		// 		}
		// 	}, {
		// 		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		// 		loader: 'url-loader',
		// 		query: {
		// 			limit: 10000,
		// 			name: 'fonts/[name].[hash:7].[ext]'
		// 		}
		// 	}, {
		// 		test: /\.css$/,
		// 		loader: ['style-loader', 'css-loader']
		// 	}, {
		// 		test: /\.scss$/,
		// 		loader: ['style-loader', 'css-loader', 'sass-loader']
		// 	}
		// ]
	},
	plugins: [
		new VueLoaderPlugin(),
		// new bundleAnalyzerPlugin(),
		new webpackbar(),
		new MiniCssExtractPlugin({
			// name: 'vendor',
			filename: 'style/[name].[chunkhash].css'
		})
	],
	performance: {
		hints: process.env.NODE_ENV === 'production' ? 'warning' : false
	}
}