const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: '#source-map',
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
		filename: '[name].[chunkhash].js'
	},
	optimization: {
		splitChunks: {
			chunks: 'async'
		}
	},
	resolve: {
		alias: {
			'public': path.resolve(__dirname, '../public')
		}
	},
	module: {
		noParse: /es6-promise\.js$/,
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					preserveWhitespace: false
					// postcss: [
					// 	require('autoprefixer')({
					// 		browsers: ['last 3 versions']
					// 	})
					// ]
				}
			}, {
				test: /\.js$/,
				loader: 'buble-loader',
				exclude: /node_modules/,
				options: {
					objectAssign: 'Object.assign'
				}
			}, {
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[ext]?[hash]'
				}
			}, {
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: 'fonts/[name].[hash:7].[ext]'
				}
			}, {
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
			}, {
				test: /\.scss$/,
				loader: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		new VueLoaderPlugin()
	],
	performance: {
		hints: process.env.NODE_ENV === 'production' ? 'warning' : false
	}
}