let defined = {}

defined.errcode = {
    SERVER_ERROR: {status: 1, msg: '服务错误'},
    PARAMS_ERROR: {status: 1, msg: '参数错误'}
}

defined.schema = {
	user: 'user',
	book: 'book',
	menu: 'menu'
}


module.exports = defined