import axios from 'axios'
import config from './config-client.js'

axios.interceptors.request.use(function(config) {
	config.headers['token'] = 'test token'
	return config
}, function(error) {
	return Promise.reject(error)
})

axios.interceptors.response.use(response => {
	return Promise.resolve(response)
}, error => {
	return Promise.reject(error)
})

export default {
	post(url, data) {
		return axios({
			method: 'post',
			url: config.api + url,
			data,
			timeout: config.timeout
		})
	},
	get(url, params) {
		return axios({
			method: 'get',
			url: config.api + url,
			params,
			timeout: config.timeout
		})
	},
	delete(url, data) {
		return axios({
			method: 'delete',
			url: config.api + url,
			data,
			timeout: config.timeout
		})
	},
	put(url, data) {
		return axios({
			method: 'put',
			url: config.api + url,
			data,
			timeout: config.timeout
		})
	}
}