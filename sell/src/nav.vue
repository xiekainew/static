<template>
    <section class="wrapper">
        <router-link to="/Goods">饿了么</router-link>
        <router-link to="/wuziqi">五子棋</router-link>
        <router-link to="/xn">官网</router-link>
        <router-link to="/one">H5</router-link>
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
<style lang="scss">

    .wrapper {
        background: #f0f0f0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        padding:20px;
        a {
            display: block;
            padding: 10px 0px;
            background: #13ce66;
            border-radius: 4px;
            text-align:center;
            color:white;
            margin-bottom:20px;
        }
        a:last-child{
            margin-bottom:0;
        }
    }
</style>
