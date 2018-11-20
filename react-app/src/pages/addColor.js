import React, {Component} from 'react'

class AddColor extends Component {
    constructor (props) {
        super(props)
    }
    submit (e) {
        const {_title, _color} = this.refs
        e.preventDefault()
        console.log(_title.value)
        console.log(_color.value)
        console.log(`new Color${_title.value} ${_color.value}`)
        _color.value = _title.value
        _title.value = ''
        _title.focus()
    }
    render () {
        return (
            <form onSubmit={this.submit.bind(this)}>
                <input type='text'
                       placeholder='color title...'
                       ref='_title'/>
                <input type='color'
                       ref='_color'
                       required/>
                <button>Add</button>
            </form>
        )
    }
}
export default AddColor
