import React from 'react'

class FixedButton extends React.Component {
  render () {
    let style = {
      // position: 'fixed',
      // zIndex: 99,
      // bottom: 0,
      // left: 0,
      // borderRadius: '0',
      color: this.props.color || '#fff',
      backgroundColor: this.props.backgroundColor || '#1AAD19'
    }
    return (
      <div className="fixed-bottom fixed-btn full-width align-center"
        style={style}
        onClick={this.props.onClick}>
        {this.props.text}
      </div>
    )
  }
}

export default FixedButton
