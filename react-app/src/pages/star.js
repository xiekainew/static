import React, {Component} from 'react'
import '../style/test.css'
class Star extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        const {selected, onClick} = this.props
        return (
            <div className={selected ? 'star selected' : 'star'}
                onClick={onClick}
            ></div>
        )
    }
}
export default Star
