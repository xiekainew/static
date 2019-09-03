 /**
  * 
  * @authors Weller Chen (wellerchen@bitasset.com)
  * @date    2016-10-26 17:54:39
  * @version $Id$
  * @description 
  * @update [user] [date] [instruction]
  */
 var path = require('path')
 var package = require('../package.json');
 var url = "";
 // var url = package.swApp.url[package.swApp.curUrl] ? package.swApp.url[package.swApp.curUrl].proxyUrl : "http://www.baidu.com/";
 var sz = "https://yapi.coinidx.io/mock/15/"
 module.exports = {
     name: "bitasset",
     version: "2.0.4",
     appCatch: false,
     build: {
         assetsRoot: path.resolve(__dirname, '../dist/dist/'),
         assetsPublicPath: '/',
         assetsPublicLibPath: 'js/lib',
         assetsPublicCssPath: 'style',
         assetsPublicImgPath: 'images',
         assetsSubDirectory: '',
         alias: {
             lockr: path.join(__dirname, '../node_modules/lockr/lockr.js')
         },
         /**
          * [aliasMerge 是否合并别名]
          * @type {Object}
          */
         aliasMerge: {
             isMerge: true,
             mergeName: "common"
         },
         productionSourceMap: false,
         // https://webpack.js.org/configuration/devtool/#production
         devtool: '#source-map',
         bundleAnalyzerReport: false,
         cssSourceMap: false,
         cacheBusting: true,
         productionGzip: true, //是否启用gzip 
         productionGzipExtensions: ['js', 'css'], //gzip文件的类型,
         staticRouter: [] //静态化路由 ["/","/demo"]
     },
     //代理名称
     dev: {
         openChrome: true, //打开浏览器
         port: 8080, //false or number
         sslPort: false, //false or number
         devtool: 'cheap-module-eval-source-map',
         cacheBusting: true,
         cssSourceMap: true,
         proxyTable: {
             '/api/**': {
                target: "http://10.220.8.165:2002/api/",
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true,
                secure: false
            }
         }
     },
     test: {
         openChrome: true, //打开浏览器
         port: false, //false or number ka
         sslPort: 4433, //false or number
         // proxyTable: {
         //     '/proxy/**': {
         //         target: url,
         //         pathRewrite: {
         //             '^/proxy': ''
         //         },
         //         // cookieDomainRewrite:"",
         //         changeOrigin: true,
         //         secure: false
         //     }
         // }
     }
 }