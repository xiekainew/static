const common = require('../../lib/common.js')
const qiniu = require('qiniu')
let niu = {}

niu.errorHandler = common.errorHandler

niu.createToken = function(req, res, next) {
	let result = req.body.result
	var accessKey = common.config.qiniuAccessKey
	var secretKey = common.config.qiniuSecretKey
	var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

	var options = {
		scope: 'images',
		expires: 3700
	}

	var putPolicy = new qiniu.rs.PutPolicy(options)
	var uploadToken=putPolicy.uploadToken(mac)
	result.qiniu = uploadToken
	return common.send(req, res, {status: 0, msg: '登录成功！', data: result})
}

module.exports = niu