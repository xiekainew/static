var MyPlugin = {}
MyPlugin.install = function (Vue, options) {
    Vue.prototype.con = function (msg) {
        // console.log(msg)
    }
    Vue.mixin({
        created() {
            // console.log('created')
        }
    })
}
