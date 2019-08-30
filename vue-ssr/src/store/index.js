import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {
	getList
} from '@/api/index'
Vue.use(Vuex)

const state = {
	name: 'vue-ssr',
	menuList: []
}
const mutations = {
	updateList(state, data) {
		state.menuList = data
	}
}
const actions = {
	getList({state, commit}, data) {
		console.log('服务端获取数据')
		return new Promise((resolve, reject) => {
			getList().then(res => {
				commit('updateList', res.data.data)
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