
function add(x:number, y:number):number{
    return x + y
}

console.log(add(1, 3))

var myAdd = function (x: number, y: string):string {
    return 'hee'
}

// var myAddTs:(name: string, age:number) => number = function (a: string, n: number): string {
//     return a + n + ''
// }

// console.log(myAddTs('wang', 12))

function buildName (fistName: string, lastName?: string) { // ? 该参数可有可没有
    return fistName + ' ' + lastName
}
var result1 = buildName('name', 'xiekai')
console.log(result1)
var re2 = buildName('fd')
console.log(re2)

function defaultName (firstName: string, lastName='wang') {
    return firstName + lastName
}
console.log(defaultName('eang', 'eeee'))

function peopleName (fName: string, ...restName: string[]) {
    return fName + restName.join(',')
}
console.log(peopleName('wang', 'r', 't', 't'))

// 关键字 箭头函数

var people = {
    name: ['wang', 'li', 'yang', 'xie'],
    getName: function () {
        return () => {
        // return function () {
            var i = Math.floor(Math.random() * 4)
            return {
                n: this.name[i]
            }
        }
    }
}
var myName = people.getName()
console.log(myName().n)

// 函数重载

function attr (name: string): string
function attr (age: number): number

function attr (nameage: any): any {
    if (nameage && typeof nameage === 'string') {
        console.log('姓名')
    } else {
        console.log('年龄')
    }
}

attr('sdfh')
attr(23)