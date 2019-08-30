<template>
	<div class="home">
		首页
		<div class="home-box">
			<button class="home-box__button">click1</button>
			<button class="home-box__button button2">click2</button>
			<button class="home-box__button">click3</button>
		</div>
		<navigation :list="menuList"></navigation>
	</div>
</template>
<script type="text/javascript">
	import {
		getList
	} from '@/api/index'
	// import Vuex from 'vuex'
	import {
        mapState,
        mapGetters
    } from 'vuex'
	import Navigation from '@/pages/layout/navigation'
	export default {
		data() {
			return {
				list: []
			}
		},
		components: {
			Navigation
		},
		async asyncData(store, router) {
			console.log('hollo')
			await store.dispatch('getList')
		},
		computed: {
			// ...mapState({
			// 	menuList: state => state.menuList
			// })
			menuList() {
				return this.$store.state.menuList
			}
		},
		methods: {
			fetch() {
				getList().then(res => {
					this.list = res.data.data
					console.log(this.list)
				})
			}
		},
		mounted() {
			// this.fetch()
		}
	}
</script>
<style lang="scss">
	.home{
		color: red;
		&-box{
			display: flex;
			height: 50px;

			&__button{
				flex: 1;
				outline: none;
			}
			.button2{
				flex: 2;
				background: yellow;
			}
		}
	}
</style>