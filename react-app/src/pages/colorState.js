import React, {Component} from 'react'
import AddColor from './addColor'
import StarRating from "./starRating";

const Color = ({title, color, rating = 0, onRate = f => f}) =>
    <section className='color'>
        <h1>{title}</h1>
        <div className='color' style={{backgroundColor: color, width: '200px', height: '100px'}}></div>
        <div>
            <StarRating onRate={onRate} starsSelected={rating} color={color}/>
        </div>
    </section>

const ColorList = ({colors = [], onRate = f => f}) =>
    <div className='color-list'>
        {(colors.length === 0) ?
            <p>No Color Listed, Add a Color</p> :
            colors.map(color =>
                <Color onRate={(rating) => onRate(color.id, rating)} key={color.id} {...color}/>
            )
        }
    </div>

class ColorState extends Component {
    constructor (props) {
        super(props)
        this.state = {
            colors: [{
                id: '1232312',
                title: 'ocean at dusk',
                color: '#00c4e2',
                rating: 5
            }, {
                id: '342323',
                title: 'lawn',
                color: '#26ac56',
                rating: 3
            }, {
                id: '1232434132312',
                title: 'bright red',
                color: '#ff0000',
                rating: 1
            }]
        }
    }
    rateColor (id, rating) {
        const colors = this.state.colors.map(color =>
            (color.id !== id) ? color :
                {
                    ...color,
                    rating
                }
        )
        this.setState({colors})
    }
    addColor (title = '新添加颜色', color) {
        if (!color) return
        const colors = [
            ...this.state.colors,
            {
                id: Math.random(),
                title: title,
                color: color,
                rating: 0
            }
        ]
        this.setState({colors})
    }
    render () {
        return (
            <div className='app'>
                <AddColor addColor={this.addColor.bind(this)}/>
                <ColorList onRate={this.rateColor.bind(this)} colors={this.state.colors}/>
            </div>
        )
    }
}

export default ColorState