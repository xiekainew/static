import React from 'react'
import {Redirect} from 'react-router-dom'
import localStorage from '@/common/localstorage'
import {COOKIE, MOCK_USER} from '@/common/const'
import {Auth} from '@/common/auth'
import request from '@/common/request'
import {Button, Input, Toast, Dialog} from 'react-weui'

const password = '111111'

class Login extends React.Component {
  state = {
    defaultView: '/list',
    redirectToReferrer: false,
    showToast: false,
    clientId: '7dd69810-2572-443c-8c7c-0574f30b0587',
    password: '',
    dialogShow: false,
    clientDialogShow: false,
    dialog: {
      title: '登录密码错误',
      buttons: [
        {
          label: '确定',
          onClick: this.hideDialog.bind(this)
        }
      ]
    },
    clientDialog: {
      buttons: [
        {
          label: '确定',
          onClick: () => {
            this.setState({
              clientDialogShow: false
            })
          }
        }
      ]
    }
  }
  componentDidMount () {
    if (Auth.isAuthenticated()) {
      this.props.history.replace(this.state.defaultView)
    }
  }
  componentWillUnmount() {
    this.state.toastTimer && clearTimeout(this.state.toastTimer)
  }
  async login () {
    // mock client
    let params = {
      clientId: this.state.clientId,
      clientSecret: 'client-secret-ml'
    }
    let res = await request.get('/api/v1/client/token/get', {params: params})
    let token = res.data.data

    if (!token) {
      this.setState({
        clientDialogShow: true
      })
      return
    }

    let mockUser = MOCK_USER

    if (this.state.password === password) {
      this.showToast()
      Auth.authenticate(() => {
        localStorage.set(COOKIE.KEY_USER, mockUser, {
          maxAge: COOKIE.MAX_AGE
        })
        localStorage.set(COOKIE.KEY_TOKEN, token, {
          maxAge: COOKIE.MAX_AGE
        })
        // 重置token
        request.defaults.headers.common['Authorization'] = `Bearer ${token}`
        this.setState({redirectToReferrer: true})
      })
    } else {
      this.setState({dialogShow: true})
    }
  }
  showToast() {
    this.setState({showToast: true})
    this.setState({
      toastTimer: setTimeout(()=> {
        this.setState({showToast: false})
      }, 2000)
    })
  }
  hideDialog() {
    this.setState({dialogShow: false});
  }
  clientIdHandele (e) {
    this.setState({
      clientId: e.target.value
    })
  }
  changeHandele (e) {
    this.setState({
      password: e.target.value
    })
  }
  render() {
    const {from} = this.props.location.state || { from: { pathname: '/' } }
    const {redirectToReferrer} = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div className="align-center">
        <p style={{padding: '30px'}}>登录后才能查看 {from.pathname}</p>
        <Input className="align-center"
          type="text"
          style={{paddingBottom: '30px'}}
          placeholder="输入client ID"
          value={this.state.clientId}
          onChange={this.clientIdHandele.bind(this)}/>
        <Input className="align-center"
          type="password"
          style={{paddingBottom: '30px'}}
          autoFocus
          placeholder="输入密码"
          value={this.state.password}
          onChange={this.changeHandele.bind(this)}/>
        <Button type="primary" size="small" plain onClick={this.login.bind(this)}>立即登录</Button>

        <Toast icon="success-no-circle" show={this.state.showToast}>Done</Toast>
        <Dialog type="ios" title={this.state.dialog.title} buttons={this.state.dialog.buttons} show={this.state.dialogShow}>
            请检查输入的账号密码是否
        </Dialog>
        <Dialog type="ios" title="CLIENT信息错误" buttons={this.state.clientDialog.buttons} show={this.state.clientDialogShow}>
            请确认输入的client信息是否有误
        </Dialog>
      </div>
    )
  }
}

export default Login
