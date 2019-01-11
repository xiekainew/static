<template>
    <transition name="food">
        <div v-show="showflag" class="food" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image"/>
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">¥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food" @cartAdd="cartAddTo"></cartcontrol>
                    </div>
                    <transition name="buy">
                        <div class="buy" v-show="!food.count || food.count === 0" @click.stop="addFirst($event)">加入购物车


                        </div>
                    </transition>
                </div>
                <split v-if="food.info"></split>
                <div class="info" v-if="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect @ratingtype="ratingType" @onlycontent="onlycontent" :ratings="food.ratings"
                                  :selectType="selectType"
                                  :onlyContent="onlyContent" :desc="desc"></ratingselect>
                    <div class="rating-wrapper">
                        <ul v-if="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                                class="rating-item border-1 border-1px">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img :src="rating.avatar" class="avatar" width="12" height="12"/>
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span :class="rating.rateType===0 ?'icon-thumb_up' : 'icon-thumb_down'"></span>
                                    {{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-if="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>

        </div>
    </transition>

</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import cartcontrol from '../cartcontrol/cartcontrol.vue';
    import split from 'components/split/split';
    import ratingselect from 'components/ratingselect/ratingselect';
    import {formatDate} from '../../common/js/date';
    //    const NEGATIVE = 1;
    const ALL = 2;
    export default({
        data() {
            return {
                showflag: false,
                selectType: ALL,
                onlyContent: false,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
        },
        props: {
            food: {
                type: Object
            }
        },
        components: {
            cartcontrol,
            split,
            ratingselect
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        methods: {
            show() {
                this.selectType = ALL;
                this.onlyContent = false;
                this.showflag = !this.showflag;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            hide() {
                this.showflag = !this.showflag;
            },
            addFirst(event) {
                if (!event._constructed) {
                    return;
                }
                this.$set(this.food, 'count', 1);
                this.$emit('cartAdd2', event.target);
            },
            cartAddTo(target) {
                this.$emit('cartAdd3', target);
            },
            ratingType(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            onlycontent(type) {
                this.onlyContent = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            }
        },
        mounted() {

        }
    });
</script>
<style lang="scss" scoped>
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 8;
        width: 100%;
        background: white;

        .food-content {
            .image-header {
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 100%;
                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                .back {
                    position: absolute;
                    top: 10px;
                    left: 0;
                    .icon-arrow_lift {
                        display: block;
                        padding: 10px;
                        font-size: 20px;
                        color: white;
                    }
                }
            }
            .content {
                padding: 18px;
                position: relative;
                .title {
                    line-height: 14px;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(7, 17, 27);
                }
                .detail {
                    margin-bottom: 18px;
                    line-height: 10px;
                    font-size: 0;
                    height: 10px;
                    .sell-count, .rating {
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .sell-count {
                        margin-right: 12px;
                    }
                }
                .price {
                    line-height: 28px;
                    font-size: 0;
                    .now {
                        font-size: 14px;
                        font-weight: 700;
                        color: rgb(240, 20, 20);
                        margin-right: 12px;
                    }
                    .old {
                        font-size: 10px;
                        font-weight: 700;
                        color: rgb(147, 153, 159);
                    }
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    right: 12px;
                    bottom: 12px;
                }
                .buy {
                    position: absolute;
                    right: 18px;
                    bottom: 18px;
                    z-index: 10;
                    height: 24px;
                    line-height: 24px;
                    padding: 0 12px;
                    box-sizing: border-box;
                    font-size: 10px;
                    border-radius: 12px;
                    color: white;
                    background: rgb(0, 160, 220);
                }

            }
            .info {
                padding: 10px;
                .title {
                    line-height: 14px;
                    margin-bottom: 6px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .text {
                    color: rgb(77, 85, 93);
                    padding: 0 8px;
                    font-size: 12px;
                    line-height: 24px;
                }
            }
            .rating {
                padding-top: 18px;
                .title {
                    line-height: 14px;
                    margin-left: 18px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .rating-wrapper {
                    padding: 0 18px;
                    .rating-item {
                        position: relative;
                        padding: 16px 0;
                        .user {
                            position: absolute;
                            right: 0;
                            top: 16px;
                            font-size: 0;
                            line-height: 12px;
                            .name {
                                color: rgb(147, 153, 159);
                                display: inline-block;
                                vertical-align: top;
                                margin-right: 6px;
                                font-size: 10px;
                            }
                            .avatar {
                                border-radius: 50%;
                            }
                        }
                        .time {
                            margin-bottom: 6px;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(147, 153, 159);

                        }
                        .text {
                            line-height: 16px;
                            font-size: 12px;
                            color: rgb(7, 17, 27);
                            .icon-thumb_up, .icon-thumb_down {
                                line-height: 16px;
                                margin-right: 4px;
                                font-size: 12px;
                            }
                            .icon-thumb_up {
                                color: rgb(0, 160, 220);
                            }
                            .icon-thumb_down {
                                color: rgb(147, 153, 159);
                            }
                        }
                    }
                    .no-rating {
                        padding: 16px 0;
                        font-size: 12px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
    }

    .food-enter, .food-leave-to {
        /*opacity:0;*/
        transform: translate3d(100%, 0, 0);
    }

    .food-enter-active, .food-leave-active {
        transition: all 0.3s linear;
    }

    .buy-enter, .buy-leave-to {
        opacity: 0;
    }

    .buy-enter-active, .buy-leave-active {
        transition: all 0.3s linear;
    }
</style>
