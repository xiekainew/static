<template>
    <section class="cartcontrol">
        <transition name="cart" mode="out-in">
            <div class="cart-decrease" v-show="food.count > 0">
                <span class="icon-remove_circle_outline" @click.stop="decreaseCart($event)"></span>
            </div>
        </transition>

        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add" @click.stop="addCart($event)">
            <span class="icon-add_circle"></span>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default({
        data() {
            return {};
        },
        props: {
            food: {
                type: Object
            }
        },
        created() {},
        methods: {
            addCart(event) {
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                this.$emit('cartAdd', event.target);
            },
            decreaseCart(event) {
                if (!event._constructed) {
                    return;
                }
                if (this.food.count) {
                    this.food.count--;
                }
            }
        },
        mounted() {

        }
    });
</script>
<style lang="scss" scoped>
    .cartcontrol {
        font-size: 0;
        .cart-decrease, .cart-add {
            display: inline-block;
            padding: 6px;
            font-size: 24px;
            line-height: 19px;
            color: rgb(0, 160, 220);
        }
        .cart-count {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            padding-top: 6px;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            color: rgb(147, 153, 159)
        }

    }

    .cart-enter, .cart-leave-to {
        opacity: 0;
        transform: translate3d(24px, 0, 0) rotate(180deg);
    }

    .cart-enter-active, .cart-leave-active {
        transition: all .3s;
    }

</style>
