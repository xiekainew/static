function getName() {
	return 'xiaowang'
}
function getAge() {
	return 23
}
exports.getAge = getAge
exports.getName = getName

module.exports.getName = {}
console.log(module)
console.log(exports)
console.log(module.exports)
// module.exports = getName