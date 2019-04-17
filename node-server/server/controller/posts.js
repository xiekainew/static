let common = require('../../lib/common')
let posts = {}
let self = posts


posts.sendPosts = (req, res, next) => {
  return common.send(req, res, {status: 0, msg: '登录成功！', data: require('../data/posts')})
}

module.exports = posts