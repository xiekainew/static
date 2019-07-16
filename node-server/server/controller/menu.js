const common = require('../../lib/common.js')
let M_menu = require('../../model/m_menu.js')
let menu = {}


menu.errorHandler = common.errorHandler

menu.createMenu = function(req, res, next) {
	let title = req.body.title || ''
	let icon = req.body.icon || ''
	let path = req.body.path || ''
	let parent = req.body.parent || ''
	let children = req.body.children || []

	let menu = new M_menu(title, icon, path, parent, children)
	let checkResult = menu.checknull('title', 'icon')
	if (checkResult) {
		return common.send(req, res, {status: 1001, msg: checkResult})
	}
	menu.insert(function(err, result) {
		if (err) {
			common.send(req, res, {status: 1001, msg: '失败'})
		} else {
			common.send(req, res, {status: 0, msg: '成功'})
		}
	})
}

 
menu.getMenuList = function(req, res, next) {
	let menu = new M_menu()
	let proxy = common.eventProxy()

	menu.list({}, {}, proxy.doneLater('getList'))
	proxy.once('getList', function(list) {
		list = menu.handleList(list)
		console.log(list)
		return common.send(req, res, {status: 0, msg: '成功！', data: list})
	})
}

module.exports = menu