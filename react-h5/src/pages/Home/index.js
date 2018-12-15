import React from 'react'

class Home extends React.Component {
  componentDidMount () {
    this.props.history.replace('/list')
  }
  render() {
    return null
  }
}

export default Home
