let common = require('../../lib/common')
let react = {}
// let query = require('que')

react.homeList = (req, res, next) => {
    let homeList = require('../data/homeList')
    console.log(homeList)
    common.send(req, res, {status: 0, success: true, data: homeList || []})
}

react.productDetail = (req, res, next) => {
    console.log(req.query.productId)
    let id = req.query.productId
    let detailData = require('../data/detail.json')
    common.send(req, res, {status: 0, success: true, data: detailData[id]})
}


module.exports = react