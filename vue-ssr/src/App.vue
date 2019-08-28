<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

	export default {
		name: "app",
		// 数据
		data() {
			return {
			}
		},
		// 计算属性
		computed: {

		},
		mounted() {

		},
		// 方法
		methods: {
			test () {

			}
		}
	}
</script>
<!--样式 -->
<style>
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	body{
		background: #eee;
	}

</style>