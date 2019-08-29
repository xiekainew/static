import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import { createRouter } from './route/index.js'
import { createStore } from './store/index.js'
import axios from 'axios'
import _ from 'lodash'

// import '../assets/style/index.css'

const router = createRouter()
const store = createStore()

sync(store, router)

const app = new Vue({
	router,
	store,
	render: h => h(App)
})

console.log(_.camelCase('Foo Bar'))
axios.get('aaa')

export {app, router, store}