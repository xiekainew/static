'use strict'
import routes from './routes.js'
Vue.use(VueRouter)

export default new VueRouter({
	mode: 'history',
	scrollBehavior: () => ({y: 0}),
	routes
})