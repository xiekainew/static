let M_person = require('./m_person')
const common = require('../lib/common.js')

class Mx_user extends M_person{
    constructor() {
        super()
        this.id = common.uuid()
        this.type = 'wx'
        this.avatar = ''
    }
    wx_getType() {
        return this.type
    }
}

module.exports = Mx_user