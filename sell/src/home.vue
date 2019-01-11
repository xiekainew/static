<template>
    <section>
        <transition name="move"  mode="out-in"  :appear="true">
            <!--<keep-alive>-->
                <router-view ></router-view>
            <!--</keep-alive>-->
        </transition>

    </section>
</template>
<script type="text/ecmascript-6">
	export default({
		data() {
			return {};
		},
		methods: {},
		mounted() {

		}
	});
</script>
<style lang="scss" >
body,html{
    background:#ccc;
    width: 100%;
    height: 100%;
}
section{
    width: 100%;
    height: 100%;
}
    /*.move-enter{*/
        /*opacity:0;*/
        /*transform:translate3d(100%,0,0);*/
    /*}*/
    /*.move-enter-active{*/
        /*transition:all 0.3s ease-in-out;*/
    /*}*/
</style>
