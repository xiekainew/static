const common = require('../../lib/common.js')
let M_blog = require('../../model/m_blog.js')
let blog = {}


blog.errorHandler = common.errorHandler

blog.create = function(req, res, next) {
	let title = req.body.title || ''
	let content = req.body.content || ''

	let b = new M_blog(title, content)
	let proxy = common.eventProxy()

	b.insert(proxy.doneLater('create'))
	proxy.once('create', function(result) {
		return common.send(req, res, {status: 0, msg: '成功'})
	})
}

blog.list = function(req, res, next) {
	let b = new M_blog()
	let proxy = common.eventProxy()

	b.list({}, {}, proxy.doneLater('getList'))
	proxy.once('getList', function(result) {
		return common.send(req, res, {status: 0, msg: '成功', data: result})
	})
}

blog.del = function(req, res, next) {
	let id =req.body.id || ''
	if (!id) return common.send(req, res, {status: 1001, msg: 'id不能为空'})

	let b = new M_blog()
	let proxy = common.eventProxy()
	b.delete({id}, proxy.doneLater('del'))
	proxy.once('del', function(result) {
		return common.send(req, res, {status: 0, msg: '删除成功！'})
	})
}

module.exports = blog