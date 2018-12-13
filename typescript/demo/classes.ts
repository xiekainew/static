class Person{
    name: string
    age:number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    print () {
        console.log(this.name)
        this.say()
    }
    say () {
        console.log(this.age)
    }
}
// var p = new Person('小明', 20)
// p.print()

class Student extends Person {
    school: string
    constructor (name: string, age: number, school: string) {
        super(name, age)
        this.school = school
    }
    tell () {
        return this.name + ':' + this.age + ':' + this.school
    }
}

var ming = new Student('小明', 20, '清华')
console.log(ming.tell())