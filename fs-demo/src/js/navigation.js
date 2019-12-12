new Vue({
	el: "#navigation",
	data: {
		navList: [{
			title: '首页',
			link: '/'
		}, {
			title: '文章',
			link: '/pages/detail/index.html'
		}, {
			title: '测试demo',
			link: '/pages/test.html'
		}, {
			title: '圣诞节活动',
			link: '/pages/activity/christmas.html'
		}, {
			title: '圣诞节活动H5',
			link: '/pages/activity/christmas-m.html'
		}],
		current: window.location.pathname,
		message: ''
	},
	mounted() {

	}
})