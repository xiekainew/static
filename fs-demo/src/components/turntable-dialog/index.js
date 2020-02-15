const TurntableDialog = Vue.extend({
	template: __inline('./template.html'),
	data() {
		return {
			dialogVisible: false
		}
	},
	props: {
		width: String,
		height: String,
		styles: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	computed: {
		style() {
			return Object.assign({
				width: this.width,
				height: this.height
			}, this.styles)
		}
	},
	methods: {
		show() {
			this.dialogVisible = true
		},
		close() {
			this.dialogVisible = false
		}
	}
})