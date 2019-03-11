let common = require('../../lib/common')
let login = {}
let self = login
let store = require('../../store')
let md5 = require('md5')

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
    console.log(store)
    var opts = {find:'findOne', debug:true}
    store.find('user', {phone: '15567656788'}, opts, function(err, result){
        console.log(111, result)
        // if (err) {
        //     callback(err);
        //     return;
        // }
        // if (!result) {
        //     callback(null, null);
        //     return;
        // }
        // callback(null, result);
    });
    return common.send(req, res, {status: 0, msg: '登录成功！', data: wx.get()})
}

login.register = function (req, res, next) {
    let nick = req.body.nick || ''
    let phone = req.body.phone || 13333333333
    let pwd = req.body.password || 123456
    if (!phone || !pwd) {
        return common.send(req, res, {status: 1, msg: '手机号或密码不能为空！'})
    }
    let wx = new Wx_user()
    wx.set({name: nick, phone: phone, password: md5(pwd)})
    let proxy = common.eventProxy()
    var opts = {find:'findOne', debug:true}

    // proxy.once('register', function () {
    //     console.log(1)
    //
    // })
    var opts = {insert:'insertOne', debug:true};
    store.insert('user', wx, opts, function(err, result){
        console.log(12)
        if (err) {
            common.send(req, res, {status: 0, msg: '注册失败！', data: wx.get()})
            return;
        }
        common.send(req, res, {status: 0, msg: '注册成功！', data: wx.get()})
    });
    // store.find('user', {phone: phone}, opts, function (err, result){
    //     console.log(err, result)
    //     if (!result) {
    //         console.log(0)
    //         proxy.doneLater('register')
    //     }
    // })
    // return common.send(req, res, {status: 0, msg: '注册成功！', data: wx.get()})
}

module.exports = login