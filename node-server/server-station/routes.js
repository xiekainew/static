let express = require('express')
let router = express.Router()
let common = require('../lib/common')
let fs = require('fs')
const path = require('path')

let Station = require('./controller/station')

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
      // this.setHeader('Access-Control-Allow-Origin', '*')
      // this.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Custom-Header, token');
      // this.setHeader("Access-Control-Allow-Credentials", "true");
      // this.setHeader("Access-Control-Expose-Headers", "Content-Length, X-Custom-Header");
    }
    prevWriteHead.apply(this, arguments);
  }

  next()
})
function errorHandler(req, res, next) {
  common.send(req, res, common.errcode.SERVER_ERROR.PARAMS_ERROR);
}

router.get('/station/list', Station.List, errorHandler)



module.exports = router
