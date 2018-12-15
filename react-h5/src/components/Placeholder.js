import React from 'react'

class Placeholder extends React.Component {
  render () {
    let style = {
      width: '100%',
      height: `${this.props.height || 10}px`
    }
    return (
      <div className="clearfix" style={style}></div>
    )
  }
}

export default Placeholder
