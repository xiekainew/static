let mongo = require('mongodb')
let common = require('./lib/common')
let logger = common.logger
let config = common.config
let mongodb
let store = {
    mongodb: mongodb
}

let self = store

store.error = (err, callback) => {
    if (callback) {
        logger.error('[store] error', err.message)
        callback(err)
    }
}

store.mongo = (callback => {
    logger.info('[store] mongo start %s', config.mongo.url)
    let mongoClient = mongo.MongoClient
    mongoClient.connect(config.mongo.url, (err, db) => {
        if (err) {
            logger.error('[store] mongo connect error')
            if (callback) callback(err)
            return
        }
        if (!config.mongo.user) {
            if (config.mongo.db) {
                store.mongodb = mongodb = db.db(config.mongo.db)
            } else {
                store.mongodb = mongodb = db
            }
            logger.info('[store] mongo connect success')
            if (callback) callback(null, db)
        } else {
            db.authenticate(config.mongo.user, config.mongo.password, (err, result) => {
                if (err) {
                    logger.error('[store] mongo auth error')
                    if (callback) callback(err)
                    return
                }
                if (config.mongo.db) {
                    store.mongodb = mongodb = db.db(config.mongo.db)
                } else {
                    store.mongodb = mongodb = db
                }
                logger.info('[store] mongo connect $s', result)
                if (callback) callback(null, result)
            })
        }
    })
})

store.init = (callback) => {
    logger.info('[store] store init start...')
    let proxy = common.eventProxy()
    proxy.all(['mongo'], (mongo) => {
        logger.info('[store] store init success !')
        callback(null, mongo)
    })
    proxy.fail((err) => {
        logger.info('[store] store init failed')
        if (callback) {
            callback(err)
        }
    })
    store.mongo(proxy.done('mongo'))
}
module.exports = store