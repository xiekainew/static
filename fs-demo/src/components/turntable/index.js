__inline('../turntable-button/index.js')
__inline('../turntable-dialog/index.js')
const turntable = Vue.extend({
	template: __inline('./template.html'),
	data() {
		return{
			lotteryType: [{
				label: '青铜转盘',
				id: '3'
			}, {
				label: '白银转盘',
				id: '2'
			}, {
				label: '黄金转盘',
				id: '1'
			}],
			selected: '3',
			giftList: [{
				name: '城堡X1',
				id: 1
			}, {
				name: '小鸡破蛋X1',
				id: 2
			}, {
				name: '啤酒X1',
				id: 3
			}, {
				name: 'MVPX1',
				id: 4
			}, {
				name: '小鸡破蛋X1',
				id: 5
			}, {
				name: '啤酒X1',
				id: 6
			}, {
				name: 'MVPX1',
				id: 7
			}, {
				name: '城堡X1',
				id: 8
			}],
			rotate: 0,
			deg: 0,
			rotateMap: {
				1: 22.5,
				2: 22.5 * 3,
				3: 22.5 * 5,
				4: 22.5 * 7,
				5: 22.5 * 9,
				6: 22.5 * 11,
				7: 22.5 * 13,
				8: 22.5 * 15
			},
			isRotate: false,
			key: 1,
			number: '',
			styles: {
				'min-height': '211px'
			}
		}
	},
	components: {
		TurntableDialog,
		TurntableButton
	},
	computed: {
		style() {
			return {
				transform: 'rotate('+ (this.rotate) +'deg)'
			}
		}
	},
	methods: {
		batch() {
			this.$refs.batch.show()
		},
		drowHistory() {
			console.log(2)
		},
		clickType(item) {
			this.selected = item.id
		},
		play(s) {
			this.rotate = (this.deg * 360) + (720 + this.rotateMap[s])
		},
		transitionend() {
			this.deg = parseInt(this.rotate / 360)
			this.isRotate = false
		},
		goDraw() {
			if (this.isRotate) return
			this.isRotate = true
			var s = parseInt(Math.random() * 10 * 0.8 + 1)
			this.play(s)
		},
		confirmBatch() {
			console.log(this.number)
		},
		confirmNone() {
			this.$refs.batch.close()
		}
	},
	mounted() {
		// this.$refs.result.show()
	}
})