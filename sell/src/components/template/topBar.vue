<template>
    <section class="barWrapper">
        <div class="bar-content">
            <span class="bar-item">注册</span>
            <span class="bar-split"></span>
            <span class="bar-item">登陆</span>
        </div>
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
<style lang="scss" scoped>
    .barWrapper {
        min-width: 1100px;
        height: 30px;
        background: #363B48;
        .bar-content {
            width: 1100px;
            margin: 0 auto;
            height: 30px;
            line-height: 30px;
            text-align: right;
            font-size: 0;
            .bar-item {
                display: inline-block;
                font-size: 13px;
                color: white;
                font-weight: 200;
                cursor: pointer;
            }
            .bar-split {
                display: inline-block;
                width: 1px;
                height: 12px;
                background: white;
                margin-top: 9px;
                margin-left: 10px;
                margin-right: 10px;
                vertical-align: top;
            }
        }
    }
</style>
