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
var Person = (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.print = function () {
        console.log(this.name);
        this.say();
    };
    Person.prototype.say = function () {
        console.log(this.age);
    };
    return Person;
}());
// var p = new Person('小明', 20)
// p.print()
var Student = (function (_super) {
    __extends(Student, _super);
    function Student(name, age, school) {
        var _this = _super.call(this, name, age) || this;
        _this.school = school;
        return _this;
    }
    Student.prototype.tell = function () {
        return this.name + ':' + this.age + ':' + this.school;
    };
    return Student;
}(Person));
var ming = new Student('小明', 20, '清华');
console.log(ming.tell());
