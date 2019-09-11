<template>
	<div class="">
		详情页
	</div>
</template>
<script type="text/javascript">
	import getV, {
		isPhone,
		isString,
		isNumber,
		isObject
	} from '@/common/utils'

	// import getTest, {
	// 	test
	// } from '@/common/test'

	import * as test from '@/common/test'

	import { default as default2 } from '@/common/test'
	import { test as test2 } from '@/common/test'

	export default {
		data() {
			return {

			}
		},
		async asyncData(store, router) {
			// console.log(router)
		},
		methods: {

		},
		mounted() {
			// console.log('isPhone', isPhone(15567656783))
			// console.log('isString', isString('23'))
			// console.log('isNumber', isNumber('23'))
			// console.log('isObject', isObject({}))
			// console.log(getV())

			// console.log(test.default())
			// // console.log(getTest())
			// console.log(test2())
		}
	}

</script>
