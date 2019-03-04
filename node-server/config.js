let app = require('express')()

app.set('env', process.env.NODE_ENV || 'development')

let config = {
    port: 2001,
    platform: '格物致知'
}

config.mongo = {}
if (app.get('env') === 'development') {
    config.mongo.url = 'mongodb://127.0.0.1:27017/admin'
    config.mongo.user = 'root'
    config.mongo.password = '123123'
    config.mongo.db = 'test'
} else {
    config.mongo.url = 'mongodb://127.0.0.1:27017/admin'
    config.mongo.user = 'root'
    config.mongo.password = '123123'
    config.mongo.db = 'test'
}

module.exports = config