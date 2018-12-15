import React from 'react'
import Placeholder from '@/components/Placeholder'
import ProductFooter from '@/components/ProductFooter'
import FixedButton from '@/components/FixedButton'
import ToggleText from '@/components/ToggleText'
import './style.less'

class Notice extends React.Component {
  constructor (props, context) {
    super(props, context)
    let datas = this.props.datas
    this.state = {
      position: 'absolute',
      product: datas,
      list: [
        {title: '投保须知', content: datas.insuranceNotice, _open: false},
        {title: '保障责任', content: datas.insuranceLiability, _open: false},
        {title: '责任免除', content: datas.liabilityExclusion, _open: false},
        {title: '条款下载', content: datas.insuranceClause, type: 'link', _open: false}
      ]
    }
  }
  componentDidMount () {
    this.refs['toggle-text-wrap'].addEventListener('click', this.toggleTextClick.bind(this))
  }
  toggleTextClick () {
    setTimeout(() => {
      let toggle = this.refs['toggle-text-wrap']
      if (toggle.scrollHeight > document.body.clientHeight) {
        this.setState({position: ''})
      } else {
        this.setState({position: 'absolute'})
      }
    }, 10)
  }
  close () {
    this.props.handle(false)
  }
  render () {
    const style = {
      position: this.state.position,
      width: '100%',
      bottom: 0
    }
    let backgroundColor = this.props.backgroundColor || '#547eef'
    return (
      <div className="page-product-notice bg-default full-height">
        <div ref="toggle-text-wrap" className="bg-default full-height">
          <ToggleText ref="toggle-text-wrap" list={this.state.list}/>
          <div className="toggle-text-wrap bg-default" style={style}>
            <ProductFooter thirdId={this.state.product.thirdId}/>
            <Placeholder height="70"/>
          </div>
        </div>
        <FixedButton text="关闭" backgroundColor={backgroundColor} onClick={this.close.bind(this)}/>
      </div>
    )
  }
}

export default Notice
