var express = require('express')
var request = require('request')
var cheerio = require('cheerio')
var app = express()


app.get('/', function (req, res) {
    // res.send('hello world')
    request('http://www.jikexueyuan.com/', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            $ = cheerio.load(body)
            console.log($)
            // res.send('stest')
            res.json({
                'class': $('.aside-cList li').length
            })
        }
    })
})

app.listen(3001)
