import React from 'react'
import {
  Toast,
  Flex,
  FlexItem,
  Panel,
  PanelHeader,
  PanelBody,
  MediaBox,
  MediaBoxDescription,
  Cells,
  Cell,
  CellBody,
  CellFooter,
  Dialog,
  Tab,
  TabBody,
  NavBar,
  NavBarItem,
  Form,
  FormCell,
  Preview,
  PreviewFooter,
  PreviewButton,
  Input
} from 'react-weui'
import {get, merge} from 'lodash'
import {money, isMobile} from '@/common/utils'
import {MOCK_PRODUCT} from '@/common/const'
import request from '@/common/request'
import Notice from './notice'
import bg from '@/assets/imgs/bg.png'
import circle from '@/assets/imgs/circle.png'
import Placeholder from '@/components/Placeholder'
import ProductFooter from '@/components/ProductFooter'
// import FixedButton from '@/components/FixedButton'
import {Auth} from '@/common/auth'
import './style.less'

class Open extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      user: Auth.user(),
      loading: false,
      showNotice: false,
      plan: null,
      product: null,
      showDialog: false,
      showContact: false,
      postSuccess: false,
      tab: 0,
      maxHeight: '300px',
      dialog: {
        buttons: [
          {
            type: 'default',
            label: '查看投保须知',
            onClick: this.noticeHandle.bind(this)
          },
          {
            type: 'default',
            label: '关闭',
            onClick: () => {
              this.setState({
                showDialog: false
              })
            }
          }
        ]
      },
      contactDialog: {
        buttons: [
          {
            type: 'default',
            label: '取消',
            onClick: () => {
              this.setState({showContact: false})
            }
          },
          {
            label: '确定',
            onClick: this.contact.bind(this)
          }
        ]
      },
      contact: {
        contactsName: '',
        phone: ''
      },
      warn: {
        contactsName: false,
        phone: false
      },
      showShare: false
    }
  }
  async componentWillMount () {
    this.loading()
    let planRes = await this.fetchPlan()
    this.setState({plan: get(planRes, 'data.data', null)})
    this.loading(false)
    if (this.state.plan) {
      let pres = await this.fetchProduct(this.state.plan.productId)
      await this.setState({product: pres.data.data})
    }
    document.title = this.state.product.productName
    this.share()
  }
  componentDidMount () {
    this.setState({maxHeight: document.body.clientHeight - 100 * 2})
  }
  share () {
    window.wx.ready(res => {
      window.wx.onMenuShareAppMessage({
        title: this.state.product.productName,
        desc: this.state.product.productLightSpot.replace(/[\r\n]/g, ''),
        link: window.location.href,
        imgUrl: 'http://is.newbanker.cn/contract/a179e472-3538-4f33-9138-5b5f71d5fd83.png',
        trigger: function (res) {},
        success: function (res) {},
        cancel: function (res) {},
        fail: function (res) {}
      })
      window.wx.error(err => {
        console.log('wx config err:', err)
      })
    })
  }
  loading (show = true) {
    this.setState({loading: show})
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
  close () {
    this.props.handle(false)
  }
  noticeHandle () {
    this.setState({
      showDialog: false,
      showNotice: true
    })
  }
  noticeStateHandle (offset) {
    return this.setState({
      showNotice: offset
    })
  }
  pushContact () {
    this.setState({showContact: true})
  }
  async contact () {
    if (this.state.contact.contactsName === '') {
      this.$set('warn.contactsName', true)
      return
    }
    if (!isMobile(this.state.contact.phone)) {
      this.$set('warn.phone', true)
      return
    }
    let res = await request.post('/api/v1/client/insurance/open/reservation/contacts', merge(this.state.contact, {
      comment: '',
      reservationRecordId: this.state.plan.id
    }))
    if (res.data.statusCode === 0) {
      this.setState({showContact: false})
      this.setState({postSuccess: true})
      setTimeout(() => {
        this.setState({postSuccess: false})
        this.props.history.push('/list')
      }, 2000)
    }
  }
  render () {
    if (!this.state.plan || !this.state.product) {
      return <Toast icon="loading" show={this.state.loading}>加载中...</Toast>
    }
    let m = money(this.state.plan.insuranceAmount, true)
    return (
      <div>
      <div className="nb-h5-page page-product-open" style={{display: this.state.showNotice?'none':'block'}}>
        <img src={bg} alt="top cover" className="full-width pull-left"/>
        <div className="clearfix align-center bg-white open-top">
          <h2>保障计划：{this.state.plan.insuredGender}{this.state.plan.insuredAge ? `${this.state.plan.insuredAge}岁`:null}</h2>
          <p>保障金额</p>
          <h1>{m.value.toString().indexOf('.') > -1 ? m.value.toFixed(2) : m.value}<span>{m.unit}元</span></h1>
          <Flex>
            <FlexItem>
              <div className="flex-info">
                <p>首年保费</p>
                <div>{this.state.plan.premiumFirst}元</div>
              </div>
            </FlexItem>
            <FlexItem>
              <div className="flex-info">
                <p>保障期限</p>
                <div>{this.state.plan.insuredDuration}</div>
              </div>
            </FlexItem>
            <FlexItem>
              <div className="flex-info">
                <p>缴费期限</p>
                <div>{this.state.plan.payDuration}</div>
              </div>
            </FlexItem>
          </Flex>
        </div>

        <Panel>
          <PanelHeader>保障详情<span className="color-orange"
            onClick={e => {this.setState({showDialog: true})}}>病种</span></PanelHeader>
          <PanelBody>
            <MediaBox type="text">
              <MediaBoxDescription className="text-block">

              </MediaBoxDescription>
              <ul className="safeguard-dec weui-media-box__desc text-block">
                <li>
                  <h2><img src={circle} alt="circle"/>80种重疾 最高 <span className="color-orange">{this.state.plan.insuranceAmount*3}</span> 元</h2>
                  <div>
                    <p>第1次重疾：<em>{this.state.plan.insuranceAmount}</em> 元</p>
                    <p>第2次重疾：<em>{this.state.plan.insuranceAmount}</em> 元</p>
                    <p>第3次重疾：<em>{this.state.plan.insuranceAmount}</em> 元</p>
                  </div>
                  <p>80种重疾份4组，等待90天，每组重疾赔付1次，最高赔付三组，最高赔付间隔180天</p>
                </li>
                <li>
                  <h2><img src={circle} alt="circle"/>{this.state.product.productName.indexOf(MOCK_PRODUCT) >- 1 ? '28' : '30'}种轻疾 最高 <span className="color-orange">{this.state.plan.insuranceAmount*0.2*3}</span> 元</h2>
                  <div>
                    <p>第1次轻疾：<em>{this.state.plan.insuranceAmount*0.2}</em> 元</p>
                    <p>第2次轻疾：<em>{this.state.plan.insuranceAmount*0.2}</em> 元</p>
                    <p>第3次轻疾：<em>{this.state.plan.insuranceAmount*0.2}</em> 元</p>
                  </div>
                  <p>{this.state.product.productName.indexOf(MOCK_PRODUCT) >- 1 ? '28' : '30'}种重疾份4组，等待90天，每组轻疾赔付1次，最高赔付三组，最高赔付间隔180天</p>
                </li>
                <li>
                  <h2><img src={circle} alt="circle"/>身故保障 最高 <span className="color-orange">{this.state.plan.insuranceAmount}</span> 元</h2>
                </li>
                <li>
                  <h2><img src={circle} alt="circle"/>豁免保障</h2>
                  <p style={{paddingTop: 0}}>等待期后，若被保人首次确诊轻症/重疾，免交后续保费，保单利益不变</p>
                </li>
              </ul>
            </MediaBox>
          </PanelBody>
        </Panel>

        <Cells className="mt10">
          <Cell access onClick={this.noticeHandle.bind(this)}>
            <CellBody><span className="color-orange">投保须知</span></CellBody>
            <CellFooter/>
          </Cell>
        </Cells>

        <Panel>
          <PanelHeader>风险提示</PanelHeader>
          <PanelBody>
            <MediaBox type="text">
              <MediaBoxDescription className="text-block text-notice">
                投保人在保单犹豫期后解除合同会遭受一定损失。本计划书演示数据仅供参考，具体保单利益请以保单合同为准。
              </MediaBoxDescription>
            </MediaBox>
          </PanelBody>
        </Panel>

        <PanelBody>
          <MediaBox type="text" style={{marginBottom:0,paddingBottom:0}}>
            <MediaBoxDescription className="text-block">
              以上演示说明为本平台对上述产品的理解便于保险从业人员学习、交流，演示数据仅供参考，请以实际为准
            </MediaBoxDescription>
          </MediaBox>
        </PanelBody>

        <ProductFooter thirdId={this.state.product.thirdId}/>
        <Placeholder height="70"/>

        {/*<FixedButton text="立即预约" backgroundColor="#ff8825" onClick={this.pushContact.bind(this)}/>*/}
        <Preview className="open-btn">
          <PreviewFooter className="fixed-bottom full-width">
            {this.state.showShare
              ? <PreviewButton className="bg-white align-left color-orange" onClick={this.share.bind(this)}>立即分享</PreviewButton>
              : ''}
            <PreviewButton primary className="btn btn-primary"
              onClick={this.pushContact.bind(this)}>立即预约</PreviewButton>
          </PreviewFooter>
        </Preview>

      </div>

      <Dialog type="ios" className="contact-form-dialog"
        title="请输入您的联系方式"
        buttons={this.state.contactDialog.buttons}
        show={this.state.showContact}>
        <div>
          <Form className="mt10">
            <FormCell warn={this.state.warn.contactsName}>
              <CellBody>
                <Input type="text" placeholder="请输入称呼"
                  autoFocus={this.state.warn.contactsName}
                  value={this.state.contact.contactsName}
                  onChange={(e) => {
                    this.$set('contact.contactsName', e.target.value)
                    if (e.target.value !== '') {
                      this.$set('warn.contactsName', false)
                    }
                  }}/>
              </CellBody>
            </FormCell>
            <FormCell warn={this.state.warn.phone}
              value={this.state.contact.phone}
              onChange={(e) => {
                this.$set('contact.phone', e.target.value)
                if (e.target.value !== '') {
                  this.$set('warn.phone', false)
                  if (!isMobile(e.target.value)) {
                    this.$set('warn.phone', true)
                  }
                }
              }}>
              <CellBody>
                <Input type="tel" placeholder="请输入联系电话"/>
              </CellBody>
            </FormCell>
          </Form>
        </div>
      </Dialog>

      <Dialog type="ios" className="clean-dialog wide-dialog open-dialog"
        show={this.state.showDialog}
        buttons={this.state.dialog.buttons}>
        <div>
          <h2>保障详情</h2>
          <Tab>
            <NavBar>
              <NavBarItem active={this.state.tab === 0} onClick={e=>this.setState({tab:0})}>重疾</NavBarItem>
              <NavBarItem active={this.state.tab === 1} onClick={e=>this.setState({tab:1})}>轻疾</NavBarItem>
            </NavBar>
            <TabBody>
              <div className="tab-content" style={{maxHeight: this.state.maxHeight, display: this.state.tab === 0 ? null : 'none'}}>
                <div className="pre-line">
                  {this.state.product.seriousDisease}
                </div>
              </div>
              <div className="tab-content" style={{maxHeight: this.state.maxHeight, display: this.state.tab === 1 ? null : 'none'}}>
              <div className="pre-line">
                {this.state.product.slightDisease}
              </div>
              <ul className="tab-ul hide">
                <li>1. some-text</li>
              </ul>
              </div>
            </TabBody>
          </Tab>
        </div>
      </Dialog>
      <Toast icon="success-no-circle" show={this.state.postSuccess}>提交成功</Toast>
      {this.state.showNotice ? <Notice style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
      }} datas={this.state.product} backgroundColor="#ff8825" handle={this.noticeStateHandle.bind(this)}/> : ''}
      </div>
    )
  }
}

export default Open
