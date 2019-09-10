const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config.js')
const HTMLPlugin = require('html-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

const config = merge(base, {
	resolve: {
		alias: {
			'~api': resolve('api/index-client.js'),
			'api-config': resolve('api/config-client.js')
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			// 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.VUE_ENV': '"client"'
		}),
		// new webpack.optimize.CommonsChunkPlugin({ // 最新版本webpack 已经移除
		// 	name: 'vendor',
		// 	filename: 'vendor-[hash].min.js'
		// }),
		new HTMLPlugin({
			template: 'src/index.html'
		}),
		new VueSSRClientPlugin()
	]
})
if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		// 生产环境下 - 压缩js
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	}
		// }),
		// 用于使用service worker来缓存外部项目依赖项。
		new SWPrecachePlugin({
			cacheId: 'vue-hn',
			filename: 'service-worker.js',
			dontCacheBustUrlsMatching: /./,
			staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
		})
	)
}

module.exports = config