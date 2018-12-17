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
        this.props.onRate(num)
    }
    render () {
        const {starsSelected} = this.props
        return (
            <div className='star-rating'>
                <div style={{overflow: 'hidden'}}>
                    {[...Array(this.state.totalStars)].map((n, i) =>
                        <Star key={i}
                              color={this.props.color}
                              selected={i < starsSelected}
                              onClick={() => this.change(i + 1)}
                        />
                    )}
                </div>
                <p>{starsSelected} of {this.state.totalStars} stars</p>
            </div>
        )
    }
}
export default StarRating
