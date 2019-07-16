let logger = require('./logger')
const uuid = require('uuid')
let config = require('../config')
let EventProxy = require('eventproxy')
let moment = require('moment')
let apiLogger = require('./apilogger')
let defined = require('./defined')
let out = require('./out.js')
let common = {
    schema: defined.schema,
    logger: logger,
    config: config,
    out: out,
    errcode: defined.errcode
}

common.eventProxy = function () {
    return new EventProxy()
}

common.send = function (req, res, resText = {status: 0, msg: 'ok'}, isweb = 0) {
    if (!isweb) resText.__SERVERTIME__ = new Date().getDate()
    let sversion = req.headers.sversion
    let cversion = req.headers.cversion
    let userAgent = req.headers['user-agent']
    let imei = req.headers.imei
    let platform = req.headers.platform
    let opertaion = req.headers.opertaion
    let deviceid = req.headers.deviceid
    let timestamp = req.headers.timestamp
    let network = req.headers.network
    let userid = req.headers.userid
    let channel = req.headers.channel
    let udid = req.headers.udid;
    let body = (req.body ? JSON.stringify(req.body) : '');
    let resp = (resText ? JSON.stringify(resText) : '');
    let time = new Date().getTime() - req.___starttime;

    let logText = '<|>' + common.date(new Date().getTime(), "yyyy-mm-dd'T'HH:MM:ss.L")  +
        '<|>api<|>' + req.path + '<|>' + req.connection.remoteAddress + '<|>' + (req.headers['x-forwarded-for']||'-') + '<|>' + (req.headers['x_real_ip']||'-') + '<|>' +
        "head<|>" + (sversion||'-') + '<|>' + (cversion||'-') + '<|>' + (userAgent||'-') + '<|>' + (imei||'-') +
        '<|>' + (platform||'-') + '<|>' + (opertaion||'-') + '<|>' + (deviceid||'-') + '<|>' + (timestamp||'-') +
        '<|>' + (network||'-') + '<|>' + (userid||'-') + '<|>' + (channel||'-') + '<|>' + (udid||'-') + '<|>' +
        "req<|>" + (body.length||'0') + '<|>reqt<|>' + (body||'-') + '<|>' +
        "resp<|>" + (resp.length||'0') + '<|>respt<|>' + ((resp.length <= 512 ? resp : '-')) + '<|>' +
        "status<|>" + (resText ? resText.status : '-') + '<|>msg<|>' + (resText ? resText.msg : '-')  + '<|>' +
        "time<|>" + (time||'-') + '<|>perf<|>' + (time >= 100 ? '100' : (time >= 50 ? '50' : '0')) + '<|>';
    let result = res.json(resText);
    return result;
}

common.date = function(date, format = 'yyyy-mm-dd HH:MM:ss.L') {
    return moment(date).format(format)
}

common.errorHandler = function(req, res, err, next) {
    logger.error('[messsage]', new Error(err.message).stack);
    common.out.send(req, res, errcode.SERVER_ERROR);
    if (next) next();
};

common.uuid = function() {
    return uuid.v4().replace(/-/g, '')
}

module.exports = common