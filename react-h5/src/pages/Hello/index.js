import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Button, Input} from 'react-weui'

class Hello extends React.Component {
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
    return (
      <div className="align-center">
        <p>这是title: {this.props.title}</p>
        <Button type="primary" onClick={this.clickBtn}>click test</Button>
        <br />
        <h2>now time is: {this.state.now}</h2>
        <br />
        <Button type="primary" size="small" plain onClick={this.changeTime.bind(this)}>change time</Button>
        <br />
        <Input
          type="text"
          placeholder="输入用户名用户名"
          value={this.state.username}
          onChange={this.changeHandele.bind(this)}/>
        <br /><br />
        <p>username: {this.state.username}</p>
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

export default Hello
