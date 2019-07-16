let common = require('../lib/common')
let json = JSON.stringify
let parse = JSON.parse
let store = require('../store.js')

class M_base {
    constructor () {
    }
    table() {
        let tableName = this.constructor.name.split('_')[1]
        console.log(tableName)
        switch(tableName) {
            case 'l': tableName = 'user'; break;
            case 'person': tableName = 'user'; break;
        }
        return tableName
    }
    set (model) {
        for (let key in model) {
            this[key] = model[key]
        }
        return this
    }
    get (callback) {
        return this
    }
    add (key, val) {
        this[key] = val
        return this
    }
    remove (key) {
        delete this[key]
        return this
    }
    list(query, opts, callback) {
        store.find(this.table(), query, opts, function(err, result) {
            if (err) {
                return callback(err)
            }
            callback(null, result)
        })
    }
    find (query, callback) {
        let opts = {find: 'findOne', debug: true}
        store.find(this.table(), query, opts, function(err, result) {
            if (err) {
                callback(err)
                return
            }
            if (!result) {
                callback(null, null)
                return
            }
            callback(null, result)
        })
    }
    insert (callback) {
        let opts = {insert: 'insertOne', debug: true}

        store.insert(this.table(), this, opts, function (err, result) {
            if (err) {
                callback(err)
                return
            }
            callback(null, result)
        })
    }
}

module.exports = M_base
