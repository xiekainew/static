import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import { createRouter } from './route/index.js'
import { createStore } from './store/index.js'

const router = createRouter()
const store = createStore()

sync(store, router)

const app = new Vue({
	router,
	store,
	render: h => h(App)
})

export {app, router, store}