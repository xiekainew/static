import React from 'react'
import {
  Toast,
  Button
} from 'react-weui'
import {get} from 'lodash'
import request from '@/common/request'
import {img} from '@/common/utils'
import defaultBgImg from '@/assets/imgs/open-cover.png'
import './style.less'

class Cover extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: false,
      plan: null,
      product: null
    }
  }
  async componentWillMount () {
    this.loading()
    let planRes = await this.fetchPlan()
    this.setState({plan: get(planRes, 'data.data', null)})
    if (this.state.plan) {
      let pres = await this.fetchProduct(this.state.plan.productId)
      this.setState({product: pres.data.data})
    }
    this.loading(false)
    document.title = this.state.product.productName
    setTimeout(() => {this.open()}, 3000)
  }
  fetchPlan () {
    this.setState({loading: true})
    return request.get('/api/v1/client/insurance/open/reservation/detail', {params: {
      reservationId: this.props.match.params.id
    }})
  }
  fetchProduct (pid) {
    return request.get('/api/v1/client/insurance/product/detail', {params: {
      productId: pid
    }})
  }
  loading (show = true) {
    this.setState({loading: show})
  }
  open () {
    this.props.history.replace(`/product/${this.state.plan.id}/open`)
  }
  render () {
    if (!this.state.plan) {
      return <Toast icon="loading" show={this.state.loading}>加载中...</Toast>
    }
    return (
      <div className="nb-h5-page page-product-cover">
        <img src={defaultBgImg || img(this.state.product.planCover)} style={{width:'100%'}} alt="cover" />
        <div className="close-btn-bottom">
          {this.state.plan.ownerName
            ? <h2>敬呈{this.state.plan.ownerName}{this.state.plan.insuredGender === '男' ? '先生' : '女士'}</h2>
            : null
          }
          <Button type="primary" plain onClick={this.open.bind(this)}>立即开启</Button>
        </div>
      </div>
    )
  }
}

export default Cover
