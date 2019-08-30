'use strict'

const utils = require('./utils.js')
const config = require('../config')
// console.log(config)
// 

const isDev = process.env.NODE_ENV === 'development'
const sourceMapEnabled = isDev ? config.build.cssSourceMap : config.build.productionSourceMap

module.exports = {
	loaders: utils.cssLoaders({
		sourceMap: sourceMapEnabled,
		extract: !isDev
	}),
	cssSourceMap: sourceMapEnabled,
	cacheBusting: config.dev.cacheBusting,
	transformToRequire: {
		video: ['src', 'poster'],
		source: 'src',
		img: 'src',
		image: 'xlink:href'
	}
}