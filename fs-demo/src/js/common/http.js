'use strict';

(function() {
	axios.interceptors.request.use(config => {
		return config
	}, err => {
		return Promise.reject(err)
	})

	axios.interceptors.response.use(response => {
		return response.data
	}, err => {
		return Promise.reject(err)
	})

	window.Axios = axios
})()