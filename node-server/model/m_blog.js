const M_base = require('./m_base.js')
const common = require('../lib/common.js')

class M_blog extends M_base{
	constructor(title = '', content = '') {
		super();
		let date = new Date()
		this.id = common.uuid()
		this.create = date
		this.update = date
		this.title = title
		this.content = content
	}
}

module.exports = M_blog