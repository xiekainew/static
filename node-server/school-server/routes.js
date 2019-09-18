let express = require('express')
let router = express.Router()
let common = require('../lib/common')
let fs = require('fs')
const path = require('path')

let School = require('./controller/school')

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
      this.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Custom-Header, token');
      this.setHeader("Access-Control-Allow-Credentials", "true");
      // this.setHeader("Access-Control-Expose-Headers", "Content-Length, X-Custom-Header");
    }
    prevWriteHead.apply(this, arguments);
  }

  next()
})
function errorHandler(req, res, next) {
  common.send(req, res, common.errcode.SERVER_ERROR.PARAMS_ERROR);
}

router.get('/school/api/indexInfoList', School.indexInfoList, errorHandler)
router.get('/school/api/infoList', School.infoList, errorHandler)
router.get('/school/api/info', School.info, errorHandler)
router.get('/school/api/rollings', School.rollings, errorHandler)
router.get('/school/api/rollingPreview', School.rollingPreview, errorHandler)
router.get('/school/api/indexTeachers', School.indexTeachers, errorHandler)
router.get('/school/api/teachers', School.teachers, errorHandler)
router.get('/school/api/teacherDetail', School.teacherDetail, errorHandler)
router.get('/school/api/students', School.students, errorHandler)
router.get('/school/api/studentsInfo', School.studentsInfo, errorHandler)



module.exports = router
