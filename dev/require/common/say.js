(function (win, factory) {
    if ('function' === typeof define && define.amd) {
        define(['jQuery'], function ($) {
            return new factory(win, $)
        })
    } else {
        factory(win, $)
    }
}(window, function (win, $) {
    var say = function (value) {
        console.log('say:' + value)
    }
    if ('function' === typeof define && define.amd) {
        return say
    } else if ($ && 'function' === typeof $) {
        $.say = function (v) {
            return new say(v)
        }
    } else {
        win.say = function (v) {
            return new say(v)
        }
    }
}))