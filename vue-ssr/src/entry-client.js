import Vue from 'vue'
import { app, router, store } from './app.js'

Vue.mixin({
	beforeRouteEnter (to, from, next) {
		console.log('beforeRouteEnter')
		next((vm) => {
			const { asyncData } = vm.$options
			if (asyncData) {
				asyncData(vm.$store, vm.$router).then(next).catch(next)
			} else {
				next()
			}
		})
	}
})

if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
	app.$mount('#app')
})