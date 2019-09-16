let mongo = require('mongodb')
let common = require('./lib/common')
let logger = common.logger
let config = common.config
let mongodb
let store = {
    mongodb: mongodb
}
var json = JSON.stringify;
var parse = JSON.parse;

let self = store

store.error = (err, callback) => {
    if (callback) {
        logger.error('[lib] error', err.message)
        callback(err)
    }
}


// 从mongodb中查找数据
store.find = function(schema, query, opts, callback) {
    if (!schema) {
        var err = new Error('schema is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }
    if (!query) {
        var err = new Error('query is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }
    if (!opts) {
        var err = new Error('opts is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }

    var collection = self.mongodb.collection(schema);
    console.log(query)
    if (!opts || typeof(opts) == 'function') {
        callback = opts;
        opts = {};
    }

    if (opts.find == 'findOne') {
        collection.findOne(query, opts.options||{}, function(err, result){
            if (err) {
                logger.error("[store]", opts.find, "error", schema, 'query:', json(query), 'opts:', json(opts), 'errmsg:', err.message);
            }
            if (opts.debug) {
                //logger.debug("[store]", opts.find, "result", schema, 'query:', json(query), 'opts:', json(opts), 'result:', (result ? result._id : null));
            }
            if (callback) {
                callback(err, result);
            } else {
                // not callback
            }
        });
    } else if (opts.find == 'count') {
        collection.count(query, opts.options||{}, function(err, result){
            if (err) {
                logger.error("[store]", opts.find, "error", schema, 'query:', json(query), 'opts:', json(opts), 'errmsg:', err.message);
            }
            if (opts.debug) {
                //logger.debug("[store]", opts.find, "result", schema, 'query:', json(query), 'opts:', json(opts), 'result:', (result ? result._id : null));
            }
            if (callback) {
                callback(err, result);
            } else {
                // not callback
            }
        })
    } else {
        if (opts.map == 'sort') {
            if (opts.skip>=0 && opts.limit) {
                collection.find(query, opts.options||{}).sort(opts.sort).skip(opts.skip).limit(opts.limit).toArray(function(err, result){
                    if (err) {
                        logger.error("[store] find error", schema, 'query:', json(query), 'opts:', json(opts), 'errmsg:', err.message);
                    }
                    if (opts.debug) {
                        //logger.debug("[store] find result", schema, 'query:', json(query), 'opts:', json(opts), 'result:', result.length);
                    }
                    if (callback) {
                        callback(err, result);
                    } else {
                        // not callback
                    }
                });
            } else {
                collection.find(query, opts.options||{}).sort(opts.sort).toArray(function(err, result){
                    if (err) {
                        logger.error("[store] find error", schema, 'query:', json(query), 'opts:', json(opts), 'errmsg:', err.message);
                    }
                    if (opts.debug) {
                        //logger.debug("[store] find result", schema, 'query:', json(query), 'opts:', json(opts), 'result:', result.length);
                    }
                    if (callback) {
                        callback(err, result);
                    } else {
                        // not callback
                    }
                });
            }
        } else {
            collection.find(query, opts.options||{}).toArray(function(err, result){
                // console.log(result)
                if (err) {
                    logger.error("[store] find error", schema, 'query:', json(query), 'opts:', json(opts), 'errmsg:', err.message);
                }
                if (opts.debug) {
                    //logger.debug("[store] find result", schema, 'query:', json(query), 'opts:', json(opts), 'result:', result.length);
                }
                if (callback) {
                    callback(err, result);
                } else {
                    // not callback
                }
            });
        }
    }
}
// 插入数据到mongodb
store.insert = function(schema, docs, opts, callback) {
    if (!schema) {
        var err = new Error('schema is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }
    if (!docs) {
        var err = new Error('docs is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }
    if (!opts) {
        var err = new Error('opts is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }

    var collection = self.mongodb.collection(schema);
    if (!opts || typeof(opts) == 'function') {
        callback = opts;
        opts = {};
    }

    if (opts.insert == 'insertOne') {
        collection.insertOne(docs, opts.options||{}, function(err, result){
            if (err) {
                logger.error("[store]", opts.insert, "error", schema, 'docs:', json(docs), 'opts:', json(opts), 'errmsg:', err.message);
            }
            if (opts.debug) {
                //logger.debug("[store]", opts.insert, "result", schema, 'docs:', json(docs), 'opts:', json(opts), 'result:', result?result.result:null);
            }
            if (callback) {
                callback(err, result?result.ops[0]:null);
            } else {
                // not callback
            }
        })
    } else {
        collection.insert(docs, opts.options||{}, function(err, result){
            if (err) {
                logger.error("[store] insert error", schema, 'docs:', json(docs), 'opts:', json(opts), 'errmsg:', err.message);
            }
            if (opts.debug) {
                //logger.debug("[store] insert result", schema, 'docs:', json(docs), 'opts:', json(opts), 'result:', result?result.result:null);
            }
            if (callback) {
                callback(err, result?result.ops:null);
            } else {
                // not callback
            }
        });
    }

}

// 更新数据到mongodb
store.update = function(schema, query, docs, opts, callback) {
    if (!schema) {
        var err = new Error('schema is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }
    if (!query) {
        var err = new Error('query is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }
    if (!docs) {
        var err = new Error('docs is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }
    if (!opts) {
        var err = new Error('opts is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }

    var collection = self.mongodb.collection(schema);
    if (!opts || typeof(opts) == 'function') {
        callback = opts;
        opts = {};
    }

    if (opts.update == 'updateOne') {
        collection.updateOne(query, {$set: docs}, opts.options||{}, function(err, result){
            if (err) {
                logger.error("[store]", opts.update, "error", schema, 'query:', json(query), 'docs:', json(docs), 'opts:', json(opts), 'errmsg:', err.message);
            }
            if (opts.debug) {
                //logger.debug("[store]", opts.update, "result", schema, 'query:', json(query), 'docs:', json(docs), 'opts:', json(opts), 'result:', result?result.result:null);
            }
            if (callback) {
                callback(err, result?result.result:null);
            } else {
                // not callback
            }
        })
    } else if (opts.update = 'upsert') {
        collection.update(query, {$set: docs}, opts.options||{upsert:true}, function(err, result){
            if (err) {
                logger.error("[store] update error", schema, 'query:', json(query), 'docs:', json(docs), 'opts:', json(opts), 'errmsg:', err.message);
            }
            if (opts.debug) {
                //logger.debug("[store] update result", schema, 'query:', json(query), 'docs:', json(docs), 'opts:', json(opts), 'result:', result?result.result:null);
            }
            if (callback) {
                callback(err, result?result.ops:null);
            } else {
                // not callback
            }
        });
    } else {
        collection.update(query, {$set: docs}, opts.options||{}, function(err, result){
            if (err) {
                logger.error("[store] update error", schema, 'query:', json(query), 'docs:', json(docs), 'opts:', json(opts), 'errmsg:', err.message);
            }
            if (opts.debug) {
                //logger.debug("[store] update result", schema, 'query:', json(query), 'docs:', json(docs), 'opts:', json(opts), 'result:', result?result.result:null);
            }
            if (callback) {
                callback(err, result?result.ops:null);
            } else {
                // not callback
            }
        });
    }
}


// 从mongodb移除数据，暂时实现为假删除
store.remove = function(schema, query, docs, opts, callback) {
    if (!schema) {
        var err = new Error('schema is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }
    if (!query) {
        var err = new Error('query is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }
    if (!docs) {
        var err = new Error('docs is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }
    if (!opts) {
        var err = new Error('opts is null');
        logger.error('[store] error', err.message);
        return callback(err);
    }

    var collection = self.mongodb.collection(schema);
    if (!opts || typeof(opts) == 'function') {
        callback = opts;
        opts = {};
    }

    docs = {status:-1};
    if (opts.update == 'updateOne') {
        collection.updateOne(query, docs, opts.options||{}, function(err, result){
            if (err) {
                logger.error("[store]", opts.update, "error", schema, 'query:', json(query), 'docs:', json(docs), 'opts:', json(opts), 'errmsg:', err.message);
            }
            if (opts.debug) {
                //logger.debug("[store]", opts.update, "result", schema, 'query:', json(query), 'docs:', json(docs), 'opts:', json(opts), 'result:', result?result.result:null);
            }
            if (callback) {
                callback(err, result?result.ops[0]:null);
            } else {
                // not callback
            }
        })
    } else if (opts.update == 'deleteOne') {
        collection.deleteOne(query, /*docs, opts.options||{}, */function(err, result){
            if (err) {
                logger.error("[store]", opts.update, "error", schema, 'query:', json(query), 'docs:', /*json(docs), 'opts:', json(opts), */'errmsg:', err.message);
            }
            if (opts.debug) {
                //logger.debug("[store]", opts.update, "result", schema, 'query:', json(query), 'docs:', json(docs), 'opts:', json(opts), 'result:', result?result.result:null);
            }
            if (callback) {
                callback(err, result?result.result.n/*result.ops[0]*/:null);
            } else {
                // not callback
            }
        })
    } else {
        collection.update(query, {$set: docs}, opts.options||{}, function(err, result){
            if (err) {
                logger.error("[store] update error", schema, 'query:', json(query), 'docs:', json(docs), 'opts:', json(opts), 'errmsg:', err.message);
            }
            if (opts.debug) {
                //logger.debug("[store] update result", schema, 'query:', json(query), 'docs:', json(docs), 'opts:', json(opts), 'result:', result?result.result:null);
            }
            if (callback) {
                callback(err, result?result.ops:null);
            } else {
                // not callback
            }
        });
    }
}


store.mongo = (callback => {
    logger.info('[lib] mongo start %s', config.mongo.url)
    let mongoClient = mongo.MongoClient
    mongoClient.connect(config.mongo.url, {
        // useNewUrlParser: true
    }, (err, db) => {
        if (err) {
            logger.error('[lib] mongo connect error')
            if (callback) callback(err)
            return
        }
        if (!config.mongo.user) {
            if (config.mongo.db) {
                store.mongodb = mongodb = db.db(config.mongo.db)
            } else {
                store.mongodb = mongodb = db
            }
            logger.info('[lib] mongo connect success')
            if (callback) callback(null, db)
        } else {
            // if (config.mongo.db) {
            //     store.mongodb = mongodb = db.db(config.mongo.db)
            // } else {
            //     store.mongodb = mongodb = db
            // }
            // logger.info(db)
            // logger.info(store.mongodb)
            // logger.info('权限登录')
            // logger.info(db)
            db.authenticate(config.mongo.user, config.mongo.password, (err, result) => {
                if (err) {
                    logger.error('[lib] mongo auth error')
                    if (callback) callback(err)
                    return
                }
                if (config.mongo.db) {
                    store.mongodb = mongodb = db.db(config.mongo.db)
                } else {
                    store.mongodb = mongodb = db
                }
                logger.info('[lib] mongo connect $s', result)
                if (callback) callback(null, result)
            })
        }
    })
})

store.init = (callback) => {
    logger.info('[lib] lib init start...')
    let proxy = common.eventProxy()
    proxy.all(['mongo'], (mongo) => {
        logger.info('[lib] lib init success !')
        if (callback) {
            callback(null, mongo);
        }
    })
    proxy.fail((err) => {
        logger.info('[lib] lib init failed')
        if (callback) {
            callback(err)
        }
    })
    store.mongo(proxy.done('mongo'))
}
module.exports = store