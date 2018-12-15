import React, {Component} from 'react'
import { Provider } from 'react-redux'
import RouteMap from '@/router/index'
import configureStore from './store'
import {set} from 'lodash'

import 'weui'
import 'react-weui/build/packages/react-weui.css'
import 'animate.css'
import '@/App.less'

// state深度赋值 （适用于React Component内部）
// useage: this.$set('aaaa.bbbb.ccc.ddd', 'some-value')
Component.prototype.$set = function (keyPath, data) {
  let keys = keyPath.split('.')
  let rootKey = keys[0]
  keys.splice(0, 1)

  this.setState({
    rootKey: set(this.state[rootKey], keys.join('.'), data)
  })
}

const store = configureStore()

class App extends Component {
  componentDidMount () {
    /*
    document.body.addEventListener('touchmove', function (event) {
      event.preventDefault()
    }, false)
    */
  }
  render() {
    return (
      <Provider store={store}>
        <RouteMap/>
      </Provider>
    )
  }
}

export default App
