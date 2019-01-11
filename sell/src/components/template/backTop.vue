<template>
    <section class="back-wrapper" @click='backTop' ref="back">
        <i class="el-icon-arrow-up"></i>
    </section>
</template>
<script type="text/ecmascript-6">
    import jump from 'jump.js';
    export default({
        data() {
            return {};
        },
        methods: {
            scroll() {
                let that = this;
                window.onscroll = function (e) {
                    let t = document.documentElement.scrollTop || document.body.scrollTop;
                    if (t > 500) {
                        that.$refs.back.className = 'back-wrapper show';
                    } else {
                        that.$refs.back.className = 'back-wrapper ';
                    }
                };
            },
            backTop() {
                let t = document.documentElement.scrollTop || document.body.scrollTop;
                jump(-t);
            }
        },
        mounted() {
            this.scroll();
        }
    });
</script>
<style lang="scss" scoped>
    .back-wrapper {
        position: fixed;
        right: 20px;
        bottom: 30px;
        width: 50px;
        height: 50px;
        border-radius: 4px;
        background: rgba(0, 0, 0, .8);
        z-index: 21;
        cursor: pointer;
        text-align: center;
        line-height: 50px;
        -webkit-transform: translate3d(0, -40px, 0);
        -moz-transform: translate3d(0, -40px, 0);
        -ms-transform: translate3d(0, -40px, 0);
        -o-transform: translate3d(0, -40px, 0);
        transform: translate3d(0, -40px, 0);
        -webkit-transition: all 0.3s linear;
        -moz-transition: all 0.3s linear;
        -ms-transition: all 0.3s linear;
        -o-transition: all 0.3s linear;
        transition: all 0.3s linear;
        opacity: 0;
        i {
            color: white;
            font-size: 21px;
        }
    }

    .back-wrapper.show {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }

</style>
