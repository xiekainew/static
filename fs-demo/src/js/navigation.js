new Vue({
	el: "#navigation",
	data: {
		navList: [{
			title: '首页',
			link: '/'
		}, {
			title: '文章',
			link: '/pages/detail/index.html'
		}],
		current: window.location.pathname,
		message: ''
	},
	mounted() {

	}
})