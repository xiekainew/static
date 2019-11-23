import React from 'react'

import store from '../../store/index.js'
import {
	addTodoItem
} from '../../store/actionCreators.js'
import List from './List.js'


class Index extends React.Component{
	constructor(props) {
		super(props)
		this.state = store.getState()
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleStoreChange = this.handleStoreChange.bind(this)
		this.handleBtnClick = this.handleBtnClick.bind(this)

		store.subscribe(this.handleStoreChange)
	}
	handleInputChange(e) {
		const action = {
			type: 'change_input_value',
			value: e.target.value
		}
		store.dispatch(action)
	}
	handleStoreChange() {
		this.setState(store.getState(), () => {
			console.log(this.state.inputValue)
		})
	}
	handleBtnClick() {
		const action = addTodoItem()
		store.dispatch(action)
	}
	handleDelete(index) {
		const action = {
			type: 'delete',
			value: index
		}
		store.dispatch(action)
	}
	render() {
		return (
			<List
				{...this.state}
				handleInputChange={this.handleInputChange}
				handleBtnClick={this.handleBtnClick}
				handleDelete={this.handleDelete}
			/>
		)
	} 
}

export default Index