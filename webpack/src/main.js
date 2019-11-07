import Vue from 'vue'
import router from '@/router'
import App from '@/app'
import '@/assets/style/reset.css'

new Vue({
	el: "#app",
	router,
	render: h => h(App)
})