let M_person = require('./m_person')

class Mx_user extends M_person{
    constructor() {
        super()
        this.type = 'wx'
    }
    wx_getType() {
        return this.type
    }
}

module.exports = Mx_user