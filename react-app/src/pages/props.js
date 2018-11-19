import React, {Component} from 'react'
import PropTypes from 'react'

class showDefault extends Component {
    constructor (props) {
        super(props)
    }
    static propTypes = {
        ingredients: PropTypes.number,
        steps: PropTypes.number,
        title: (props, propName) =>
            (typeof props[propName] !== 'string') ?
                new Error('A title must be a string') :
                (props[propName].length > 20 ?
                new Error('20长度'):
                null)
    }
    static defaultProps = {
        ingredients: 5,
        steps: 5,
        title: '默认参数'
    }
    render () {
        console.log(this.props)
        const {ingredients, steps, title} = this.props
        return (
            <div className='summary'>
                <h1>{title}</h1>
                <p>
                    <span>{ingredients} 材料</span>
                    <span>{steps}</span>
                </p>
            </div>
        )
    }
}
export default showDefault
