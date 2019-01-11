<template>
    <div class="ratings"  ref="ratingss">
        <div class="ratings-content" >
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star class="rating-star" :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star class="rating-star" :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class=" delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect @ratingtype="ratingType" @onlycontent="onlycontent" :ratings="ratings"
                          :selectType="selectType"
                          :onlyContent="onlyContent" ></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="rating in ratings"  v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1 border-1px">
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar"/>
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">
                                    {{rating.deliveryTime}}
                                </span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span v-for="item in rating.recommend" class="item">
                                    {{item}}
                                </span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    import star from '../star/star.vue';
    import split from 'components/split/split';
    import ratingselect from 'components/ratingselect/ratingselect';
    import {formatDate} from '../../common/js/date';
    import BScroll from 'better-scroll';

    const ALL = 2;
	export default({
        data() {
        	return {
                showflag: false,
                selectType: ALL,
                onlyContent: false,
                ratings: []
            };
        },
        props: {
        	seller: {
        		type: Object
            }
        },
        created() {
            this.$http.get('/ratings').then((res) => {
            	res = res.body;
            	this.ratings = res.data;
            	this.$nextTick(() => {
            		this.scroll = new BScroll(this.$refs.ratingss, {
                        click: true
                    });
                });
            });
        },
        methods: {
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
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        components: {
            star,
            split,
            ratingselect
        }
    });
</script>
<style lang="scss" >
.ratings{
    position: absolute;;
    top:174px;
    bottom:0;
    width:100%;
    left: 0;
    overflow:hidden;
    background: white;
    .overview{
        display:flex;
        padding:18px 0;
        .overview-left{
            flex: 0 0 137px;
            width:137px;
            border-right:1px solid rgba(7,17,27,.1);
            text-align:center;
            padding:6px 0;
            .score{
                color:rgb(255,153,0);
                line-height:28px;
                font-size:24px;
                margin-bottom:6px;
            }
            .title{
                line-height:12px;
                color:rgb(7,17,27);
                font-size:12px;
                margin-bottom:8px;
            }
            .rank{
                line-height:10px;
                font-size:10px;
                color:rgb(147,153,159);
            }
            @media only screen and (max-width: 320px) {
                flex: 0 0 120px;
                width:120px;
            }
        }

        .overview-right{
            flex:1;
            padding:5px 0 0 20px;
            @media only screen and (max-width: 320px) {
                padding:5px 0 0 6px;
            }
            .score-wrapper{
                margin-bottom:8px;
                font-size:0;
                .title{
                    font-size:12px;
                    color:rgb(7,17,27);
                    vertical-align:top;
                    line-height:18px;
                }
                .rating-star{
                    display:inline !important;
                }
                .star{
                    display:inline-block;
                    vertical-align:top;
                    margin: 0 12px;
                    @media only screen and (min-width: 414px) {
                        margin: 0 12px;
                    }
                    @media only screen and (max-width: 375px) {
                        margin: 0 8px !important;
                    }
                    .star-item{
                        margin-right: 7px !important;
                        @media only screen and (max-width: 320px) {
                            margin-right: 5px !important;
                        }
                    }
                    .star-item:last-child{
                        margin-right:0 !important;
                    }

                }
                .score{
                    display:inline-block;
                    line-height:18px;
                    font-size:12px;
                    vertical-align:top;
                    color:rgb(7,17,27);
                }
            }
            .delivery-wrapper{
                font-size:0;
                .title{
                    font-size:12px;
                    color:rgb(7,17,27);
                    line-height:18px;
                }
                .delivery{
                    margin-left:12px;
                    font-size:12px;
                    color:rgb(147,153,159);
                    /*vertical-align:top;*/
                }
            }
        }
    }
    .rating-wrapper{
        padding: 0 18px;
        .rating-item{
            display:flex;
            padding:18px 0;
            .avatar{
                flex:0 0 28px;
                margin-right:12px;
                img{
                    border-radius:50%;
                }
            }
            .content{
                flex:1;
                position:relative;
                .name{
                    margin-bottom:4px;
                    line-height:12px;
                    font-size:10px;
                    color:rgb(7,17,27);
                }
                .star-wrapper{
                    margin-bottom:6px;
                    font-size:0;
                    .star{
                        margin-right:16px;
                        display:inline-block;
                        vertical-align:top;
                    }
                    .delivery{
                        display:inline-block;
                        vertical-align:top;
                        color:rgb(147,153,159);
                        font-size:10px;
                        line-height:12px;
                    }
                }
                .text{
                    margin-bottom:8px;
                    line-height:18px;
                    font-size:12px;
                }
                .recommend{
                    line-height:16px;
                    font-size:0;
                    .icon-thumb_up,.item{
                        display:inline-block;
                        margin:0 8px 4px 0;
                        font-size:9px;
                    }
                    .icon-thumb_up{
                        color:rgb(0,160,220);
                    }
                    .item{
                        padding: 0 6px;
                        border:1px solid rgba(7,17,27,.1);
                        border-radius:1px;
                        color:rgb(147,153,159);
                        background:white;
                    }
                }
                .time{
                    position:absolute;
                    top:0;
                    right:0;
                    line-height:12px;
                    font-size:10px;
                    color:rgb(147,153,159);
                }
            }
        }
    }
}

</style>
