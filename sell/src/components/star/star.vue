<template>
    <section class="star" :class="starType">
        <span v-for="item in itemClass" :class="item" class="star-item"></span>
    </section>
</template>
<script type="text/ecmascript-6">
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLE_HALF = 'half';
    const CLE_OFF = 'off';
    export default({
        data() {
            return {};
        },
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
            starType() {
                return 'star-' + this.size;
            },
            itemClass() {
                let result = [];
                let score = Math.floor(this.score * 2) / 2;
                let hasDecimal = score % 1 !== 0;
                let integer = Math.floor(score);
                for (let i = 0; i < integer; i++) {
                    result.push(CLS_ON);
                }
                if (hasDecimal) {
                    result.push(CLE_HALF);
                }
                while (result.length < LENGTH) {
                    result.push(CLE_OFF);
                }
                return result;
            }
        },
        methods: {},
        mounted() {

        }
    });
</script>
<style lang="scss" scoped>
    .star {
        font-size: 0;
        .star-item {
            display: inline-block;
            background-repeat: no-repeat;
        }
    }

    .star.star-48 {
        .star-item {
            width: 20px;
            height: 20px;
            margin-right: 22px;
            background-size: 20px 20px;
        }
        .star-item:last-child {
            margin-right: 0;
        }
        .star-item.on {
            background-image: url("./img/star48_on@3x.png");
        }
        .star-item.half {
            background-image: url("./img/star48_half@3x.png");
        }
        .star-item.off {
            background-image: url("./img/star48_off@3x.png");
        }
    }

    .star.star-36 {
        .star-item {
            width: 15px;
            height: 15px;
            margin-right: 16px;
            background-size: 15px 15px;
        }
        .star-item:last-child {
            margin-right: 0;
        }
        .star-item.on {
            background-image: url("./img/star36_on@3x.png");
        }
        .star-item.half {
            background-image: url("./img/star36_half@3x.png");
        }
        .star-item.off {
            background-image: url("./img/star36_off@3x.png");
        }
    }

    .star.star-24 {
        .star-item {
            width: 10px;
            height: 10px;
            margin-right: 3px;
            background-size: 10px 10px;
        }
        .star-item:last-child {
            margin-right: 0;
        }
        .star-item.on {
            background-image: url("./img/star24_on@3x.png");
        }
        .star-item.half {
            background-image: url("./img/star24_half@3x.png");
        }
        .star-item.off {
            background-image: url("./img/star24_off@3x.png");
        }
    }
</style>
