const common = require('../../lib/common.js')
let M_menu = require('../../model/m_menu.js')
let menu = {}


menu.errorHandler = common.errorHandler

menu.createMenu = function(req, res, next) {
	let title = req.body.title || ''
	let icon = req.body.icon || ''
	let path = req.body.path || ''
	let parent = req.body.parent || ''
	let sort = req.body.sort || ''
	let id = req.body.id || ''

	let menu = new M_menu(title, icon, path, parent, sort, id)
	let checkResult = menu.checknull('title', 'icon')
	if (checkResult) {
		return common.send(req, res, {status: 1001, msg: checkResult})
	}

	if (id) {
		req.body.menu = menu
		next()
		return
	}

	menu.insert(function(err, result) {
		if (err) {
			common.send(req, res, {status: 1001, msg: '失败'})
		} else {
			common.send(req, res, {status: 0, msg: '成功'})
		}
	})
}

menu.updateMenu = function(req, res, next) {
	let menu = req.body.menu
	let proxy = common.eventProxy()
	menu.find({id: menu.id}, proxy.doneLater('findMenu'))
	proxy.once('findMenu', function(result) {
		if (result) {
			menu.updates({update: result.update}, proxy.doneLater('updateMe'))
		} else {
			common.send(req, res, {status: 1001, msg: '更新失败'})
		}
	})
	proxy.once('updateMe', function(result) {
		common.send(req, res, {status: 0, msg: '更新成功'})
	})
}
 
menu.getMenuList = function(req, res, next) {
	let menu = new M_menu()
	let proxy = common.eventProxy()

	menu.list({}, {}, proxy.doneLater('getList'))
	proxy.once('getList', function(list) {
		list = menu.handleList(list)
		return common.send(req, res, {status: 0, msg: '成功！', data: list})
	})
}

menu.deleteMenu = function(req, res, next) {
	let id = req.body.id || ''
	if (!id) {
		return common.send(req, res, {status: 1001, msg: 'id不能为空'})
	}
	let m = new M_menu()
	let proxy = common.eventProxy()
	let query = {id: id}
	m.find(query, proxy.doneLater('findM'))
	proxy.once('findM', function(result) {
		if (result) {
			m.delete(query, proxy.doneLater('deleteM'))
		} else {
			return common.send(req, res, {status: 1001, msg: '该菜单项不存在'})
		}
	})

	proxy.once('deleteM', function(result) {
		common.send(req, res, {status: 0, msg: '成功'})
	})
}

module.exports = menu