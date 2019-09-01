<template>
	<div class="home">
		首页
		<div class="home-box">
			<button class="home-box__button">click1</button>
			<button class="home-box__button button2">click2</button>
			<button class="home-box__button">click3</button>
		</div>
		<navigation></navigation>
		<Menu theme="dark" :open-names="['1']" accordion>
            <MenuItem :name="item.id" v-for="item in list" :key="item.id">
                <Icon type="ios-stats" /> {{item.title}}
        	</MenuItem>
        </Menu>
	</div>
</template>
<script type="text/javascript">
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
			await Navigation.asyncData(store, router)
		},
		methods: {
			fetch() {
				this.list = [{
					title: '托尔斯泰',
					id: '1'
				}]
			}
		},
		mounted() {
			this.fetch()
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