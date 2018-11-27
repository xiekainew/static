require.config({
    baseUrl: 'js',
    paths: {
        pb: '../lib',
        jquery: '../../js/lib/jquery-3.3.1'
    },
    shim: {
        world: {
            deps: ['animalWorld'],
            exports: 's'
        }
    }
})
require(['cat', 'dog', 'world', 'config'], function (cat, dog, worlds, config) {
    console.log(config)
    console.log(cat)
    console.log(dog)
    console.log(worlds)
    alert('haha')
    worlds.worlds()
    cat.say()
    dog.say()
})