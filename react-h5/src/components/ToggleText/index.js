import React from 'react'
import {Auth} from '@/common/auth'
import {classNames} from '@/common/utils'
import './style.less'

class ToggleText extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      list: this.props.list
    }
  }
  toggle (item, index) {
    item._open = !item._open
    let list = []
    list = this.state.list
    list[index] = item
    this.setState({list: list})
  }
  render () {
    const {className, ...others} = this.props
    const klass = classNames([
      'component-toogle-text', className
    ])
    return (
      <div className={klass} {...others}>
        <div style={{marginTop: 0}}>
          {this.state.list.map((item, idx) => (
            <div className="cells-sub" key={idx}>
              <div className="weui-cell weui-cell_access" onClick={this.toggle.bind(this, item, idx)}>
                <div className="weui-cell__bd">{item.title}</div>
                <div className={item._open?'weui-cell__ft cell-down':'weui-cell__ft'}></div>
              </div>
              {item._open? (
                item.type === 'link' ? <div className="toogle-content">
                  <a href={`/api/v1/insurance/file/download?fileId=${item.content.id}&access_token=${Auth.token()}`} target="_blank">{item.content.fileName}</a>
                </div> : <div className="toogle-content pre-line">{item.content !== null ? item.content : '暂无内容'}</div>
              ) : ''}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default ToggleText
