var test = (function () {
    function test() {
    }
    test.prototype.say = function () {
        console.log('hello world');
    };
    return test;
}());
