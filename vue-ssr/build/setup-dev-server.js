const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

module.exports = function setupDevServer(app, cb) {
	let bundle
	let template

	clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
	clientConfig.output.filename = '[name].js'
	clientConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)

	const clientCompiler = webpack(clientConfig)
	const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
		publicPath: clientConfig.output.publicPath,
		stats: {
			colors: true,
			chunks: false
		}
	})
	app.use(devMiddleware)

	clientCompiler.plugin('done', () => {
		const fs = devMiddleware.fileSystem
		const filePath = path.join(clientConfig.output.path, 'index.html')
		if (fs.existsSync(filePath)) {
			template = fs.readFileSync(filePath, 'utf-8')
			console.log(4444444444)
			if (bundle) {
				console.log(11111)
				cb(bundle, template)
			}
		}
	})

	app.use(require('webpack-hot-middleware')(clientCompiler))

	const serverCompiler = webpack(serverConfig)
	const mfs = new MFS()
	serverCompiler.outputFileSystem = mfs
	serverCompiler.watch({}, (err, stats) => {
		if (err) throw err
		stats = stats.toJson()
		stats.errors.forEach(err => console.error(err))
	    stats.warnings.forEach(err => console.warn(err))
	    // 读取使用vue-ssr-webpack-plugin生成的bundle（vue-ssr-bundle.json）
	    const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-bundle.json')
	    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
	    console.log(3333333333)
	    if (template) {
			console.log(2222222222)
			cb(bundle, template)
	    }
	})
}








