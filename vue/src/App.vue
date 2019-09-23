<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <!-- <home></home> -->
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import Home from '@/pages/home/home'

    export default {
        name: 'app',
        components: {
            HelloWorld,
            Home
        }
    }
</script>

<style>
    *{
        margin: 0;
        padding: 0;
    }
</style>
