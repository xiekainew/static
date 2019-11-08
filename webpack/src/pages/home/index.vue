<template>
	<div class="home">
		<h1>首页</h1>
		<ul>
			<li><router-link to="/detail"><el-button>详情页</el-button></router-link></li>
			<li><router-link to="/list"><el-button>列表页</el-button></router-link></li>
			<li><router-link to="/poster"><el-button>宣传页</el-button></router-link></li>
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