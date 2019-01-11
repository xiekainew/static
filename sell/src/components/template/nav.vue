<template>
    <section class="">
        <div class="nav-split"></div>
        <div class="nav-wrapper">
            <div class="nav-container">
                <div class="logo">
                    <router-link to="/"></router-link>
                </div>
                <div class="right-box">
                    <span class="nav-item red">首页</span>
                    <span class="nav-item nav-goods">
                    产品
                    <div class="goods-wrapper">
                        <div class="title">基础服务</div>
                        <div class="desc desc1">常年法律顾问</div>
                        <div class="title">专项产品</div>
                        <div class="desc desc2">劳动用工全无忧</div>
                        <div class="desc desc2">企业债务方向</div>
                        <div class="desc desc2">企业合同方向</div>
                        <div class="desc desc2">创业公司方向</div>
                        <div class="desc desc2">私募基金方向</div>
                        <div class="desc desc2">企业股权方向</div>
                        <div class="desc desc2">企业财税方向</div>
                    </div>
                </span>
                    <span class="nav-item">律师服务</span>
                    <span class="nav-item">关于我们</span>
                    <span class="nav-item nav-tel">010-51077205</span>
                </div>


            </div>
        </div>

    </section>
</template>
<script type="text/ecmascript-6">

    export default({
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            scroll() {
                let navSplit = document.getElementsByClassName('nav-split')[0];
                let wrapper = document.getElementsByClassName('nav-wrapper')[0];
                window.onscroll = function (e) {
                    let t = document.documentElement.scrollTop || document.body.scrollTop;
                    if (t > 116) {
                        navSplit.className = 'nav-split show';
                        wrapper.className = 'fixed nav-wrapper';
                    } else if (t < 30) {
                        navSplit.className = 'nav-split';
                        wrapper.className = 'nav-wrapper';
                    }
                };
            }
        },
        mounted() {
            this.scroll();
        }
    });
</script>
<style lang="scss" scoped>
    .nav-split {
        width: 100%;
        height: 0px;
    }

    .nav-split.show {
        height: 84px;
    }

    .nav-wrapper.fixed {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 999;
        -webkit-animation: showNav0 0.5s ease-in-out;
        -o-animation: showNav0 0.5s ease-in-out;
        animation: showNav0 0.5s ease-in-out;
        .nav-container {
            -webkit-animation: showNav 0.5s ease-in-out;
            -o-animation: showNav 0.5s ease-in-out;
            animation: showNav 0.5s ease-in-out;
        }

    }

    .nav-wrapper {
        background: white;
        padding: 22px 0;
        border-bottom: 1px solid #eee;
        .nav-container {
            width: 1100px;
            margin: 0 auto;
            font-size: 0;
            .logo {
                display: inline-block;
                width: 19%;
                height: 40px;
                vertical-align: top;
                font-size: 20px;
                background: url('../../../static/newlogo.png') no-repeat;
                background-size: cover;
                background-position: center center;
                cursor: pointer;
                a {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                }
            }
            .right-box {
                display: inline-block;
                width: 81%;
                height: 40px;
                text-align: right;
                .nav-item {
                    display: inline-block;
                    font-size: 16px;
                    font-family: PingFangSC-Regular;
                    color: #555555;
                    padding: 11px 30px 0;
                    cursor: pointer;
                    position: relative;
                    .goods-wrapper {
                        display: none;
                        position: absolute;
                        left: 0;
                        top: 62px;
                        width: 200px;
                        min-height: 100px;
                        background: white;
                        z-index: 99;
                        border-radius: 0 0 2px 2px;
                        text-align: left;
                        padding-bottom: 10px;

                        .title {
                            color: #999999;
                            font-size: 12px;
                            padding: 10px 12px 6px;
                        }
                        .desc {
                            color: #555555;
                            font-size: 14px;
                        }
                        .desc:hover {
                            background: #F65457;
                            color: white;
                        }
                        .desc1 {
                            padding: 8px 12px;
                            border-bottom: 2px solid #EEEEEE;
                            margin-bottom: 3px;
                        }
                        .desc2 {
                            padding: 8px 12px;
                        }
                    }
                }
                .nav-item.red {
                    color: #F65457;
                }
                .nav-item:hover {
                    color: #F65457;
                }
                .nav-item:last-child {
                    padding-right: 0;
                }
                .nav-goods {
                    padding-bottom: 37px;
                }
                .nav-goods:hover {
                    .goods-wrapper {
                        display: inline-block;
                    }
                }
                .nav-tel {
                    position: relative;
                    margin-left: 15px;
                }
                .nav-tel:after {
                    content: '';
                    position: absolute;
                    left: 0px;
                    top: 10px;
                    width: 17px;
                    height: 17px;
                    background: url('../../../static/image/dianhua2@3x.png') no-repeat;
                    background-size: cover;
                    background-position: center center;

                }
            }
        }
    }

    @keyframes showNav0 {
        0% {
            -webkit-transform: translate3d(0, -85px, 0);
            -moz-transform: translate3d(0, -85px, 0);
            -ms-transform: translate3d(0, -85px, 0);
            -o-transform: translate3d(0, -85px, 0);
            transform: translate3d(0, -85px, 0);
        }
        100% {
            -webkit-transform: translate3d(0, 0, 0);
            -moz-transform: translate3d(0, 0, 0);
            -ms-transform: translate3d(0, 0, 0);
            -o-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes showNav {
        0% {
            -webkit-transform: translate3d(0, 0, 0) scale(0.2);
            -moz-transform: translate3d(0, 0, 0) scale(0.2);
            -ms-transform: translate3d(0, 0, 0) scale(0.2);
            -o-transform: translate3d(0, 0, 0) scale(0.2);
            transform: translate3d(0, 0, 0) scale(0.2);
        }
        100% {
            -webkit-transform: translate3d(0, 0, 0) scale(1);
            -moz-transform: translate3d(0, 0, 0) scale(1);
            -ms-transform: translate3d(0, 0, 0) scale(1);
            -o-transform: translate3d(0, 0, 0) scale(1);
            transform: translate3d(0, 0, 0) scale(1);
        }
    }
</style>
