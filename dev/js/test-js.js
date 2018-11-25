(function () {
    console.log('123fds2')
    var trim = function (str) {
        if (str && typeof str === 'string') {
            // return str.replace(/(^ *)|( *$)/g, '')
            return str.replace(/(^\s*)|(\s*$)/g, '')
        }
    }
    var a = '   sdffds    23 s dfsdf   '
    console.log(a)
    console.log(trim(a))
})()
