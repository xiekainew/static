/**
 * public
 * private
 */

class People {
    name: string
    age: number
    constructor (name: string, age: number) {
        this.name = name
        this.age = age
    }
    print () {
        return `${this.name}:${this.age}`
    }
}

class Teacher extends People {
    school: string
    constructor (school: string) {
        super('老王', 23)
        this.school = school
    }
    print () {
        return `${this.name}:${this.age}:${this.school}`
    }
}

var t = new Teacher('极客学院')
// t.name = '老王'
// t.age = 34
// t.school = '北京大学'
console.log(t)
console.log(t.print())