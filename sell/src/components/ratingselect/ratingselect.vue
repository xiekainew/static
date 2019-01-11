<template>
    <section class="ratingselect">
        <div class="rating-type border-1 border-1px">
            <span @click="select(2,$event)" class="block positive" :class="myType === 2 ? 'active':''">
                {{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span @click="select(0,$event)" class="block positive"
                  :class="myType === 0 ? 'active':''">{{desc.positive}}<span
                class="count">{{positives.length}}</span></span>
            <span @click="select(1,$event)" class="block negative"
                  :class="myType === 1 ? 'active':''">{{desc.negative}}<span
                class="count">{{negatives.length}}</span></span>
        </div>
        <div @click.stop="toogleContent($event)" class="switch" :class="{on:onlyContent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default({
        data() {
            return {
                myType: this.selectType
            };
        },
        props: {
            ratings: {
                type: Array,
                default() {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    };
                }
            }
        },
        watch: {
            selectType(type) {
                this.myType = type;
            },
            myType(type) {
                this.$emit('ratingtype', type);
            }
        },
        computed: {
            positives() {
                return this.ratings.filter((rating) => {
                    return rating.rateType === POSITIVE;
                });
            },
            negatives() {
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE;
                });
            }
        },
        methods: {
            select(type, event) {
                if (!event._constructed) {
                    return;
                }
                this.selectType = type;
            },
            toogleContent(event) {
                if (!event._constructed) {
                    return;
                }
                this.onlyContent = !this.onlyContent;
                this.$emit('onlycontent', this.onlyContent);
            }
        },
        mounted() {

        }
    });
</script>
<style lang="scss" scoped>
    .ratingselect {
        .rating-type {
            padding: 18px 0;
            margin: 0 18px;
            font-size: 0;
            .block {
                display: inline-block;
                padding: 12px 8px;
                margin-right: 8px;
                border-radius: 2px;
                font-size: 12px;
                color: rgb(77, 85, 93);
                line-height: 16px;
                .count {
                    font-size: 8px;
                    margin-left: 2px;
                }
            }
            .positive {
                background: rgba(0, 160, 220, .2);
            }
            .positive.active {
                background: rgb(0, 160, 220);
            }
            .block.active {
                color: white;
            }
            .negative {
                background: rgba(77, 85, 93, .2);
            }
            .negative.active {
                background: rgb(77, 85, 93);

            }
        }
        .switch {
            padding: 12px 18px;
            line-height: 24px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            color: rgb(147, 153, 159);
            font-size: 0;
            .icon-check_circle {
                margin-right: 4px;
                font-size: 24px;
                display: inline-block;
                vertical-align: top;
            }
            .text {
                display: inline-block;
                font-size: 12px;
            }
        }
        .switch.on {
            .icon-check_circle {
                color: #00c850;
            }
        }
    }
</style>
