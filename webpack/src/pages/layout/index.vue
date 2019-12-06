<template>
	<div>
		<navigation></navigation>
		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
	import Navigation from '@/components/Navigation'
	export default {
		data() {

		},
		components: {
			Navigation
		}
	}
</script>
<style>
	
</style>