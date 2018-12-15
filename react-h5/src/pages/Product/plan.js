import React from 'react'
import {
  Button,
  Cell,
  Cells,
  CellHeader,
  CellBody,
  CellFooter,
  Form,
  FormCell,
  Input,
  Label,
  Select,
  Preview,
  PreviewFooter,
  PreviewButton,
  Toptips,
  Dialog
} from 'react-weui'
import {merge, cloneDeep} from 'lodash'
import moment from 'moment'
import {MOCK_PRODUCT} from '@/common/const'
import {getAge} from '@/common/utils'
import request from '@/common/request'
import Placeholder from '@/components/Placeholder'
import ProductFooter from '@/components/ProductFooter'
import Notice from './notice'
import {Auth} from '@/common/auth'
import reservationPrototype from './reservation-prototype.json'
import './style.less'
window.getAge = getAge

class Plan extends React.Component {
  constructor (props, context) {
    super(props, context)
    let product = null
    if (this.props.location.state) {
      product = this.props.location.state.product
    } else {
      product = {}
    }
    this.state = {
      user: Auth.user(),
      loading: false,
      showNotice: false,
      showCover: false,
      confirmDialogShow: false,
      confirmDialog: {
        buttons: [
          {
            type: 'default',
            label: '取消',
            onClick: () => {
              this.setState({confirmDialogShow: false})
            }
          },
          {
            label: '确定',
            onClick: () => {
              this.confirmCreate()
            }
          }
        ]
      },
      product: product,
      calType: 'amount', // fee:保费计算 amount:保额计算
      error: null,
      gender: '',
      age: '',
      birthday: '',
      duration: '',
      // 保额
      calCoverageData: {
        productId: product.id,
        coverage: '',
        items: []
      },
      // 保费
      calPremiumData: {
        productId: product.id,
        premium: '',
        items: []
      },
      customerName: '',
      customerGender: '',
      calResult: '',
      calLoading: false,
      postData: null,
      premiumCfg: {
        step: 10000, // 步长
        min: 10000 // 最少起步金额
      },
      coverageCfg: {
        step: 10000,
        min: 50000
      },
      SPEC_PRODUCT: [
        {
          name: MOCK_PRODUCT
        }
      ],
      datePlaceName: '' // clear-placeholder
    }
  }
  async componentWillMount () {
    await this.fetchProduct()
    document.title = this.state.product.productName
    if (this.state.product.productName.indexOf(this.state.SPEC_PRODUCT[0].name) >- 1) {
      await this.setState({coverageCfg: {
        step: 10000,
        min: 100000
      }})
    }
  }
  async fetchProduct () {
    this.setState({loading: true})
    let params = {productId: this.props.match.params.id}
    let res = await request.get('/api/v1/client/insurance/product/detail', {params: params}).catch(err => {
      this.setState({loading: false})
    })
    this.setState({loading: false})
    if (res.data.statusCode === 0) {
      this.setState({product: res.data.data})
      this.$set('calCoverageData.productId', res.data.data.id)
      this.$set('calPremiumData.productId', res.data.data.id)
    }
  }
  toggleCalType (type) {
    this.setState({calResult: ''})
    this.setState({calType: type})
    this.cal()
  }
  selChange (node) {
    let prefix = node.getAttribute('class').replace(/normal-select/g, '')
    node.setAttribute('class', `${prefix} ${node.value !== '' ? 'normal-select': ''}`)
  }
  genderChange (e) {
    this.selChange(e.target)
    this.setState({
      gender: e.target.value
    })
    this.cal()
  }
  birthdayChange (e) {
    this.setState({datePlaceName: e.target.value === '' ? '' : 'clear-placeholder'})
    let now = moment().get('year')
    let val = moment(e.target.value).get('year')
    if (now >= val) {
      this.setState({
        birthday: e.target.value,
        age: getAge(e.target.value) || ''
      })
      this.cal()
    }
  }
  ageChange (e) {
    this.setState({
      age: e.target.value
    })
    this.cal()

    let year = moment().get('year')
    let bir = moment(`${year-e.target.value}-${moment().format('MM-DD')}`).format('YYYY-MM-DD')
    this.setState({
      birthday: bir
    }, () => {
      this.setState({datePlaceName: this.state.birthday === '' ? '' : 'clear-placeholder'})
    })
  }
  changePremium (type) {
    let offset = this.state.premiumCfg.step // 步长
    let min = this.state.premiumCfg.min // 最少起步金额
    let premium = parseFloat(this.state.calPremiumData.premium === '' ? 0 : this.state.calPremiumData.premium)
    let val = type === 'sub' ? premium + offset : premium - offset
    let _premium = val > 0 ? val : 0
    if (this.state.calPremiumData.premium === '' || parseFloat(this.state.calPremiumData.premium) < min) {
      _premium = min
    }
    this.setState({
      calPremiumData: merge(this.state.calPremiumData, {premium: _premium < min ? min : _premium})
    })
    this.cal()
  }
  premiumChange (e) {
    let min = this.state.premiumCfg.min
    let calPremiumData = this.state.calPremiumData
    calPremiumData.premium = e.target.value
    if (parseFloat(e.target.value) < min) {
      return this.showError(`保费金额最低${this.state.premiumCfg.min}元`)
    }
    this.setState({
      calPremiumData: calPremiumData
    })
    this.cal()
  }
  changeCoverage (type) {
    let offset = this.state.coverageCfg.step // 步长(10000)
    let min = this.state.coverageCfg.min // 最少起步金额(50000)
    let coverage = parseFloat(this.state.calCoverageData.coverage === '' ? 0 : this.state.calCoverageData.coverage)
    let val = type === 'sub' ? coverage + offset : coverage - offset
    let _coverage = val > 0 ? val : 0
    if (this.state.calCoverageData.coverage === '' || parseFloat(this.state.calCoverageData.coverage) < min) {
      _coverage = min
    }
    this.setState({
      calCoverageData: merge(this.state.calCoverageData, {coverage: _coverage < min ? min : _coverage})
    })
    this.cal()
  }
  coverageChange (e) {
    let min = this.state.coverageCfg.min
    let calCoverageData = this.state.calCoverageData
    calCoverageData.coverage = e.target.value
    if (parseFloat(e.target.value) < min) {
      return this.showError(`保险金额最低${this.state.coverageCfg.min}元`)
    }
    this.setState({
      calCoverageData: calCoverageData
    })
    this.cal()
  }
  durationChange (e) {
    this.selChange(e.target)
    let  duration = e.target.value
    let very = this.verifyDur(duration)
    this.setState({duration})
    very && this.cal()
  }
  verifyDur (targetValue) {
    let  duration = targetValue
    let age = window.parseInt(this.state.age)
    if (this.state.product.productName.indexOf(this.state.SPEC_PRODUCT[0].name) >- 1) {
      let dur = window.parseInt(duration)
      if (age > 60) {
        this.showError(`缴费期限为${duration}时，年龄不能大于60岁`)
        return false
      }
      if ((age > 50 && age <= 55) && dur > 10) {
        this.showError(`年龄在50~55之间时，缴费期限只能是趸交、5年交和10年交`)
        return false
      }
      if ((age > 55 && age <= 60) && dur > 5) {
        this.showError(`年龄在55~60之间时，缴费期限只能是趸交和5年交`)
        return false
      }
    }
    return true
  }
  disabledDuration (itm) {
    if (this.state.product.productName.indexOf(this.state.SPEC_PRODUCT[0].name) >- 1) {
      let age = window.parseInt(this.state.age)
      let dur = window.parseInt(itm)

      if ((age > 50 && age <=55) && dur > 10) {
        return true
      }
      if ((age > 55 && age <= 60) && dur > 5) {
        return true
      }
    }
    return false
  }
  notEmpty (v) {
    return v && v !== ''
  }
  buildItems (data) {
    data.items = [
      {key: 'age', value: this.state.age},
      {key: 'duration', value: this.state.duration},
      {key: 'gender', value: this.state.gender}
    ]
    return data
  }
  cal () {
    setTimeout(() => {
      if (
        this.notEmpty(this.state.gender) &&
        this.notEmpty(this.state.age) &&
        this.notEmpty(this.state.duration)
      ) {
        if (this.state.calType === 'amount') {
          // 保额计算
          if (this.notEmpty(this.state.calCoverageData.coverage)) {
            this.requestCal(this.buildItems(this.state.calCoverageData))
          }
        } else {
          // 保费计算
          if (this.notEmpty(this.state.calPremiumData.premium)) {
            this.requestCal(this.buildItems(this.state.calPremiumData))
          }
        }
      }
    }, 10)
  }
  requestCal (data) {
    this.setState({calLoading: true})
    let api = this.state.calType === 'amount'
      ? '/api/v1/client/insurance/product/premium/cal'
      : '/api/v1/client/insurance/product/coverage/cal'
    request.post(api, data)
      .then(res => {
        this.setState({calLoading: false})
        let calResult = ''
        if (res.data.statusCode === 0) {
          calResult = res.data.data
        }
        this.setState({calResult: calResult})
      })
  }
  noticeHandle () {
    this.setState({showNotice: true})
  }
  spaStateHandle (offset) {
    return this.setState({
      showNotice: offset
    })
  }
  selectCustomer () {
    this.fakeCustomerSelector(customer => {
      this.setState({
        customerName: customer.name,
        customerGender: customer.gender
      })
    })
  }
  fakeCustomerSelector (cb) {
    // 模拟调用原生APP选择客户方法
    cb({
      id: 'fake-user-id-000001',
      name: '',
      gender: ''
    })
  }
  showError (msg, time = 2000) {
    setTimeout(() => {
      this.setState({error: null})
    }, 4000)
    this.setState({error: msg})
  }
  createPlan () {
    if (!this.notEmpty(this.state.gender)) {
      return this.showError('请选择被保险人性别')
    }
    if (!this.notEmpty(this.state.age)) {
      return this.showError('请输入被保险人年龄')
    }
    if (this.state.calType === 'amount') {
      if (!this.notEmpty(this.state.calCoverageData.coverage)) {
        return this.showError('请输入保险金额')
      }
    } else {
      if (!this.notEmpty(this.state.calPremiumData.premium)) {
        return this.showError('请输入年交保费')
      }
    }
    if (!this.notEmpty(this.state.duration)) {
      return this.showError('请选择缴费期限')
    }
    if (!this.verifyDur(this.state.duration)) {
      return false
    }

    this.reservationHandle()
  }
  async reservationHandle () {
    let data = cloneDeep(reservationPrototype)
    merge(data, {
      consultant: {
        innerId: this.state.user.id,
        innerName: this.state.user.name,
        innerPhone: this.state.user.mobile
      },
      insuranceAmount: this.state.calType === 'amount' ? this.state.calCoverageData.coverage : this.state.calResult,
      insuredGender: this.state.gender,
      insuredAge: this.state.age,
      ownerName: this.state.customerName,
      payDuration: this.state.duration.replace('年交', '年'),
      premiumFirst: this.state.calType === 'amount' ? this.state.calResult : this.state.calPremiumData.premium,
      insuredDuration: this.state.product.insuredDuration,
      productId: this.state.product.id
    })
    await this.setState({postData: data})
    // this.setState({confirmDialogShow: true})
    this.confirmCreate()
  }
  confirmCreate () {
    request.post('/api/v1/client/insurance/reservation/save', this.state.postData)
      .then(res => {
        // this.setState({confirmDialogShow: false})
        if (res.data.statusCode === 0) {
          this.props.history.replace(`/product/${res.data.data}/cover`)
        }
      })
      .catch(err => {
        // TODO
      })
  }
  render () {
    if (!this.state.product || !this.state.product.id) {
      return null
    }
    return (
      <div>
        <div className="nb-h5-page" style={{display: this.state.showNotice?'none':'block'}}>
        <div className="page-product-plan">
          <Toptips type="warn" show={this.state.error !== null}>{this.state.error}</Toptips>
          <div className="form-li-title">被保险人信息</div>
          <Form className="mt0">
            <FormCell select selectPos="after">
              <CellHeader>
                <Label>性别</Label>
              </CellHeader>
              <CellBody>
                <Select defaultValue={this.state.gender} onChange={this.genderChange.bind(this)}>
                  <option value="">请选择性别</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </Select>
              </CellBody>
            </FormCell>

            <FormCell>
              <CellHeader>
                <Label>生日</Label>
              </CellHeader>
              <CellBody>
                <Input type="date" placeholder="请选择生日"
                  className={this.state.datePlaceName}
                  value={this.state.birthday}
                  onChange={this.birthdayChange.bind(this)}/>
              </CellBody>
            </FormCell>

            <FormCell>
              <CellHeader>
                <Label>年龄</Label>
              </CellHeader>
              <CellBody>
                <Input type="number" placeholder="输入年龄"
                  value={this.state.age}
                  onChange={this.ageChange.bind(this)}/>
              </CellBody>
            </FormCell>

          </Form>

          <div className="form-li-title" style={{marginTop:'10px'}}>
            险种选择 {
              this.state.calType==='fee'
              ? <span onClick={this.toggleCalType.bind(this, 'amount')}>切换保额计算</span>
              : <span onClick={this.toggleCalType.bind(this, 'fee')}>切换保费计算</span>
            }
          </div>
          <Form className="mt0">
            <Cells className="mt0">
              <Cell>
                <CellBody className="product-title-icon">
                  <span className="text-icon">主</span> <span>{this.state.product.productName}</span>
                </CellBody>
                <CellFooter></CellFooter>
              </Cell>
            </Cells>

            {this.state.calType==='fee'
              ? (<FormCell vcode className="form-cell-no-border cal-offset">
                  <CellHeader>
                      <Label>年交保费</Label>
                  </CellHeader>
                  <CellFooter>
                    <Button type="vcode" className="align-center no-border" style={{width:'30px'}}
                      onClick={this.changePremium.bind(this, 'minus')}>-</Button>
                  </CellFooter>
                  <CellBody>
                      <Input type="tel" className="align-center" placeholder="元"
                        value={this.state.calPremiumData.premium}
                        onChange={this.premiumChange.bind(this)}/>
                  </CellBody>
                  <CellFooter>
                    <Button type="vcode" className="align-center no-border" style={{width:'30px'}}
                      onClick={this.changePremium.bind(this, 'sub')}>+</Button>
                  </CellFooter>
                </FormCell>)
              : (<FormCell vcode className="form-cell-no-border cal-offset">
                  <CellHeader>
                      <Label>保险金额</Label>
                  </CellHeader>
                  <CellFooter>
                    <Button type="vcode" className="align-center no-border" style={{width:'30px'}}
                      onClick={this.changeCoverage.bind(this, 'minus')}>-</Button>
                  </CellFooter>
                  <CellBody>
                      <Input type="tel" className="align-center" placeholder="元"
                        value={this.state.calCoverageData.coverage}
                        onChange={this.coverageChange.bind(this)}/>
                  </CellBody>
                  <CellFooter>
                    <Button type="vcode" className="align-center no-border" style={{width:'30px'}}
                      onClick={this.changeCoverage.bind(this, 'sub')}>+</Button>
                  </CellFooter>
                </FormCell>)
            }

            <FormCell select selectPos="after">
              <CellHeader>
                <Label>缴费期限</Label>
              </CellHeader>
              <CellBody>
                <Select defaultValue={this.state.duration} onChange={this.durationChange.bind(this)}>
                  <option value="">请选择续费期限</option>
                  {this.state.product.payDuration.split('|').map((itm, idx) => (
                    <option disabled={this.disabledDuration.call(this, itm, idx)} value={window.parseInt(itm) === 1 ? '趸交' : itm.indexOf('年')>-1 ? `${itm}交` : itm} key={idx}>
                      {window.parseInt(itm) === 1 ? '趸交' : (itm.indexOf('年')>-1 ? `${itm}交` : itm)}
                    </option>
                  ))}
                </Select>
              </CellBody>
            </FormCell>
          </Form>

          <div className="form-li-title" style={{marginTop:'10px'}}>投保人信息 <span style={{display: 'none'}} onClick={this.selectCustomer.bind(this)}>选择客户</span></div>
          <Form className="mt0">
            <FormCell select selectPos="after">
              <CellHeader>
                <Label>性别</Label>
              </CellHeader>
              <CellBody>
                <select className="weui-select" value={this.state.customerGender}
                  onChange={e => {this.selChange(e.target);this.setState({customerGender: e.target.value})}}>
                  <option value="">请选择性别(选填)</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </CellBody>
            </FormCell>

            <FormCell>
              <CellHeader>
                <Label>姓名</Label>
              </CellHeader>
              <CellBody>
                <Input type="text" placeholder="输入投保人姓名(选填)"
                  value={this.state.customerName}
                  onChange={e => {this.setState({customerName: e.target.value})}}/>
              </CellBody>
            </FormCell>

          </Form>

          <Cells className="mt10">
            <Cell access onClick={this.noticeHandle.bind(this)}>
              <CellBody>投保须知</CellBody>
              <CellFooter/>
            </Cell>
          </Cells>

          <ProductFooter thirdId={this.state.product.thirdId}/>
          <Placeholder height="70"/>

          <Preview className="create-plan-btn">
            <PreviewFooter className="fixed-bottom full-width">
              {!this.state.calLoading
                ? <PreviewButton className="bg-white align-left pl15 color-orange">
                    {this.state.calResult !== '' ? `${this.state.calResult}元` : '首年保费 0.00元'}&nbsp;
                  </PreviewButton>
                : <PreviewButton className="bg-white align-left pl15 color-orange">
                    <i className="weui-loading"></i>
                  </PreviewButton>
              }
              <PreviewButton primary className="btn btn-primary"
                style={{lineHeight: '50px'}}
                onClick={this.createPlan.bind(this)}>生成计划书</PreviewButton>
            </PreviewFooter>
          </Preview>

        </div>
        </div>

        <Dialog type="ios"
          buttons={this.state.confirmDialog.buttons}
          show={this.state.confirmDialogShow}>
          确定要生成计划书么
        </Dialog>
        {this.state.showNotice ? <Notice datas={this.state.product} handle={this.spaStateHandle.bind(this)}/> : ''}
      </div>
    )
  }
}

export default Plan
