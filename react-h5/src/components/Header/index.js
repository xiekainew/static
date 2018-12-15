import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Header extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      now: Date.now(),
      username: '123'
    }
  }
  componentDidMount () {
    // ajax request
    console.log('componentDidMount...')
  }
  componentDidUpdate () {
    console.log('componentDidUpdate...')
  }
  componentWillUnmount () {
    // 清空 clear  释放
    console.log('componentWillUnmount...')
  }
  render () {
    let style = {
      width: '100%',
      backgroundColor: '#0493dc',
      color: '#fff',
      textAlign: 'center'
    }
    return (
      <div style={style}>
      </div>
    )
  }
  clickBtn () {
    window.alert(1111)
  }
  changeTime () {
    this.setState({
      now: Date.now()
    })
  }
  changeHandele (e) {
    this.setState({
      username: e.target.value
    })
  }
}

export default Header
