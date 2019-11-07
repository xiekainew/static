'use strict'

const merge = require('webpack-merge')
const webapckBaseConf = require('./webpack.base.conf.js')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const env = require('../config/config.prod.js')
module.exports = merge(webapckBaseConf, {
	devtool: false,
	optimization: {
		runtimeChunk: {
			name: 'manifest'
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': env
		}),
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			// algorithm: 'gzip',
			test: /\.(js|css|html)$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]
})