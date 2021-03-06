const defaultState = {
	inputValue: '',
	list: ['1', '2', '3']
}
export default (state = defaultState, action) => {
	if (action.type === 'change_input_value') {
		const newState = JSON.parse(JSON.stringify(state))
		newState.inputValue = action.value
		return newState
	}
	if (action.type === 'add_todo_item') {
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.push(newState.inputValue)
		newState.inputValue = ''
		return newState
	}
	if (action.type === 'delete') {
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.splice(action.value, 1)

		return newState
	}
	console.log(state, action)
	return state
}