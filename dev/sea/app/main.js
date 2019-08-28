define(function (require, exports, module) {
    var get = require('./show')
    console.log(get)
    var show = function () {
        console.log(get.get('app'))
        // get.get('app').innerHTML('hello')
    }
    console.log(show)
    exports.show = show
})