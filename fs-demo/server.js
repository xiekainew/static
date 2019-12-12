const fs = require('fs')
const path = require('path')
const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')
const compression = require('compression')
const isProd = process.env.NODE_ENV === 'production'
const resolve = file => path.resolve(__dirname, file)

const serve = (path, cache) => express.static(resolve(path), {
	maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0 // 静态资源设置缓存
})
const app = express()
app.use(compression({ threshold: 0 })) // gzip 压缩
app.use('/', serve('./fis3-server', true))

const proxyTable = {
    '/proxy': {
         target: 'http://test.www.zhuafan.live',
         changeOrigin: true,
         pathRewrite: {
             '^/proxy': ''
         },
         cookieDomainRewrite: '',
         secure: false
     }
}
Object.keys(proxyTable).forEach((context) => {
	var options = proxyTable[context]
	if (typeof options === 'string') {
		options = {
			target: options
		}
	}
	app.use(context, proxyMiddleware(options))
})


const port = process.env.PORT || 9002
app.listen(port, () => {
	console.log(`server started at localhost:${port}`)
})
