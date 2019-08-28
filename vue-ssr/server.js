const fs = require('fs')
const path = require('path')
const express = require('express')

const compression = require('compression')
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'
const serverInfo = `express/${require('express/package.json').version}` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

console.log(serverInfo)

const app = express()

function createRenderer(bundle, template) {
	return require('vue-server-renderer').createBundleRenderer(bundle, {
		template,
		cache: require('lru-cache')({
			max: 1000,
			maxAge: 1000 * 60 * 15
		})
	})
}

let renderer

if (isProd) {
	const bundle = require('./dist/vue-ssr-bundle.json')
	const template = fs.readFileSync(resolve('./dist/index.html'), 'utf-8')

	renderer = createRenderer(bundle, template)
} else {
	require('./build/setup-dev-server')(app, (bundle, template) => {
		// console.log(bundle)
		// console.log(template)
		renderer = createRenderer(bundle, template)
		console.log(1212121212, renderer)
	})
}

const serve = (path, cache) => express.static(resolve(path), {
	maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0 // 静态资源设置缓存
})

app.use(compression({ threshold: 0 })) // gzip 压缩
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
app.use('/service-worker.js', serve('./dist/service-worker.js', true))

console.log(renderer)
app.get('*', (req, res) => {
	console.log(req.url)
	if (!renderer) {
    	return res.end('waiting for compilation... refresh in a moment.')
	}
	const s = Date.now()

	res.setHeader("Content-Type", "text/html")
	res.setHeader("Server", serverInfo)

	const errorHandler = err => {
		if (err && err.code === 404) {
			console.log(404)
			res.status(404).end('404 | Page Not Found')
		} else {
			res.status(500).end('500 | 服务端报错')
			console.error('error during render' + req.url)
			console.error(err)
		}
	}
	var title = '测试vue-ssr'
	// renderer.renderToStream({title, url: req.url})
	// 	.on('error', errorHandler)
	// 	.on('end', () => console.log(`whole request: ${Date.now() - s}ms`))
	// 	.pipe(res)
	
	renderer.renderToString({title, url: req.url}, (err, html) => {
		console.log(html)
		if (err) {
			console.log('err', err)
			return errorHandler(err)
		}
		res.send(html)
		if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
	}) 	
	
})

const port = process.env.PORT || 9527

app.listen(port, () => {
  	console.log(`server started at localhost:${port}`)
})








