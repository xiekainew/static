const http = require('http')
const express = require('express')
const path = require('path')
const chatServer = require('./lib/chat_server.js')

const app = express()


app.use('/', express.static(path.resolve(__dirname, './public/')))



var server = http.createServer(app)
chatServer.listen(server)


server.listen(4000, function() {
	console.log('app start localhost:4000')
})