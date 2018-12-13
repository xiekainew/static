var Person = (function () {
    function Person() {
    }
    Person.prototype.tell = function () {
        console.log(Person.name);
    };
    return Person;
}());
var p = new Person();
Person.name = 'sdf';
p.tell();
