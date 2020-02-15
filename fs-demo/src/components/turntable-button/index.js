const TurntableButton = Vue.extend({
	template: __inline('./template.html'),
	props: {
		width: {
			type: String,
			default: '90px'
		}
	},
	computed: {
		style() {
			return {
				width: this.width
			}
		}
	},
	methods: {
		click() {
			this.$emit('click')
		}
	}
})