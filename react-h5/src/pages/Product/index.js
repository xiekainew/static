import React from 'react'
import request from '@/common/request'
import {
  Toast,
  Flex,
  FlexItem,
  Preview,
  PreviewFooter,
  PreviewButton,
  Panel,
  PanelHeader,
  PanelBody,
  MediaBox,
  MediaBoxDescription,
  Cells,
  Cell,
  CellBody,
  CellFooter
} from 'react-weui'
import {img} from '@/common/utils'
import Placeholder from '@/components/Placeholder'
import ProductFooter from '@/components/ProductFooter'
import defaultCover from '@/assets/imgs/cover.png'
import Notice from './notice'
import './style.less'

class Product extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: false,
      showNotice: false,
      p: {}
    }
  }
  async componentDidMount () {
    await this.fetch()
    document.title = this.state.p.productName
  }
  async fetch (done) {
    this.setState({loading: true})
    let params = {
      productId: this.props.match.params.id
    }
    let res = await request.get('http://localhost:2001/product/detail', {params: params})
      .catch(err => this.setState({loading: false}))

    this.setState({loading: false})
    done && done()
    if (res.success) {
      console.log(res)
      this.setState({p: res.data})
    }
  }
  noticeHandle () {
    this.setState({showNotice: true})
  }
  noticeStateHandle (offset) {
    return this.setState({
      showNotice: offset
    })
  }
  createPlan () {
    console.log(this.props)
    this.props.history.push(`/product/${this.props.match.params.id}/plan`, {product: this.state.p})
  }
  render () {
    /*
    const CellMore = () => (
      <Cell access link>
        <CellBody>More</CellBody>
        <CellFooter />
      </Cell>
    )
    */
    if (!this.state.p || !this.state.p.id) {
      return <Toast icon="loading" show={this.state.loading}>加载中...</Toast>
    }
    let p = this.state.p
    /*<Page transition={true} infiniteLoader={false} ptr={false} ptrOnRefresh={this.fetch.bind(this)} style={{display: this.state.showNotice?'none':'block'}}>*/
    return (
      <div>
      <div className="nb-h5-page" style={{display: this.state.showNotice?'none':'block'}}>
        <div className="page-product-detail">
          <img src={img(p.minPic) || defaultCover} className="product-cover" alt="cover"/>
          <div className="bg-white pb15">
            <Flex className="clearfix">
              <FlexItem>
                <div className="pro-detail-top row p15">
                  <span><em>￥</em>{p.referencePremium}</span>
                  <span>元起</span>
                </div>
              </FlexItem>
            </Flex>

            <Flex>
              <FlexItem>
                <div className="sub-row pl15">
                  <div>{p.insuredAge}</div>
                  <div>投保年龄</div>
                </div>
              </FlexItem>
              <FlexItem style={{width:'40%', flex:'initial'}}>
                <div className="sub-row pr15">
                  <div>{
                    p.insuredDuration ? p.insuredDuration.split('|').reverse()[0] : ''
                  }</div>
                  <div>保险期限</div>
                </div>
              </FlexItem>
            </Flex>

            <Flex className="mt10">
              <FlexItem>
                <div className="sub-row pl15">
                  <div>{p.insuranceCompanyName}</div>
                  <div>保险公司</div>
                </div>
              </FlexItem>
            </Flex>
          </div>

          <Panel>
            <PanelHeader className="sub-tit">产品特色</PanelHeader>
            <PanelBody>
              <MediaBox type="text">
                <MediaBoxDescription className="text-block pre-line">
                  {p.productFeature}
                </MediaBoxDescription>
                <div className="media-box-inner hide">
                  <div>保障范围广：意外保障更全面</div>
                  <div>保额身价高：低保费，高保障</div>
                  <div>保障时间长：保障长达30年</div>
                  <div>报废有增值：满期给付主险保费*110%</div>
                </div>
              </MediaBox>
            </PanelBody>
          </Panel>

          <Cells className="mt10">
            <Cell access onClick={this.noticeHandle.bind(this)}>
              <CellBody className="sub-tit">投保须知</CellBody>
              <CellFooter/>
            </Cell>
          </Cells>

          <ProductFooter thirdId={this.state.p.thirdId}/>
          <Placeholder height="50"/>

          <Preview className="clearfix">
            <PreviewFooter className="fixed-bottom full-width">
              <PreviewButton primary className="btn btn-primary"
                onClick={this.createPlan.bind(this)}>生成计划书</PreviewButton>
            </PreviewFooter>
          </Preview>
        </div>
      </div>
      {this.state.showNotice ? <Notice datas={p} backgroundColor={'red'} handle={this.noticeStateHandle.bind(this)}/> : ''}
      </div>
    )
  }
}

export default Product
