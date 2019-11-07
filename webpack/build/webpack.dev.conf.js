'use strict'
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const webapckBaseConf = require('./webpack.base.conf.js')
const env = require('../config/config.dev.js')
module.exports = merge(webapckBaseConf, {
	devServer: {
		hot: true,
		host: '0.0.0.0',
		port: '9528',
		compress: true
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': env
		})
	]
})