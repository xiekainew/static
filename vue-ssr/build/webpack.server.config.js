const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config.js')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = merge(base, {
	target: 'node',
	entry: './src/entry-server.js',
	output: {
		filename: 'server-bundle.js',
		libraryTarget: 'commonjs2' // exported with module.exports 通用模块定义
	},
	resolve: {
		alias: {
			'~api': resolve('api/index-server.js'),
			'api-config': resolve('api/config-server.js')
		}
	},
	externals: Object.keys(require('../package.json').dependencies),
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      		'process.env.VUE_ENV': '"server"'
		}),
		new VueSSRPlugin()
	]
})