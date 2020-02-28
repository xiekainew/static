var combine = Vue.extend({
	template: __inline('./index.html'),
	data() {
		return {
			isShow: false,
			canRoll: false,
			showResult: false,
			s: 30,
			timerDown: null
		}
	},
	props: {

	},
	methods: {
		show() {
			this.isShow = true
		},
		goRoll() {
			this.canRoll = true
			var timer = setTimeout(() => {
				clearTimeout(timer)
				this.canRoll = false
				this.showResult = true
				this.getCardDown()
			}, 900)
		},
		getCardDown() {
			this.timerDown = setTimeout(() => {
				clearTimeout(this.timerDown)
				this.s--
				if (this.s == 0) {
					this.getedCard()
				} else {
					this.getCardDown()
				}
			}, 1000)
		},
		geted() {
			clearTimeout(this.timerDown)
			this.getedCard()
		},
		getedCard() {
			var that = this
			$.ajax({
				url: '/proxy/sports-activity/newYear/synthesis?uid=10002442',
				dataType: 'json',
				success: function(res) {
					if (res.data) {
						that.isShow = false
						that.$emit('change')
					}
				}
			})
			// Axios.get('/sports-activity/newYear/synthesis').then(res => {
			// 	if (res.data) {
			// 		that.isShow = false
			// 		that.$emit('change')
			// 	}
			// })
		}
	},
	mounted() {
		// this.getCardDown()
	}
})