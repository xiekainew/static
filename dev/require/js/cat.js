define(['pb/animal'], function (animal) {
    'use strict'
    return {
        name: '花猫',
        say: function () {
            // console.log(this)
            animal.say(this.name)
            animal.showName('猫')
        }
    }
})