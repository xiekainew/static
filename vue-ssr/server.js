const Vue = require('vue')
const fs = require('fs')
const path = require('path')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
	template: fs.readFileSync(path.resolve(__dirname + '/index.template.html'), 'utf-8')
})


const context = {
	title: 'vue-ssr',
	meta: `
		<meta ...>
		<meta ...>
	`
}

server.get('*', (req, res) => {
	const app = new Vue({
		data: {
			url: req.url
		},
		template: `<div>访问的URL是：{{url}}</div>`
	})

	renderer.renderToString(app, context, (err, html) => {
		if (err) {
			res.status(500).end('error')
			return
		}
		// res.end(`
	 //      <!DOCTYPE html>
	 //      <html lang="en">
	 //      	<meta charset="utf-8">
	 //        <head><title>Hello</title></head>
	 //        <body>${html}</body>
	 //      </html>
	 //    `)
	 	res.end(html)
	})
})

server.listen(9000)