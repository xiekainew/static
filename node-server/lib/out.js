var debug = require('debug')('apiservice');

var out = {};

out.send = function(req, res, resText) {
	return res.send(resText);
}

module.exports = out;
