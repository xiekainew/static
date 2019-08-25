class Person {
	constructor(name, age) {
		this.name = name
		this.age = age
	}
	sayHello() {
		console.log('hello')
	}
}

class American extends Person {
	// constructor() {
		
	// }
}

class Chinese extends Person {
	constructor(name, age, red) {
		super(name, age)
		this.red = red
	}
}

var c = new Chinese('小明', 12, '黄')
c.sayHello()
console.log(c)