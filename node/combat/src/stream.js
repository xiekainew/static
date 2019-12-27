const fs = require('fs')
const path = require('path')

var stream = fs.createReadStream(path.resolve(__dirname, '../lib/resource.json'), 'utf-8')
stream.on('data', function(chunk) {

	console.log(chunk)
})
stream.on('end', function() {
	console.log('finised')
})

// 只要有新的数据块准备好，就会激发data事件，当所有数据块都加载完之后，会激发一个 end事件。
// 由于数据类型不同，数据块的大小可能会发生变化。有了对读取流的底层访问，程序 就可以边读取边处理，
// 这要比等着所有数据都缓存到内存中再处理效率高得多。