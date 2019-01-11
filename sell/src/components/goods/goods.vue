<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item menu-item-hook" @click="selectMenu(index, $event)"
                    :class="currentIndex == index ? 'current':''">
                    <span class="text border-1 border-1px">
                        <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li @click="selectFood(food,$event)" v-for="food in item.foods"
                            class="food-item  border-1 border-1px">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon"/>
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">¥{{food.price}}</span><span class="old"
                                                                                  v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                                </div>
                                <div class="cart-wrapper">
                                    <cartcontrol @cartAdd="cartAdd" :food="food"></cartcontrol>
                                </div>
                            </div>

                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart  @cartAdd2="cartAdd" ref="shop_cart" :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice"
                  :minPrice="seller.minPrice"></shopcart>

        <food ref="food" :food="selectedFood" @cartAdd3="cartAdd"  @cartAdd2="cartAdd"></food>
    </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import shopcart from '../shopcart/shopcart.vue';
    import cartcontrol from '../cartcontrol/cartcontrol.vue';
    import food from '../food/food.vue';
    export default({
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            };
        },
        components: {
            shopcart,
            cartcontrol,
            food
        },
        props: {
            seller: {
                type: Object
            }
        },
        computed: {
            currentIndex () {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    	this.selectLeftMenu(i);
                        return i;
                    }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        },
        methods: {
            _initScroll() {
                this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
                    probeType: 3,
                    click: true
                });
                this.foodScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeight() {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectLeftMenu(index) {
                let leftList = this.$refs.menuWrapper.getElementsByClassName('menu-item-hook');
                let el = leftList[index];
                this.meunScroll.scrollToElement(el, 500);
            },
            selectMenu(index, event) {
                if (event._constructed) {
                    let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                    let el = foodList[index];
//                    this.selectLeftMenu(index);
                    this.foodScroll.scrollToElement(el, 500);
                }
            },
            cartAdd(target) {
                this.$nextTick(() => {
                    this.$refs.shop_cart.drop(target);    // 父组件直接调子组件的方法
                });
            },
            selectFood(food, event) {
                if (!event._constructed) {
                    return;
                }
                this.$refs.food.show();
                this.selectedFood = food;
            }
        },
        created() {
            this.$http.get('/goods').then((data) => {
                this.goods = data.body.data;
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                });
            });
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        mounted() {
            console.log(this.seller);
        }
    });
</script>
<style lang="scss">
    .goods {
        display: flex;
        position: absolute;
        width: 100%;
        top: 176px;
        bottom: 46px;
        overflow: hidden;
        .menu-wrapper {
            flex: 0 0 80px;
            width: 80px;
            background: #f3f5f7;
            /*ul{*/
            /*overflow-y: auto;*/
            /*height: 100%;*/
            /*}*/
            .menu-item {
                display: table;
                font-size: 12px;
                font-weight: 200;
                height: 54px;
                width: 56px;
                line-height: 14px;
                padding: 0 12px;
                .text {
                    font-size: 12px;
                    display: table-cell;
                    width: 56px;
                    vertical-align: middle;

                }

                .icon {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    vertical-align: top;
                    margin-right: 2px;
                    background-repeat: no-repeat;
                    background-size: 12px 12px;
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
            }
            .menu-item.current {
                font-weight: 700;
                margin-top: -1px;
                z-index: 10;
                background: #fff;
                .text:after {
                    display: none;
                }
            }
            .menu-item:last-child {
                .text:after {
                    display: none;
                }
            }

        }
        .foods-wrapper {
            flex: 1;
            background: white;
            .title {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147, 153, 159);
                background: #f3f5f7;
            }
            .food-item {
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                .icon {
                    flex: 0 0 57px;
                    width: 57px;
                    height: 57px;

                }
                .content {
                    flex: 1;
                    margin-left: 10px;
                    .name {
                        margin: 2px 0 8px 0;
                        height: 14px;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .desc {
                        margin-bottom: 8px;
                        line-height: 12px;
                    }
                    .desc, .extra {

                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .extra {
                        line-height: 10px;
                        .count {
                            margin-right: 12px;
                        }
                    }
                    .price {
                        font-weight: 700;
                        line-height: 24px;
                        .now {
                            margin-right: 8px;
                            font-size: 14px;
                            color: rgb(240, 20, 20);

                        }
                        .old {
                            text-decoration: line-through;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                    .cart-wrapper {
                        position: absolute;
                        right: 0;
                        bottom: 12px;
                    }
                }
            }
            .food-item:last-child {
                margin-bottom: 0;
            }
            .food-item:last-child:after {
                display: none;
            }
        }
    }

</style>
