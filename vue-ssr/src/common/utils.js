/**
 * 方法集合
 */
const packageObj = require('../../package.json')
export function isPhone(phone) {
	return /^1(3|4|5|7|8|9)\d{9}$/.test(phone)
}


export const isString = value => {
	return Object.prototype.toString.call(value) === '[object String]'
}

const isNumber = value => {
	return Object.prototype.toString.call(value) === '[object Number]'
}
const isObject = value => {
	return Object.prototype.toString.call(value) === '[object Object]'
}

const getVersion = () => {
	return packageObj.version
}


export default getVersion

export {
	isNumber,
	isObject
}
