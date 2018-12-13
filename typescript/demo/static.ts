
class Person {
    static name: string
    tell () {
        console.log(Person.name)
    }
}
var p = new Person()
Person.name = 'sdf'
p.tell()