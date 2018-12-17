import React, {Component} from 'react'
import '../../style/test.css'
class Star extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        const {selected, onClick, color} = this.props
        return (
            <div
                className='star'
                style={{backgroundColor: selected ? color : 'grey'}}
                onClick={onClick}
            ></div>
        )
    }
}
export default Star
