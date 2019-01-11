<template>
    <section class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="totalCount > 0 ? 'highlight':''">
                        <span class="icon-shopping_cart"></span>
                    </div>
                    <div class="num" v-show="totalCount">{{totalCount}}</div>
                </div>
                <div class="price" :class="{highlight:totalPrice > 0}">¥{{totalPrice}}</div>
                <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">{{payDesc}}


                </div>
            </div>
            <div class="ball-container">
                <transition-group
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter"
                    name="drop">
                    <div class="ball" v-for="ball in balls" v-show="ball.show" :key="ball">
                        <div class="inner inner-hook">

                        </div>
                    </div>
                </transition-group>
            </div>
            <transition name="bounce">
                <div class="shopcart-list" @click.stop v-show="listshow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click.stop="emptyFoods">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <transition-group name="foods"  tag="p">
                                <li class="food border-1 border-1px" v-for="food in selectFoods" :key="food">
                                    <div class="name">{{food.name}}</div>
                                    <div class="price">
                                        <span>¥{{food.price * food.count}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol @cartAdd='cartAdd2' :food="food"></cartcontrol>
                                    </div>
                                </li>
                            </transition-group>

                        </ul>
                    </div>
                </div>
            </transition>

        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import cartcontrol from '../cartcontrol/cartcontrol.vue';
    import BScroll from 'better-scroll';
    export default({
        data() {
            return {
                balls: [
                    {
                        show: false
                    }, {
                        show: false
                    }, {
                        show: false
                    }, {
                        show: false
                    }, {
                        show: false
                    }, {
                        show: false
                    }, {
                        show: false
                    }, {
                        show: false
                    }, {
                        show: false
                    }
                ],
                dropBalls: [],
                fold: true
            };
        },
        components: {
            cartcontrol
        },
        props: {
            deliveryPrice: {},
            minPrice: {},
            selectFoods: {
                type: Array,
                default() {
                    return [
                        {
                            price: 10,
                            count: 2
                        }
                    ];
                }
            }
        },
//        props: [
//        	'deliveryPrice',
//            'minPrice',
//            'selectFoods'
//        ],
        computed: {
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
                return total;
            },
            totalCount() {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return `¥${this.minPrice}元起送`;
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差¥${diff}元起送`;
                } else {
                    return '去结算';
                }
            },
            payClass() {
                if (this.totalPrice < this.minPrice) {
                    return 'not-enough';
                } else {
                    return 'enough';
                }
            },
            listshow() {
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            }
        },
        methods: {
            drop(el) {
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },
            beforeEnter(el) {
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect();
                        let x = rect.left - 32;
                        let y = -(window.innerHeight - rect.top - 22);
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                        el.style.transform = `translate3d(0,${y}px,0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.transform = `translate3d(${x}px,0,0)`;
                    }
                }
            },
            enter(el) {
                /* eslint-disable no-unused-vars */
                let rf = el.offestHeight;
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0,0,0)';
                    el.style.transform = 'translate3d(0,0,0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                });
            },
            afterEnter(el) {
                let ball = this.dropBalls.shift();
                if (ball) {
                    ball.show = false;
                    el.style.display = 'none';
                }
            },
            toggleList() {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            emptyFoods() {
                this.selectFoods.forEach(function (item) {
                    item.count = 0;
                });
            },
            cartAdd2(event) {
            	this.$emit('cartAdd2', event);
            }
        },
        mounted() {

        }

    });
