let M_base = require('./m_base')

class M_person extends M_base {
    constructor() {
        super()
    }
    static test() {
        console.log('人的私有方法')
    }
}

module.exports = M_person