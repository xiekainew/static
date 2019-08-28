const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()

app.get('*', (req, res) => {
	console.log(req.url)
	res.end('hello world')
})

const port = process.env.PORT || 7777

app.listen(port, () => {
  	console.log(`server started at localhost:${port}`)
})








