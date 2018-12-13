/**
 * public
 * private
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var People = (function () {
    function People(name, age) {
        this.name = name;
        this.age = age;
    }
    People.prototype.print = function () {
        return this.name + ":" + this.age;
    };
    return People;
}());
var Teacher = (function (_super) {
    __extends(Teacher, _super);
    function Teacher(school) {
        var _this = _super.call(this, '老王', 23) || this;
        _this.school = school;
        return _this;
    }
    Teacher.prototype.print = function () {
        return this.name + ":" + this.age + ":" + this.school;
    };
    return Teacher;
}(People));
var t = new Teacher('极客学院');
// t.name = '老王'
// t.age = 34
// t.school = '北京大学'
console.log(t);
console.log(t.print());
