import React from 'react'
import TodoItem from './TodoItem.js'
import Numbers from './Number.js'

class TodList extends React.Component{
	constructor() {
		super()
		this.state = {
			inputValue: 'hello',
			list: ['asdf'],
			number: 0
		}
		this.handleChange = this.handleChange.bind(this)
		this.deleteThis = this.deleteThis.bind(this)
		this.changeNumber = this.changeNumber.bind(this)
	}
	getValue() {
		this.setState((prevState) => ({
			list: [...prevState.list, prevState.inputValue],
			inputValue: ''
		}), () => {
			console.log(this.ul.querySelectorAll('li').length)
		})
	}
	handleChange(e) {
		// 异步更新数据
		const value = this.input.value
		// const value = e.target.value
		this.setState(() => ({
			inputValue: value 
		}))
	}
	deleteThis(index) {
		this.setState((prevState) => {
			const list = [...prevState.list]
			list.splice(index, 1)
			return {
				list
			}
		})
	}
	getTodoItem() {
		return this.state.list.map((item, index) => (
			<TodoItem 
				ref="todoItem"
				key={item + index} 
				item={item} 
				index={index}
				deleteItem={this.deleteThis}
			></TodoItem>
		))
	}
	changeNumber() {
		this.setState((prevState) => ({
			number: ++prevState.number
		}))
		console.log(this.state.number)
	}

	UNSAFE_componentWillMount() {
		console.log('componentWillMount')
	}
	componentDidMount() {
		console.log('componentDidMount')
	}
	shouldComponentUpdate() {
		return true
	}

	UNSAFE_componentWillUpdate() {
		console.log('componentWillUpdate')
	}


	componentDidUpdate() {
		console.log('componentDidUpdate')
	}



	render() {
		console.log('render')
		let { inputValue, number } = this.state
		return(
			<div>
				<div className="">
					<label htmlFor="input">输入</label>
					<input 
						id="input"
						ref={(input) => this.input = input} 
						value={inputValue}
						onChange={this.handleChange}
					/>
					<button onClick={() => this.getValue()}>提交</button>
				</div>
				<ul ref={ul => this.ul = ul}>
					{ this.getTodoItem() }
				</ul>
				<hr/>
				<button onClick={this.changeNumber}>点击</button>
				<Numbers number={number}></Numbers>
			</div>
		)
	}
}

export default TodList