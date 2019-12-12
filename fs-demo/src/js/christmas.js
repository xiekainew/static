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
		}
	},
	mounted() {

	}
})