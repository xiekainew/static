define([], function () {
    'use strict'
    function _showName (name) {
        console.log(name)
    }
    return {
        say: function (words) {
            console.log(words)
        },
        showName: function (name) {
            _showName(name)
        }
    }
})