</script>
<style lang="scss" scoped>
    .shopcart {
        position: fixed;
        z-index: 9;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 48px;
        .content {
            display: flex;
            background: #141d27;
            font-size: 0;
            .content-left {
                flex: 1;
                .logo-wrapper {
                    display: inline-block;
                    position: relative;
                    top: -10px;
                    margin: 0 12px;
                    padding: 6px;
                    width: 56px;
                    height: 56px;
                    box-sizing: border-box;
                    vertical-align: top;
                    border-radius: 50%;
                    background: #141d27;
                    .logo {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: #2b343c;
                        text-align: center;
                        .icon-shopping_cart {
                            font-size: 24px;
                            line-height: 44px;
                            color: #80858a;
                        }
                    }
                    .logo.highlight {
                        background: rgb(0, 160, 220);
                        .icon-shopping_cart {
                            color: white;
                        }
                    }
                    .num {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 24px;
                        height: 16px;
                        line-height: 16px;
                        text-align: center;
                        border-radius: 16px;
                        font-size: 9px;
                        font-weight: 700;
                        color: white;
                        background: rgb(240, 20, 20);
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
                    }

                }
                .price {
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 12px;
                    line-height: 24px;
                    box-sizing: border-box;
                    padding-right: 12px;
                    border-right: 1px solid rgba(255, 255, 255, .1);
                    font-size: 16px;
                    font-weight: 700;
                    color: rgba(255, 255, 255, .4);
                }
                .price.highlight {
                    color: white;
                }
                .desc {
                    display: inline-block;
                    vertical-align: top;
                    line-height: 24px;
                    margin: 12px 0 0 12px;
                    color: rgba(255, 255, 255, .4);
                    font-size: 10px;
                }
            }
            .content-right {
                flex: 0 0 105px;
                width: 105px;
                .pay {
                    color: rgba(255, 255, 255, .4);
                    height: 48px;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 700;
                    line-height: 48px;
                    background: #2b333b;
                }
                .pay.not-enough {
                    background: #2b333b;
                }
                .pay.enough {
                    color: white;
                    background: #00b43c;
                }
            }
        }
        .ball-container {
            .ball {
                position: fixed;
                left: 32px;
                bottom: 22px;
                z-index: 200;
                .inner {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: rgb(0, 160, 220);
                    transition: all 0.8s linear;
                }
            }
        }
        .shopcart-list {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            transition: all 0.3s;
            transform: translate3d(0, -100%, 0);
            .list-header {
                height: 40px;
                line-height: 40px;
                padding: 0 18px;
                background: #f3f5f7;
                border-bottom: 1px solid rgba(7, 17, 27, .1);
                .title {
                    float: left;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .empty {
                    float: right;
                    font-size: 12px;
                    color: rgb(0, 160, 220);
                }
            }
            .list-content {
                padding: 0 18px;
                max-height: 217px;
                overflow: hidden;
                background: #fff;
                transition: all 0.5s;

                .food {
                    /*position: relative;*/
                    padding: 12px 0;
                    box-sizing: border-box;
                    transition: all 0.5s;
                    display:flex;
                    .name {
                        line-height: 20px;
                        font-size: 14px;
                        padding-top: 8px;
                        color: rgb(7, 17, 27);
                        flex:1;
                    }
                    .price {
                        /*position: absolute;*/
                        /*right: 90px;*/
                        /*bottom: 12px;*/
                        line-height: 24px;
                        font-size: 14px;
                        padding-top: 6px;
                        font-weight: 700;
                        color: rgb(240, 20, 20);
                    }
                    .cartcontrol-wrapper {
                        /*position: absolute;*/
                        /*bottom: 6px;*/
                        /*right: 0;*/
                    }
                }
            }
        }
    }

    .drop-enter-active {
        transition: all 0.8s cubic-bezier(.49, -0.29, .75, .41);
    }

    .bounce-enter-active {
        animation: bounce-in .3s;
    }
    .bounce-leave-active {
        animation: bounce-in .3s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: translate3d(0, 0, 0);
        }
        100% {
            transform: translate3d(0, -100%, 0);
        }
    }


    /*.list-items {*/
        /*transition: all 1s;*/
        /*display: inline-block;*/
        /*margin-right: 10px;*/
    /*}*/
    .foods-enter, .foods-leave-to
        /* .list-leave-active for <2.1.8 */ {
        opacity: 0;
    }
    .foods-leave-active {
        position: absolute;

    }


</style>
