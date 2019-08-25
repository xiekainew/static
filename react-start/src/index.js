import React from 'react'
import ReactDom from 'react-dom'
import Hello from '@/components/Hello.jsx'
import School from '@/components/School.js'
import Test from  '@/components/test'

const h1 = React.createElement('h1', {
	id: 'myH1',
	title: 'title'
}, '标题一')

// const div = React.createElement('div', null, 'div kong', h1)
const a = 10
let str = '中国'
let title = 'div-title'

const h2 = <h2>h2</h2>
const arr = [
	<div>p1</div>,
	<div>p2</div>
]

const arrStr = ['乔巴', '路飞', '索隆']

const div = <div title={title}>jsx
	<span>{a + 2}</span>
	<p>{str}</p>
	{h1}
	{h2}
	{/*{arr}*/}
	{
		arrStr.map(item => (
				<h4 key={item}>{item}</h4>
			))
	}
</div>

// 创建组件
const dog = {
	name: '小强',
	age: 120
}


const Tpl = <div>
	{/*<Hello {...dog}></Hello>
	<School></School>*/}
	<Test {...dog}></Test>
	{/*<Hello name={dog.name}></Hello>*/}
</div>

ReactDom.render(Tpl, document.getElementById('app'))



















