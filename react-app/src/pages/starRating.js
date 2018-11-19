import React, {Component} from 'react'
import {createClass, PropTypes} from 'react'
import Star from './star'

class StarRating extends Component{
    constructor (props) {
        super(props)
        this.state = {
            totalStars: 5
        }
    }
    change (num) {
        this.setState({starsSelected: num})
    }
    render () {
        const {totalStars} = this.props
        const {starsSelected} = this.state
        return (
            <div className='star-rating'>
                {[...Array(totalStars)].map((n, i) =>
                    <Star key={i}
                          selected={i < starsSelected}
                          onClick={() => this.change(i + 1)}
                    />
                )}
            </div>
        )
    }
}
export default StarRating
