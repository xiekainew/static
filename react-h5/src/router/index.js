import React from 'react'
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import {get} from 'lodash'
import {Auth} from '@/common/auth'
import routes from '@/router/routes'
import asyncComponent from '@/async-component'
import RouterChecker from '@/components/RouterChecker'
import Home from '@/pages/Home'
const Errors = asyncComponent(() => import('@/pages/Error'))

// 设置meta等信息
const ParseRoute = (rest) => {
  document.title = get(rest, 'meta.title', null) ? rest.meta.title : '保险服务'
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isAuthenticated() ? (
      <Component {...rest} {...props} render={rest = (
        ParseRoute(rest)
      )}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // 嵌套路由(子路由)
    <route.component {...props} routes={route.routes}/>
  )}/>
)

class RouteMap extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      shareUrl: window.location.href.split('#')[0]
    }
  }
  componentDidMount () {}
  render() {
    return (
      <Router>
        <div className="router-wrapper scrollable">
          <Route component={RouterChecker}/>
          <Route exact path="/" component={Home} />
          <Switch>
            {routes.map((route, i) => (
              route.needLogin ? (
                <PrivateRoute exact key={i} {...route}/>
              ) : (
                <RouteWithSubRoutes exact key={i} {...route}/>
              )
            ))}
            <Route component={Errors}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default RouteMap
