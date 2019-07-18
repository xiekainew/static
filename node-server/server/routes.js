let express = require('express')
let router = express.Router()
let common = require('../lib/common')
let fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const whiteList = require('../lib/whiteList.js')
let Login = require('./controller/login')
let React = require('./controller/react')
let Posts = require('./controller/posts')
let Menu = require('./controller/menu.js')

/**
 * 校验白名单
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function checkUrl(url) {
  return whiteList.some(item => {
    return url.indexOf(item) !== -1
  })
}
/**
 * 校验token
 */
function checkToken(req, res, next) {
  let token = req.headers.token
  let cert = fs.readFileSync(path.resolve(__dirname, '../lib/rsa/jwt_pub.pem'))
  try {
    const decoded = jwt.verify(token, cert);
    next()
  } catch (e) {
    common.send(req, res, {status: 1002, msg: '请登录'});
  }
}

router.use(function timeLog(req, res, next) {
  req.__starttime = new Date().getTime()
  let start = process.hrtime()
  let prevWriteHead = res.writeHead
  res.writeHead = function () {
    if (!this.getHeader('X-Response-Time')) {
      let diff = process.hrtime(start)
      let time = diff[0] * 1e3 + diff[1] * 1e-6
      let usetime = time.toFixed(3) + 'ms'
      this.setHeader('X-Response-Time', usetime)
      this.setHeader('Access-Control-Allow-Origin', '*')
      // this.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Custom-Header');
      this.setHeader("Access-Control-Allow-Credentials", "true");
      // this.setHeader("Access-Control-Expose-Headers", "Content-Length, X-Custom-Header");
    }
    prevWriteHead.apply(this, arguments);
  }
  if (checkUrl(req.originalUrl)) {
    next()
  } else {
    checkToken(req, res, next)
  }
})
function errorHandler(req, res, next) {
  common.send(req, res, common.errcode.SERVER_ERROR.PARAMS_ERROR);
}
// router.get('*', function (req, res) {
//     console.log(__dirname)
//     // res.send(fs.readFileSync('./public2/saas/array.html'), 'utf-8')
//     res.sendFile(__dirname + '/' + '/public2/saas', 'utf-8')
// })
router.post('/server/login', Login.handleLogin, Login.createToken, errorHandler)
router.post('/server/register', Login.register, errorHandler)
router.get('/server/user/list', Login.getUserList, errorHandler)

router.get('/get/user', function (req, res) {
  console.log(req.query.name)
  common.send(req, res, '我的信息')
})
router.get('/home/list', React.homeList, errorHandler)
router.get('/product/detail', React.productDetail, errorHandler)

router.post('/posts', Posts.sendPosts, errorHandler)

router.post('/menu/create', Menu.createMenu, Menu.updateMenu, errorHandler)
router.post('/menu/delete', Menu.deleteMenu, errorHandler)
router.get('/menu/list', Menu.getMenuList, errorHandler)

module.exports = router
