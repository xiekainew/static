import React, {Fragment} from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import axios from 'axios'
import './index.css'


class Index extends React.Component{
	constructor() {
		super()
		this.state = {
			show: true,
			list: []
		}
		this.handleToggle = this.handleToggle.bind(this)
		this.handleAddList = this.handleAddList.bind(this)
	}
	handleToggle() {
		this.setState((prevState) => ({
			show: prevState.show ? false : true
		}))
	} 
	handleAddList() {
		this.setState((prevState) => ({
			list: [...prevState.list, 'item']
		}), () => {
			console.log(this.state.list)
		})
	}
	getData() {
		axios.get('http://localhost:3333/list/data').then(res => {
			console.log(res)
		})
	}
	componentDidMount() {
		this.getData()
	}
	render() {
		const { show, list } = this.state
		return (
			<Fragment>
				<CSSTransition
					in={show}
					appear={true}
					timeout={1000}
					classNames="fade"
					unmountOnExit
					onEntered={(el) => {
						el.style.color = 'blue'
					}}
				>
					<div>react动画</div>
				</CSSTransition>
				<TransitionGroup>
				{
					list.map((item, index) => (
						<CSSTransition
							appear={true}
							timeout={1000}
							classNames="fade"
							unmountOnExit
							key={item + index}
						>
							<div>{item}</div>
						</CSSTransition>
					))
				}
				</TransitionGroup>
				<button onClick={this.handleAddList}>toggle</button>
			</Fragment>
		)
	}
}

export default Index