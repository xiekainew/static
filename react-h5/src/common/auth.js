// auth
import localStorage from '@/common/localstorage'
import {COOKIE, MOCK_USER, MOCK_TOKEN} from '@/common/const'
import request from '@/common/request'

const isLogin = () => {
  if (window.location.host === 'ish5.newbanker.cn') {
    localStorage.set(COOKIE.KEY_USER, MOCK_USER, {
      maxAge: COOKIE.MAX_AGE
    })
    localStorage.set(COOKIE.KEY_TOKEN, MOCK_TOKEN, {
      maxAge: COOKIE.MAX_AGE
    })
    request.defaults.headers.common['Authorization'] = `Bearer ${MOCK_TOKEN}`
    return true
  }
  return !localStorage.get(COOKIE.KEY_TOKEN) ? true : false
}
const logout = () => {
  localStorage.remove(COOKIE.KEY_TOKEN)
  localStorage.remove(COOKIE.KEY_USER)
}

export const Auth = {
  isAuthenticated: isLogin,
  authenticate (cb) {
    // this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout (cb) {
    logout()
    // this.isAuthenticated = false
    setTimeout(cb, 100)
  },
  user () {
    return localStorage.get(COOKIE.KEY_USER)
  },
  token () {
    return localStorage.get(COOKIE.KEY_TOKEN)
  }
}
