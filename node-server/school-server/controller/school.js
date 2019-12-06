let common = require('../../lib/common')
let school = {}
// let query = require('que')

school.indexInfoList = (req, res, next) => {
    let homeList = require('../data/indexInfoList')
    common.send(req, res, {status: 0, success: true, data: {infoList: homeList} || []})
}

school.infoList = (req, res, next) => {
    let homeList = require('../data/infoList')
    common.send(req, res, {status: 0, success: true, data: {infoList: homeList} || []})
}

school.info = (req, res, next) => {
    let homeList = require('../data/info')
    common.send(req, res, {status: 0, success: true, data: {info: homeList} || []})
}

school.rollings = (req, res, next) => {
    let homeList = require('../data/rollings')
    common.send(req, res, {status: 0, success: true, data: {rollings: homeList} || []})
}


school.rollingPreview = (req, res, next) => {
    let homeList = require('../data/rollingPreview')
    common.send(req, res, {status: 0, success: true, data: {infoList: homeList} || []})
}

school.indexTeachers = (req, res, next) => {
    let homeList = require('../data/indexTeachers')
    common.send(req, res, {status: 0, success: true, data: {infoList: homeList} || []})
}

school.teachers = (req, res, next) => {
    let homeList = require('../data/teachers')
    common.send(req, res, {status: 0, success: true, data: {teachers: homeList} || []})
}

school.teacherDetail = (req, res, next) => {
    let homeList = require('../data/teacherDetail')
    common.send(req, res, {status: 0, success: true, data: {teacher: homeList} || []})
}
school.students = (req, res, next) => {
    let homeList = require('../data/students')
    common.send(req, res, {status: 0, success: true, data: {students: homeList} || []})
}

school.studentsInfo = (req, res, next) => {
    let homeList = require('../data/studentsInfo')
    common.send(req, res, {status: 0, success: true, data: {student: homeList} || []})
}


module.exports = school