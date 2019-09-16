import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {
	getList
} from '@/api/index'
Vue.use(Vuex)

const state = {
	name: 'vue-ssr',
	menuList: [],
	test: []
}
const mutations = {
	updateList(state, data) {
		console.log(data)
		state.menuList = data
	}
}
const actions = {
	getList({state, commit}, data) {
		return new Promise((resolve, reject) => {
			getList().then(res => {
				console.log('服务端获取数据', res.data)
				commit('updateList', res.data.data || [])
				resolve(res.data)
			}).catch(error => {
				console.log(error)
			})
		})
	}
}


export function createStore() {
	return new Vuex.Store({
		state,
		mutations,
		actions
	})
}