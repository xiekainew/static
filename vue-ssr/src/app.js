import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import { createRouter } from './route/index.js'
import { createStore } from './store/index.js'
import iView from 'iview'

import 'iview/dist/styles/iview.css'
import '@/assets/style/index.css'

Vue.use(iView)

Vue.config.devtools = true

const router = createRouter()
const store = createStore()

sync(store, router)

const app = new Vue({
	router,
	store,
	render: h => h(App)
})

// console.log(_.camelCase('Foo Bar'))
// axios.get('aaa')

export {app, router, store}