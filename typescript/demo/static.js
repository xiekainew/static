var Person = (function () {
    function Person() {
    }
    Person.prototype.tell = function () {
        console.log(this.name);
    };
    return Person;
}());
var p = new Person();
p.name = 'sdf';
p.tell();
