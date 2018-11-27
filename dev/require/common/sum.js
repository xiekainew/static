var sum = function () {
    var num = 0;
    ([]).slice.call(arguments, function (item) {
        num += item
    })
    return num
}

module.exports = sum