const Vue = require('vue')
const fs = require('fs')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync(__dirname + '/index.template.html', 'utf-8')
})

server.get('/index.html', function (req, res) {
    console.log(req.url)
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>visit{{url}}</div>`
    })
    const context = {
        title: 'hello pending'
    }
    renderer.renderToString(app, context, (err, html) => {
        console.log(html)
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        res.end(html)
    })
})

server.listen(8000)
