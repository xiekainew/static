import React from 'react'
import PropTypes from 'prop-types'

class TodoItem extends React.Component{
	constructor(props) {
		super(props)
		this.deleteThis = this.deleteThis.bind(this)
	}
	deleteThis() {
		const { deleteItem, index } = this.props
		deleteItem(index)
	}
	getVersion() {
		console.log(1212)
	}
	render() {
		const { item, test } = this.props
		return (
			<li onClick={this.deleteThis}>
				{test} - {item}
			</li>
		)
	}
}

TodoItem.propTypes = {
	test: PropTypes.string.isRequired,
	item: PropTypes.string,
	deleteItem: PropTypes.func,
	index: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

TodoItem.defaultProps = {
	test: 'hello world'
}

export default TodoItem