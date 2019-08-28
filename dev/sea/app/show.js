define(function (require, exports, module) {
    var getById = function (id) {
        console.log(id)
        return document.getElementById(id)
    }
    exports.get = getById
})