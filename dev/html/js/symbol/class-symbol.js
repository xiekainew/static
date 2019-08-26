var Animal = (function() {
	var AGE_SY = Symbol()
	var GET_NAME = Symbol()
	class Animal {
		constructor(name, age) {
			this.name = name
			this[AGE_SY] = age
		}
		[GET_NAME]() {
			console.log(this.name)
		}
	}
	return Animal
})()