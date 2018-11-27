define(['pb/animal', 'jquery'], function (animal, $) {
    'use strict'
    var dog = $('<div>小狗汪汪叫</div>')
    document.body.appendChild(dog[0])
    return {
        say: function () {
            animal.say('旺旺')
            animal.showName('狗')
        }
    }
})