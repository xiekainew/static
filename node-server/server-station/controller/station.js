let common = require('../../lib/common')
let station = {}

station.List = (req, res, next) => {
    let list = require('../data/list')
    common.send(req, res, {status: 0, success: true, data: list})
}


module.exports = station