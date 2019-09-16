import axios from 'axios'
import config from './config-server.js'

export default {
	api: null,
	setCookie(value, userAgent) {
		this.api = axios.create({
			baseURL: config.api,
			timeout: config.timeout
		})
	},
	post(url, data) {
		if (!this.api) this.setCookie()
		return this.api({
			method: 'post',
			url,
			data
		})
	},
	get(url, params) {
		if (!this.api) this.setCookie()
		return this.api({
			method: 'get',
			url,
			params
		})
	},
	put(url, data) {
		if (!this.api) this.setCookie()
		return this.api({
			method: 'put',
			url,
			data
		})
	},
	delete(url, params) {
		if (!this.api) this.setCookie()
		return this.api({
			method: 'delete',
			url,
			params
		})
	}
}