import Vue from 'vue'
import App from './App.vue'

console.log(PRODUCTION)

new Vue({
	render: h => h(App)
}).$mount('#app')