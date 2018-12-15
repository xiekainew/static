/**
 * 用axios来发起http请求
 */
import axios from 'axios'
import localStorage from '@/common/localstorage'
import {COOKIE} from '@/common/const'

let headers = {}
if (localStorage.get(COOKIE.KEY_TOKEN)) {
  headers = {
    'Authorization': `Bearer ${localStorage.get(COOKIE.KEY_TOKEN)}`
  }
}

const instance = axios.create({headers})
instance.interceptors.response.use(response => {
  return response.data
})

export default instance
