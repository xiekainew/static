'use strict'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const webpack = require('webpack')

const webpackConfig = require('./webpack.prod.conf.js')

const spinner = ora('building for production...')
spinner.start()

rm(path.resolve(__dirname, '../dist/'), err => {
	if (err) throw err
	webpack(webpackConfig, (err, status) => {
		spinner.stop()
		if (err) throw err
		process.stdout.write(status.toString({
			colors: true,
			modules: false,
			children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
			chunks: false,
			chunkModules: false
		}) + '\n\n')
	})
	
})