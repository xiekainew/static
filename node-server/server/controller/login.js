let common = require('../../lib/common')
let login = {}
let self = login

let Wx_user = require('../../model/wx_user')


login.handleLogin = (req, res, next) => {
    // console.log(req)
    // console.log(req.body)
    let nick = req.body.nick || ''
    let pwd = req.body.password || ''
    if (!nick || !pwd) {
        return common.send(req, res, {status: 1, msg: '用户名或密码为空！'})
    }
    let wx = new Wx_user()
    console.log(wx.set({name: '大王'}))
    console.log(wx.wx_getType())
    return common.send(req, res, {status: 0, msg: '登录成功！', data: wx.get()})
}


module.exports = login