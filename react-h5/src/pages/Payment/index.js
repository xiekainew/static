import React from 'react'
import {Button} from 'react-weui'
import {get} from 'lodash'
import request from '@/common/request'
import PROTOTYPE_DATA from './prototype.json'

class Payment extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: false,
      paying: false,
      postData: PROTOTYPE_DATA,
      payUrl: null,
      err: null
    }
  }
  componentDidMount () {
    this.$set('postData.payCode', Date.now())
  }
  async pay () {
    let res = await request.post('/api/v1/client/insurance/payment/save', this.state.postData).catch(err => {
      this.setState({
        err: {
          msg: err.message,
          status: err.response.statusText
        }
      })
    })
    console.log('res:', res)
    if (get(res, 'data.statusCode', null) === 0) {
      this.setState({
        payUrl: res.data.data.codeUrl,
        paying: true,
        res: JSON.stringify(res.data)
      })
    }
  }
  render() {
    return (
      <div className="align-center" style={{padding: '20px'}}>
        <input value={this.state.postData.amount}
          style={{padding: '10px 0', width: '100%', textAlign: 'center'}}
          onChange={(e) => {this.$set('postData.amount', e.target.value)}} />

        <input value={this.state.postData.payCode}
          style={{padding: '10px 0', width: '100%', textAlign: 'center'}}
          onChange={(e) => {this.$set('postData.payCode', e.target.value)}} />

        <input value={this.state.postData.policyId}
          placeholder="policyId"
          style={{padding: '10px 0', width: '100%', textAlign: 'center'}}
          onChange={(e) => {this.$set('postData.policyId', e.target.value)}} />

        <br /><br /><br />
        codeUrl: {this.state.payUrl}
        <br />
        {this.state.err
          ? <div>{this.state.err.status}<br />{this.state.err.msg}<br /><br /><br /></div>
          : null
        }

        {this.state.paying
          ? <a className="weui-btn weui-btn_primary" href={this.state.payUrl} target="_blank">去支付</a>
          : <Button type="primary" onClick={this.pay.bind(this)}>提交订单</Button>
        }

      </div>
    )
  }
}

export default Payment
