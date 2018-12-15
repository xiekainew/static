import React from 'react'
import {Footer} from 'react-weui'
import request from '@/common/request'
import './style.less'

class ProductFooter extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      third: null
    }
  }
  async componentWillMount () {
    let res = await this.fetch()
    if (res.data.statusCode === 0) {
      this.setState({third: res.data.data})
    }
  }
  fetch () {
    return request.get('/api/v1/client/insurance/third/detail', {params: {
      thirdId: this.props.thirdId
    }})
  }
  render () {
    if (!this.state.third) {
      return null
    }
    let third = this.state.third
    return (
      <Footer className="mt20 media-box-footer pl15 pr15 align-left">
        <p>
          {third.shortName}&nbsp;
          {third.servicePhone
            ? <scope>服务电话：<span className="color-orange pr8">{third.servicePhone}</span></scope>
            : ''}
          {third.serviceTime
            ? <scope>工作时间：<span className="color-orange">{third.serviceTime}</span></scope>
            : ''}
        </p>
        <p>
          温馨提示：本页面相关保险业务由{third.shortName}提供，经营保险代理业务许可证机构编码为 {third.serviceCode}
        </p>
      </Footer>
    )
  }
}

export default ProductFooter
