'use strict'

const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const utils = require('./utils.js')
const VueLoaderConfig = require('./vue-loader.conf.js')
const config = require('../config')
const sourceMap = isDev ? config.dev.cssSourceMap : config.build.productionSourceMap

function resolve(dir) {
	return path.relative(path.join(__dirname, '../src/'), dir)
}
let loaders = utils.styleLoaders({ sourceMap: sourceMap, extract: !isDev, usePostCSS: true });
	loaders.push({
	    test: /\.vue$/,
	    loader: 'vue-loader',
	    options: VueLoaderConfig
	}, {
	    test: /\.js$/,
	    loader: 'babel-loader',
	    exclude: /node_modules/
	}, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader:'url-loader',
            options:{
              limit: 10000,
              name: '[name].[ext]?[hash]'
            }
          }
        ],
        exclude: /node_modules/
     }, {
	    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
	    use: {
	        loader: 'url-loader',
	        options: {
	            limit: 10000,
	            name: 'fonts/[name].[hash:7].[ext]'
	        }
	    }
	}, {
		// test: /\.js$/,
		// enforce: 'pre',
  //       loader: 'eslint-loader',
  //       include: [path.resolve(__dirname, 'src')]
	})

module.exports = loaders