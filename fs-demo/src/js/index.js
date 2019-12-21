__inline('../components/v-content/index.js')
new Vue({
	el: '#index',
	data: {
		list: []
	},
	components: {
		vContent
	},
	methods: {
		fetchList() {
			Axios.get('http://39.106.168.120:2002/api/blog/list').then(res => {
				this.list = res.data || []
			})
		}
	},
	mounted() {
		this.fetchList()
		console.log(1)
	}
})