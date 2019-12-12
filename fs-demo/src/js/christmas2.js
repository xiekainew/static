new Vue({
	el: '#christmas',
	data: {
		isRule: false,
		isAward: false
	},
	methods: {
		openRule() {
			this.isRule = true
		},
		openAward() {
			this.isAward = true
		},
		closeRule() {
			this.isRule = false
		},
		closeAward() {
			this.isAward = false
		},
		fetchList() {
			Axios.get('http://test.www.zhuafan.live/sports-activity/christmas/rank', {
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			}).then(res => {
				console.log(res)
			}).catch(err => {
				console.log(err)
			})

		}
	},
	mounted() {
		// this.fetchList()
		console.log(1)
		try{
			var utm = JSON.parse(null)
		} catch(err) {
			console.log(err)
			return
		}
		console.log(2)
	}
})