let common = require('../lib/common')
let json = JSON.stringify
let parse = JSON.parse

class M_base {
    constructor () {

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
}

module.exports = M_base
