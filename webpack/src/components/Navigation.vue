<template>
	<div class="navigation">
		<div class="navigation-main">
			<span
				class="navigation-main__item"
				v-for="item in navList"
				:key="item.path"
				@click="go(item)"
			>{{item.name}}</span>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				navList: [{
					name: '首页',
					path: 'path'
				}, {
					name: '列表',
					path: 'list'
				}, {
					name: '海报',
					path: 'poster'
				}, {
					name: '关于我们',
					path: 'about'
				}]
			}
		},
		methods: {
			go(item) {
				this.$router.push(item.path)
			}
		},
		mounted() {

		}
	}
</script>
<style lang="scss">
	.navigation{
		width: 100%;
		min-width: 1200px;
		height: 80px;
		background: black;
		&-main{
			width: 1200px;
			height: 80px;
			margin: 0 auto;
			display: flex;
			align-items: center;
			&__item{
				font-size: 20px;
				margin: 0 20px;
				color: #e0dcdc;
				cursor: pointer;
				&:hover{
					color: white;
				}
				&:active{
					color: #e0dcdc;
				}
			}
		}
	}
</style>