<template>
    <section class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar"/>
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达



                </div>
                <div v-if="seller.supports" class="supports">
                    <div class="icons " :class="classMap[seller.supports[0].type]"></div>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click.stop='showDetail'>
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click.stop='showDetail'>
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img width="100%" height="100%" :src="seller.avatar"/>
        </div>

        <transition name="detail" tag="div">
            <div v-show="detailShow" class="detail" ref="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="supports-item" v-for="(item,index) in seller.supports">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click.stop="showDetail">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>

    </section>
</template>

<script>
    import star from '../star/star.vue';
    import BScroll from 'better-scroll';
    export default{
        props: {
            seller: {
                type: Object
            },
            msg: {}
        },
        components: {
            star
        },
        data() {
            return {
                detailShow: false,
                scroll: null
            };
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        methods: {
            showDetail: function () {
                this.detailShow = !this.detailShow;
//                this.$nextTick(() => {
//                    this._initScroll();
//                });
            },
            _initScroll() {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.detail, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            }
        },
        mounted() {

        }
    };
</script>

<style lang="scss" scoped>
    .header {
        background: rgba(7, 17, 27, .5);
        color: #fff;
        position: relative;
        overflow: hidden;
        .content-wrapper {
            padding: 24px 12px 18px 24px;
            font-size: 0;
            position: relative;
            .avatar {
                display: inline-block;
                font-size: 14px;
                vertical-align: top;
                img {
                    border-radius: 2px;
                }
            }
            .content {
                display: inline-block;
                font-size: 14px;
                margin-left: 16px;
                .title {
                    margin: 2px 0 8px 0;
                    .brand {
                        width: 30px;
                        height: 18px;
                        display: inline-block;
                        background-image: url(img/brand@2x.png);
                        background-repeat: no-repeat;
                        background-size: contain;
                        vertical-align: top;
                    }
                    .name {
                        font-size: 16px;
                        line-height: 16px;
                        margin-left: 6px;
                        font-weight: bold;
                    }
                }
                .description {
                    margin-bottom: 10px;
                    line-height: 12px;
                    font-size: 12px;
                }
                .supports {
                    .icons {
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                        vertical-align: middle;
                    }
                    .icons.decrease {
                        background-image: url(img/decrease_1@3x.png);
                    }
                    .icons.discount {
                        background-image: url(img/discount_1@3x.png);
                    }
                    .icons.guarantee {
                        background-image: url(img/guarantee_1@3x.png);
                    }
                    .icons.invoice {
                        background-image: url(img/invoice_1@3x.png);
                    }
                    .icons.special {
                        background-image: url(img/special_1@3x.png);
                    }
                    .text {
                        line-height: 12px;
                        display: inline-block;
                        font-size: 10px;

                    }
                }
            }
            .support-count {
                position: absolute;
                right: 12px;
                bottom: 16px;
                padding: 0 8px;
                line-height: 24px;
                height: 24px;
                border-radius: 14px;
                background: rgba(255, 255, 255, 0.2);
                text-align: center;
                .count {
                    display: inline-block;
                    font-size: 10px;
                    vertical-align: top;
                    line-height: 24px;
                    padding-top: 1px;
                }
                .icon-keyboard_arrow_right {
                    font-size: 10px;
                    line-height: 24px;
                    margin-left: 2px;
                }
            }
        }
        .bulletin-wrapper {
            height: 28px;
            line-height: 28px;
            padding: 0px 22px 0 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            position: relative;
            background: rgba(7, 17, 27, .2);
            .bulletin-title {
                display: inline-block;
                width: 22px;
                height: 12px;
                background-image: url('img/bulletin@3x.png');
                background-size: 22px 12px;
                background-repeat: no-repeat;
                vertical-align: top;
                margin-top: 8px;
            }
            .bulletin-text {
                font-size: 10px;
                margin-left: 4px;
                vertical-align: top;
                line-height: 31px;
            }
            .icon-keyboard_arrow_right {
                font-size: 10px;
                position: absolute;
                right: 12px;
                top: 9px;
            }
        }
        .background {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            filter: blur(10px);
        }
        .detail {
            position: fixed;
            z-index: 99;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background: rgba(7, 17, 27, .8);
            /*backdrop-filter:blur(10px);*/
            .detail-wrapper {
                min-height: 100%;
                width: 100%;
                .detail-main {
                    margin-top: 64px;
                    padding-bottom: 64px;
                    .name {
                        line-height: 16px;
                        text-align: center;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    .star-wrapper {
                        margin-top: 18px;
                        padding: 2px 0;
                        text-align: center;
                    }
                    .title {
                        display: flex;
                        width: 80%;
                        margin: 28px auto 24px;
                        .line {
                            flex: 1;
                            position: relative;
                            top: -6px;
                            border-bottom: 1px solid rgba(255, 255, 255, .2);
                        }
                        .text {
                            padding: 0 12px;
                            font-size: 14px;
                            font-weight: 700;
                        }
                    }
                    .supports {
                        width: 80%;
                        margin: 0 auto;
                        .supports-item {
                            padding: 0 12px;
                            margin-bottom: 12px;
                            font-size: 0;
                            .icon {
                                display: inline-block;
                                width: 16px;
                                height: 16px;
                                vertical-align: top;
                                margin-right: 6px;
                                background-repeat: no-repeat;
                                background-size: 16px 16px;
                            }
                            .icon.decrease {
                                background-image: url(img/decrease_1@3x.png);
                            }
                            .icon.discount {
                                background-image: url(img/discount_1@3x.png);
                            }
                            .icon.guarantee {
                                background-image: url(img/guarantee_1@3x.png);
                            }
                            .icon.invoice {
                                background-image: url(img/invoice_1@3x.png);
                            }
                            .icon.special {
                                background-image: url(img/special_1@3x.png);
                            }
                            .text {
                                line-height: 16px;
                                font-size: 12px;
                            }
                        }
                        .supports-item:last-child {
                            margin-bottom: 0;
                        }
                    }
                    .bulletin {
                        width: 80%;
                        margin: 0 auto;
                        .content {
                            padding: 0 12px;
                            line-height: 24px;
                            font-size: 12px;
                        }
                    }
                }
            }
            .detail-close {
                position: relative;
                width: 32px;
                height: 32px;
                margin: -64px auto 0 auto;
                clear: both;
                font-size: 32px;
                .icon-close {

                }
            }
        }
    }

    .detail-enter, .detail-leave-to {
        opacity: 0;
        transform: translate3d(0, -100px, 0);
    }

    .detail-enter-active, .detail-leave-active {
        transition: all 0.3s;
    }


</style>
