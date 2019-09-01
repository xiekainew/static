import React from 'react'

class Numbers extends React.Component {
	constructor() {
		super()
		this.state = {
			title: 'number'
		}
	}
	shouldComponentUpdate(props,state) {
		return true
	}
	// UNSAFE_componentWillReceiveProps() {
	// 	console.log('number componentWillReceiveProops')
	// }
	static getDerivedStateFromProps() {
		console.log('number static componentWillReceiveProops')
		return null 
	}
	render() {
		console.log('Numbers render')
		const { number } = this.props
		return (
			<div>
				<h1>{number}</h1>
			</div>
		)
	}
}

export default Numbers