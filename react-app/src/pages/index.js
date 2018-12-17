import React, {Component} from 'react'
import {Tab, TabBody, TabBar, NavBar, TabBarItem, Article} from 'react-weui'

import HomeIndex from './home/index'

class Index extends Component {
    constructor (props) {
        super(props)
        this.state = {
            tab: 0
        }
    }
    render () {
        return (
            <div>
                <TabBody>
                    <Article style={{display: this.state.tab === 0 ? null : 'none'}}>
                        <HomeIndex/>
                    </Article>
                </TabBody>
                <TabBar>
                    <TabBarItem
                        label='首页'
                        active={this.state.tab === 0}
                        onClick={e=> this.setState({tab: 0})}
                    >
                    </TabBarItem>
                    <TabBarItem
                        label='新闻'
                        active={this.state.tab === 1}
                        onClick={e=> this.setState({tab: 1})}
                    >
                        <Article>tab2</Article>
                    </TabBarItem>
                    <TabBarItem
                        label='收藏'
                        active={this.state.tab === 2}
                        onClick={e=> this.setState({tab: 2})}
                    >
                    </TabBarItem>
                </TabBar>
            </div>
        )
    }
}

export default Index
