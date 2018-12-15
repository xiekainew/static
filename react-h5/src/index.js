import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import request from '@/common/request'
import {WECHAT} from '@/common/const'

window.NB.getWechat = async () => {
  let loadUrl = `${window.location.protocol}//${window.location.host}/`
  let res = await request.get('/api/v1/wechat/insurance/js/sign', {
    params: {url: encodeURIComponent(loadUrl)}
  }).catch(err => {})

  if (res.data.statusCode === 0) {
    window.NB.shareData = res.data.data
    let share = window.NB.shareData
    let config = {
      debug: process.env.NODE_ENV !== 'production',
      appId: WECHAT.appId,
      nonceStr: share.nonceStr,
      signature: share.signature,
      timestamp: share.timestamp,
      success: res => {
        window.alert('config-success:'+JSON.stringify(res))
      },
      error: err => {
        window.alert('config-error:'+JSON.stringify(err))
      },
      jsApiList: WECHAT.jsApiList
    }
    window.wx.config(config)
    window.wx.error(err => {
      window.alert('wx-error:' + JSON.stringify(err))
    })
  }
  run()
}
// window.NB.getWechat()
run()

async function run () {
  // await window.NB.initWechat(request, WECHAT.appId)
  ReactDOM.render(<App />, document.getElementById('root'))
  registerServiceWorker()
}
