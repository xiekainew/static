
var s1 = Symbol()
var s2 = Symbol()

console.log(s1) // Symbol()
console.log(s2) // Symbol()
console.log(s2 === s1) // false

console.log(typeof s1) // symbol
console.log(Object.prototype.toString.call(s1)) // [object Symbol]

var obj = {
	s1: 1,
	[s2]: 2,
	s3: 4
}
console.log(obj.s1)
console.log(obj[s2])
console.log(obj['s3'])

console.log(Object.keys(obj))

for(var k in obj) {
	console.log(k)
}
console.log(Object.getOwnPropertyNames(obj))
console.log(JSON.stringify(obj))

console.log(Object.getOwnPropertySymbols(obj))
var k = Object.getOwnPropertySymbols(obj)[0]
console.log(obj[k])

var dog = new Animal('旺财', 12)
console.log(dog)
console.log(dog[Object.getOwnPropertySymbols(dog)[0]]) // 用symbol实现构造函数的私有属性或方法也只是一直hack，并不能真正私有化
console.log(dog['GET_NAME'])

