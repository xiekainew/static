import React from 'react'
import {Toast, Flex, FlexItem} from 'react-weui'
import request from '@/common/request'
import {img} from '@/common/utils'
import './style.less'
import defaultCover from '@/assets/imgs/cover.png'

class List extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      position: 'absolute',
      loading: false,
      list: null
    }
  }
  async componentDidMount () {
    await this.fetch()
    let listH = this.refs['p-list'].scrollHeight
    let footH = this.refs['list-footer-copy'].scrollHeight
    let bodyH = document.body.clientHeight
    if (listH + footH > bodyH) {
      this.setState({position: ''})
    } else {
      this.setState({position: 'absolute'})
    }
  }
  componentWillUnmount () {}
  async fetch () {
    this.setState({loading: true})
    let res = await request.get('http://localhost:2001/home/list').catch(err => {
        this.setState({loading: false})
      })
    console.log(res)
    this.setState({loading: false})
    if (res.success) {
      this.setState({
        list: res.data
      })
    }
  }
  detail (item) {
    let urlPrefix = '/product/'
    if (item.actionType === 'ACTION_TYPE_ONLINE_PAY') {
      urlPrefix = '/policy/product/'
    }
    this.props.history.push(`${urlPrefix}${item.productId}`)
  }
  render() {
    if (!this.state.list) {
      return <Toast icon="loading" show={this.state.loading}>加载中...</Toast>
    }
    let style = {
      position: this.state.position,
      width: '100%',
      bottom: 0,
      left: 0
    }
    return this.state.list.length === 0
      ? <div className="weui-loadmore weui-loadmore_line" style={{display: 'block'}}>
            <span className="weui-loadmore__tips" style={{backgroundColor: '#f8fbfc'}}>暂无数据</span>
        </div>
      : (<div className="page-product-list">
        <ul ref="p-list">
          {this.state.list.map((item, index) => {
            return (
              <li key={index} onClick={this.detail.bind(this, item)}>
                {/*<span>服务费率{item.maxRate}%</span>*/}
                <div className="img-cover">
                  <img src={img(item.minPic) || defaultCover} alt="cover" />
                </div>
                <div className="clearfix">
                  <Flex>
                    <FlexItem>
                        <div className="placeholder">{item.productName}</div>
                    </FlexItem>
                    <FlexItem style={{width:'30%', flex:'initial'}}>
                        <div className="placeholder align-right">
                        <span>{item.referencePremium && `${item.referencePremium}元起`}</span>
                        </div>
                    </FlexItem>
                </Flex>
                  <p>{item.productLightSpot}</p>
                </div>
              </li>
            )
          })}
        </ul>
        <div ref="list-footer-copy" style={style}>
          <p className="footer-copy-text">温馨提示：本页面保险业务仅供宣传使用，均由相关公司提供，并授权使用。</p>
        </div>
      </div>
    )
  }
}

export default List
