require.config({
    baseUrl: 'js',
    paths: {
        pb: '../lib',
        // com: '../common',
        jquery: '../../js/lib/jquery-3.3.1'
    },
    shim: {
        world: {
            deps: ['animalWorld']
            // exports: 's'
        }
    }
})

// require(['jquery'], function ($) {
require(['cat', 'dog', 'world', 'config'], function (cat, dog, worlds, config) {
    // say('😆')
    // console.log(sums(1,2,3))
    // console.log(s)
    // console.log(config)
    // console.log(cat)
    // console.log(dog)
    // console.log(worlds)
    // alert('haha')
    worlds.worlds()
    cat.say()
    dog.say()
    // console.log($)
})