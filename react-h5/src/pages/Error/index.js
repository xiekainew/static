import React from 'react'
import {Page, Button} from 'react-weui'
import './error.less'

class Errors extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      counter: 3
    }
  }
  componentDidMount () {
    let timer = setInterval(() => {
      if (this.state.counter <= 1) {
        window.clearInterval(timer)
        this.props.history.goBack()
        return
      }
      this.setState({
        counter: --this.state.counter
      })
    }, 1000)
  }
  backHandle () {
    this.props.history.goBack()
  }
  render() {
    return (
      <Page transition={true} infiniteLoader={true}>
        <div className="page-error">
          <h2>当前页面没有找到</h2>
          <p>{this.state.counter}秒后返回上一页</p>
          <Button type="primary" size="small" plain onClick={this.backHandle.bind(this)}>返回</Button>
        </div>
      </Page>
    )
  }
}

export default Errors
