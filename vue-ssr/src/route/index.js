import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/home/index.vue'
import Detail from '../pages/detail/index.vue'

Vue.use(Router)

export function createRouter() {
	return new Router({
		mode: 'history', // ssr必须使用history模式
		scrollBehavior: () => {y: 0},
		routes: [{
			path: '/',
			component: Home
		}, {
			path: '/detail',
			component: Detail
		}]
	})
}