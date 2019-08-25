import React from 'react'
// import './test-extends.js'
import '@/style/index.scss'
import bootcss from 'bootstrap/dist/css/bootstrap.css'
console.log(bootcss)

function Person(name, age) {
	this.name = name
	this.age = age || 22
}
Person.getAge = function() {
	console.log('这是静态方法')
	console.log(this.age)
}

Person.prototype.say = function() {
	console.log('这是Person的实例方法')
}

var wang =  new Person('小明', 23)
// console.log(wang)
// wang.say()
// Person.getAge()

class Animal {
	constructor(name, age) {
		this.name = name
		this.age = age
	}
	static info = 12 // 静态属性, 只能让构造函数访问

	static run() {
		console.log('动物的静态方法')
	}

	speek() {
		console.log('动物的实例方法')
	}
}

var dog = new Animal('大黄', 23)
// dog.speek()
// console.log(Animal.info)
// console.log(dog.info)
// 

class Test extends React.Component{
	constructor() {
		super()
		this.state = {
			name: 'test'
		}
	}
	clickTest() {
		console.log(this)
		console.log(this.state.name)
	}
	render() {
		console.log(this.props)
		console.log(this.state.name)
		return (
			<div className="title">
				<button className="btn btn-primary" onClick={this.clickTest.bind(this)}>test</button>
				<button className="btn btn-primary" onClick={()=>{this.clickTest()}}>test2</button>
				<p className='title'>哈哈哈哈
					<span className='title-span'>我是海贼王</span>
				</p>
			</div>
		)
	}
}

export default Test




















