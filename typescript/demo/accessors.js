var Hello = (function () {
    function Hello() {
    }
    Object.defineProperty(Hello.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (newname) {
            if (newname.length > 3) {
                alert('长度不符');
                return;
            }
            this._name = newname;
        },
        enumerable: true,
        configurable: true
    });
    Hello.prototype.tell = function () {
        return this.name;
    };
    return Hello;
}());
var h = new Hello();
h.name = 'iwen';
console.log(h.tell());
