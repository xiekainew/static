var http = require('http')
var path = require('path')
var fs = require('fs')

http.createServer(function(req, res) {
	fs.createReadStream(path.resolve(__dirname, '../static/hua.JPG')).pipe(res)
}).listen(4000)

// 在这行代码中，数据从文件中读进来(fs.createReadStream)，然后数据随着进来就被 送到(.pipe)客户端(res)。在数据流动时，事件轮询还能处理其他事件。