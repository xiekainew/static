__inline('./combine/index.js')
var foca = Vue.extend({
	template: __inline('./template-foca.html'),
	data() {
		return {
			isCanCollected: false,
			mockList: [],
			cardList: [],
			collectedNum: 0,
			money: 0,
			showCardList: false,
			showMoney: false,
			showWait: false,
			isCanAward: new Date().getTime() < 1579870680000
		}
	},
	components: {
		combine
	},
	methods: {
		checkStatus() {
			var that = this
			$.ajax({
				url: '/proxy/sports-activity/newYear/cards?uid=10002442',
				dataType: 'json',
				success: function(res) {
					console.log(res)
					that.mockList = res.data.cardSendRecords || []
					that.cardList = res.data.cartNumDTOList || []
					that.collectedNum = res.data.collectedNum
					that.money = res.data.money
					that.isCanCollected = res.data.cartNumDTOList && res.data.cartNumDTOList.every(item => {
						return item.num > 0
					})
					that.$nextTick(() => {
						that.initSwipper()
					})
					if (res.data.out) {
						that.showMoney = true
						that.showCardList = false
						return
					}
					if (res.data.collected) {
						that.showCardList = false
						that.showWait = true
					}
				}
			})
		},
		initSwipper() {
			new Swiper('.swiper-container', {
				autoplay: true,//可选选项，自动滑动
				direction : 'vertical',
			})
		},
		change() {

		},
		queryMoney() {
			console.log('查看余额')
		},
		goCombineFoca() {
			var that = this
			if (this.showWait) {
				if (!this.isCanAward) return
				$.ajax({
					url: '/proxy/sports-activity/newYear/out?uid=10002442',
					dataType: 'json',
					success: function(res) {
						if (res.code === 0) {
							that.showWait = false
							that.showMoney = true
							that.money = res.data
						}
					}
				})
				return
			}
			if (!this.isCanCollected) return
			this.$refs.combine.show()
		}
	},
	mounted() {
		this.checkStatus()
		// this.$refs.combine.show()
	}
})

new foca().$mount('#foca')