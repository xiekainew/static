import React, {Component} from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Routes from './routers'
console.log(Routes)
class RouterMap extends Component {
    render () {
        return (
            <HashRouter>
                <Switch>
                    {
                        Routes.map((item, i) => (
                            <Route exact path={item.path} component={item.component} key={i}/>
                        ))
                    }
                    <Route render={() => '未找到页面'}/>
                </Switch>
            </HashRouter>
        )
    }
}

export default RouterMap
