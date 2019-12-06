<template>
	<div class="poster">
		<h1>海报页</h1>
		<h1>海报页</h1>
		<div class="poster-main"></div>
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
	.poster{
		background: #f2f2f2;
		width: 1200px;
		height: 100%;
		margin: 0 auto;
		&-main{
			height: 500px;
			background: rgba(0,255,0,.1);
			border-radius: 20px;
		}
	}
</style>
