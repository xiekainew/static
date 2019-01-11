<template>
    <section class="swiper-box">
        <div class="swiper-container"
             :style="{backgroundImage:`url('${bg}')`}"
        >
            <div class="swiper-wrapper">
                <div
                    class="swiper-slide"
                    v-for="(item,index) in img"
                    :style="{backgroundImage:`url('${item}')`}"
                ></div>
            </div>
        </div>
        <div class="music" :class="{play: isPlay}" @click="play" :style="{backgroundImage:`url('${musicIcon}')`}">
        </div>
        <audio ref="audio" src="../../../static/married.mp3" autoplay="autoplay"></audio>
    </section>
</template>

<script>
    import Swiper from '../../../static/swiper/swiper-3.4.2.min.js';
    const musicIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAGU0lEQVR4Xu2dW8htUxTHf8cttxcpzhG5e+PBOSi3pDxIHogXoshdPHhTKLkUkgdERIrcCuXJi0jJ7RwRL1JEuT0RRZJLo9anr6/97TXXGnPNNefY/1Wn87DnmGON//+35tpj7bm/vQUdkRQ4BNgBbF/3b9uyArdEqn7Fallk9tYFGiz1WAC0QU2q2YuqEQBtePz/WXrMFgArbrYAqBiA3Fd2aqm6BaQqlXHcXGZrBchoYupUNZktAFJdGzmudrMFwEhjF4W1aLYAGAlAFLMFQAIAkc0WABsUWDWzVxoAmb14+Qv5HEBmJ9zruiHNAyCz080OeQv411f/ykc3vwIIAB/DAsCnX/PRAqB5C30FCACffs1HC4DmLfQVIAB8+jUfLQCat9BXgADw6dd8tABo3kJfAQLAp1/z0QKgeQt9BQgAn37NRwuA5i30FSAAfPo1Hy0AmrfQV4AA8OnXfLQAaN7CxQV8D+wCzu+pTwAEAMDM3tkZbqbbvx+7uvo2zAiAxgBYZvaiUgRAYwavP93vNlzV66/s1LIEQKpSM4/LYbZWgJlNTE0/ldkCINWBguNKmi0AChq7KNXcZguAggDUaLYAmAiAVswWABkAWG/22sOVnzLMO9cUagOXKB/NbK0AK262AFigwHnd07SWl3HP7WPlbwGr/gevBYDn8gkQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmOgpQQB41AsQKwACmLhZCbsBZvAykwVA4wDsAewATgdOBI4DDgMOAPbsavsVsB+T+hL4GHgbeBf4qwcOCw//q2Et/qVQu7LPBi7rfvfPzB56/Aw8D9zYEygAhio74fi9gSuAW4BjJsyzfmoBUEjoZWnsir8EuLdb3kuekgAoqfaCXMcCzwCnznQeAmAm4S2tLfePAvvMeA4CYAbxdwceAm6aIffGlFUDMHmfO4MB1tbZkn/pDLkXpZwdgFn73MImmNhPAFcVzrss3SwAVNPnFjbC2rsHC+fsS1cUgOr63D51Mr6+HXgfsBWvpqMIANX2uYWcsPo/BAyC2o7JAai6zy3khr3he65QrqFpJgWg+j53qFojxpvAnwAnjIidOuQPYN/R7xCXBDbT506tcPcJ3q4Cecak+BY4PDcATfW5Y1QbGHMXcNvAmFLD3wDOzQlAc31uAaXfAs4qkGdMituBu3MC0FyfO0a1gTG2UWPbwJhSw+19yWe5AGiyzy2g9N+AtYG1HR8BJ/edVOpummb73D4BMrxeKwAXAa/01ZcKQLN9bp8AGV63Xy0/KMM8Oad4DzgtYb/g8g2D3Rk13efmVHWTud4BziiQJzXFn8BJfff+tclSVgDbqVprn/sNcESqMhONuxO4Y6K5x0x7A/BYamAKAE33ualCOMbZNu4vHPE5Qx8ZugklBYCa+1x7AHNPTgVHzvUqcMHI2FxhTwNXA/8MmTAFgJr73OOBz4cUPNHYo4BPgf0nmr9v2vuBW4eab5OmAFBrm2Mfv57Sp0zB1y8GXkrUNNdp/QZcC7wwdsKWAbgQeG1s4RPFXQk8WejB0JvANcBXnlpSAKixz7XvxVnr1ffFSI82Y2PPAZ4FDh47QU/c191y/3KO+lMAqLHPtS9T1nDv38yrA7sPYWxzaK4tYlbvA91yb18KzXKkAFBbn3s98HiW6qef5EjgOuByYOuIdD8Ar3fbzD/IccVvPIcUAGrqcx8Gbh4h5Nwh9lmKPZ07s/v/aOBQYD9gL+B34BfANnDYV8B3AvY41zqLSW9zKQCYeDX0uU91b3oG9blzO197/lQA5u5z7+ve+Ex6NdRu1hTnlwqA5Z6rz7VW58UpitecaQ+C1uvUXJ8rk5crMGQFWJupqT5XAOQHwGZsps8VANMAsDZr9X2uAJgWgLXZq+1zBcByBf4DqJN4kP5YvnsAAAAASUVORK5CYII=';
    /* eslint-disable no-new */
    export default {
        name: 'hello',
        data () {
            return {
                img: [
                    'http://ovbm631b5.bkt.clouddn.com/img1.jpg',
                    'http://ovbm631b5.bkt.clouddn.com/img2.jpg',
                    'http://ovbm631b5.bkt.clouddn.com/img3.jpg',
                    'http://ovbm631b5.bkt.clouddn.com/img4.jpg',
                    'http://ovbm631b5.bkt.clouddn.com/img5.jpg',
                    'http://ovbm631b5.bkt.clouddn.com/img6.jpg',
                    'http://ovbm631b5.bkt.clouddn.com/img7.jpg',
                    'http://ovbm631b5.bkt.clouddn.com/img8.jpg',
                    'http://ovbm631b5.bkt.clouddn.com/img9.jpg',
                    'http://ovbm631b5.bkt.clouddn.com/img10.jpg'
                ],
                bg: 'http://ovbm631b5.bkt.clouddn.com/img1.jpg',
                musicIcon: musicIcon,
                isPlay: true
            };
        },
        methods: {
            init() {
                let that = this;
                /* eslint-disable no-new */
                new Swiper('.swiper-container', {
//                    autoplay: 5000, // 可选选项，自动滑动
                    direction: 'vertical',
//                    effect: 'coverflow',
                    onInit(swiper) {
                        console.log(swiper);
                    },
                    onTouchEnd(swiper) {
                        console.log(swiper.activeIndex); // 切换结束时，告诉我现在是第几个slide
                        that.bg = that.img[swiper.activeIndex];
                    },
                    onSlideChangeEnd(swiper) {
//                        console.log(swiper.activeIndex); // 切换结束时，告诉我现在是第几个slide
                    }
                });
            },
            play() {
                this.isPlay = !this.isPlay;
                if (this.isPlay) {
                    this.$refs.audio.play();
                } else {
                    this.$refs.audio.pause();
                }
            }
        },
        mounted() {
            this.init();
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import url("../../assets/swiper-3.4.2.min.css");

    body, html {
        width: 100%;
        height: 100%;
    }

    .swiper-box {
        position: relative;
        .music {
            position: absolute;
            right: 20px;
            top: 20px;
            width: 25px;
            height: 25px;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center center;
            color: red;
            z-index: 99;
            font-size: 20px;
            transition: all 1s linear;

        }
        .music.play {
            animation: rotateMe 3s linear infinite;
        }
    }

    .swiper-container {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        .swiper-wrapper {
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            .swiper-slide {
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
            }
        }
    }

    @keyframes rotateMe {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
