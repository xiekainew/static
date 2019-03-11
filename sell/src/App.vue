<template>
    <section>
        <div class="sell-wrappers">
            <Headers :seller="seller" msg="father"></Headers>
            <div class="tab border-1 border-1px">
                <div class="tab-item">
                    <router-link to="/Goods">商品</router-link>
                </div>
                <div class="tab-item">
                    <router-link to="/ratings">评论</router-link>
                </div>
                <div class="tab-item">
                    <router-link to="/seller">商家</router-link>
                </div>
            </div>
            <keep-alive>
                <router-view  :seller="seller" ></router-view>
            </keep-alive>
        </div>

    </section>

</template>

<script>
    import Headers from './components/header/header.vue';
    import {urlParse} from './common/js/util';
    export default {
        name: 'app',
        components: {
            Headers
        },
        data() {
            return {
                seller: {
                    id: (() => {
                        let queryParam = urlParse();
                        return queryParam.id || '12345';
                    })()
                }
            };
        },
        created() {
            console.log(this.seller.id);
            this.$http.get('../static/data.json').then((data) => {
                console.log(data);
                this.seller = Object.assign({}, this.seller, data.body.seller);
            });
        }
    };
</script>

<style lang="scss">
    .sell-wrappers{
        .tab {
            display: flex;
            width: 100%;
            height: 40px;
            line-height: 40px;
            position: relative;
            .tab-item {
                flex: 1;
                text-align: center;
                background:white;
                a {
                    display: block;
                    font-size: 14px;
                    color: rgb(77, 85, 93)
                }
                .router-link-exact-active {
                    color: rgb(240, 20, 20)
                }
            }
        }

        .tab:after {
            display: block;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            border-top: 1px solid rgba(7, 17, 27, 0.1);
            content: '';
        }
    }


</style>
