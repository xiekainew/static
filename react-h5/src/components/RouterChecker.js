import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import {Auth} from '@/common/auth'

class RouterChecker extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {}
  }
  componentDidMount () {
    // 初始化时检查登录状态
    // console.log('AllRoute componentDidMount...')
  }
  componentDidUpdate () {
    // 路由改变，做登录检查
    // console.log('AllRoute componentDidUpdate...')
    // console.log('router checker: ', Auth.isAuthenticated(), this.props.location.pathname)
  }

  render () {
    return null
  }
}

export default RouterChecker
