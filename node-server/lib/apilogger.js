var logger = require('winston');
var moment = require('moment');
var apiLogger = new (logger.Logger)({
    transports: [
        new (require('winston-daily-rotate-file'))({
            filename: 'server.log', level: 'info',
            json: false,
            timestamp: function () {
                return moment().format("YYYY-MM-DD HH:mm")
            }
        })
    ]
});

module.exports = apiLogger;
