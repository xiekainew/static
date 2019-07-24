const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const md5 = require('md5')

let common = require('../../lib/common')
let login = {}
let self = login
let store = require('../../store')

let Wx_user = require('../../model/wx_user')

// 错误处理
login.errorHandler = function(req, res, err, next) {
    logger.error('[messsage]', new Error(err.message).stack);
    common.out.send(req, res, errcode.SERVER_ERROR);
    if (next) next();
};

login.handleLogin = (req, res, next) => {
    let nick = req.body.nick || ''
    let pwd = req.body.password || ''

    if (!nick || !pwd) {
        return common.send(req, res, {status: 1, msg: '用户名或密码为空！'})
    }
    let wx = new Wx_user()
    let proxy = common.eventProxy()

    wx.find({name: nick}, proxy.doneLater('checkName'))
    proxy.once('checkName', function(result) {
        if (result) {
            if (md5(pwd) === result.password) {
                delete result.password
                req.body.result = result
                next() // to createToken
                // return common.send(req, res, {status: 0, msg: '登录成功！', data: result})
            } else {
                return common.send(req, res, {status: 1001, msg: '密码不正确！', data: null})
            }
        } else {
            return common.send(req, res, {status: 1002, msg: '用户不存在！', data: null})
        }
    })
}

login.createToken = (req, res, next) => {
    let result = req.body.result
    let cert = fs.readFileSync(path.resolve(__dirname, '../../lib/rsa/jwt.pem'))
    let token = jwt.sign({
        _id: result._id,
        name: result.name
    }, cert, {
        algorithm: 'RS256',
        expiresIn: '1h'
    })
    result.token = token
    req.body.result = result
    next()
    // return common.send(req, res, {status: 0, msg: '登录成功！', data: result})
}

login.register = function (req, res, next) {
    let nick = req.body.nick || null
    let pwd = req.body.password || null
    if (!nick || !pwd) {
        return common.send(req, res, {status: 1, msg: '手机号或密码不能为空！'})
    }
    let wx = new Wx_user()
    wx.set({name: nick, password: md5(pwd)})
    let proxy = common.eventProxy()
    var opts = {find:'findOne', debug:true}

    wx.find({name: nick}, proxy.doneLater('checkName'))
    proxy.once('checkName', function(result) {
        if (result) {
            return common.send(req, res, {status: 1003, msg: '用户已存在！', data: null})
        }
        wx.insert(proxy.doneLater('toRegister'))
    })
    proxy.once('toRegister', function(result) {
        if (!result) {
            return common.send(req, res, {status: 1004, msg: '注册失败', data: null})
        }
        return common.send(req, res, {status: 0, msg: '注册成功', data: result})
    })
}

login.getUserList = function(req, res, next) {
    let u = new Wx_user()
    let proxy = common.eventProxy()

    u.list({}, {}, proxy.doneLater('getList'))
    proxy.once('getList', function(result) {
        return common.send(req, res, {status: 0, msg: '成功！', data: result})
    })
}

login.deleteUser = function(req, res, next) {
    let name = req.body.name || ''
    let u = new Wx_user()
    let proxy = common.eventProxy()

    u.find({name: name}, proxy.doneLater('findName'))
    proxy.once('findName', function(result) {
        if (!result) {
            return common.send(req, res, {status: 1001, msg: '用户不存在！', data: null})
        }
        u.delete({name: name}, proxy.doneLater('del'))
    })
    proxy.once('del', function(result) {
        return common.send(req, res, {status: 0, msg: '成功！', data: null})
    })
}

module.exports = login