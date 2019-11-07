<template>
	<div class="home">
		<h1>首页</h1>
		<ul>
			<li><router-link to="/detail">详情页</router-link></li>
			<li><router-link to="/list">列表页</router-link></li>
			<li><router-link to="/poster">宣传页</router-link></li>
		</ul>
	</div>
</template>
<script type="text/javascript">

	export default {
		data() {
			return {

			}
		}
	}
</script>
<style lang="scss">
	.home{
		h1{
			font-size: 20px;
		}
	}
</style>