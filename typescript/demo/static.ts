
class Person {
    name: string
    tell () {
        console.log(this.name)
    }
}
var p = new Person()
p.name = 'sdf'
p.tell()