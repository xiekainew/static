<template>
    <section>
        <TopBar/>
        <Navs/>
        <div class="swiper-content">
            <el-carousel>
                <el-carousel-item style="background-image:url('./static/banner/18(3).jpg') ">
                </el-carousel-item>
                <el-carousel-item style="background-image:url('./static/banner/26(3).jpg') ">
                </el-carousel-item>
                <el-carousel-item style="background-image:url('./static/banner/28(3).jpg') ">
                </el-carousel-item>
                <el-carousel-item style="background-image:url('./static/banner/30(3).jpg') "></el-carousel-item>
            </el-carousel>
        </div>

        <div class="hot-wrapper">
            <div class="hot-content">
                <h3>热门产品</h3>
                <el-row class="hot-row-box" :gutter="20">
                    <el-col class="hot-col" :span="8">
                        <div class="hot-row">
                            <div class="hot-item left-top">
                                <div class="hot-img hot-img-top"
                                     style="background-image:url('./static/hot/1Page.png'); background-size: 120px"></div>
                                <p class="title1">私募基金产品架构设计及备案</p>
                                <p class="title11">从产品设计到产品备案全程把关</p>

                                <div class="shade">
                                    <h4 class="shade-title">私募基金产品架构设计及备案</h4>
                                    <p class="shade-desc">系统指导——从产品设计到产品备案全程把关</p>
                                    <p class="shade-desc">一步搞定——合法合规快速完成备案</p>
                                    <p class="shade-desc">多重监督——两名律师共同承办，力求万无一失</p>
                                    <div class="shade-btn">
                                        <router-link to="/package">了解详情</router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="hot-item left-bottom">
                                <div class="hot-img hot-float"
                                     style="background-image:url('./static/hot/5Page.png'); background-size: 80px"></div>
                                <div class="hot-float hot-right">
                                    <p class="float-title">企业债务风险防控</p>
                                    <p class="float-desc">建立债务风控制度，防患于未然</p>
                                </div>
                                <div class="shade">

                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="hot-col" :span="8">
                        <div class="hot-row">
                            <div class="hot-item center-top">
                                <div class="hot-img hot-float"
                                     style="background-image:url('./static/hot/2Page.png'); background-size: 80px"></div>
                                <div class="hot-float hot-right">
                                    <p class="float-title">初创公司全年法律顾问</p>
                                    <p class="float-desc">给创业最好的法律保障</p>
                                </div>
                                <div class="shade">

                                </div>
                            </div>
                            <div class="hot-item center-bottom">
                                <div class="hot-img hot-img-top"
                                     style="background-image:url('./static/hot/4Page.png'); background-size: 120px"></div>
                                <p class="title1">劳动用工全无忧</p>
                                <p class="title12">建立全套劳动用工体协，让您的企业全年避免用工风险</p>

                                <div class="shade">
                                    <h4 class="shade-title">私募基金产品架构设计及备案</h4>
                                    <p class="shade-desc">系统指导——从产品设计到产品备案全程把关</p>
                                    <p class="shade-desc">一步搞定——合法合规快速完成备案</p>
                                    <p class="shade-desc">多重监督——两名律师共同承办，力求万无一失</p>
                                    <div class="shade-btn">了解详情</div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="hot-col" :span="8">
                        <div class="hot-row">
                            <div class="hot-item right-top">
                                <div class="hot-img hot-float"
                                     style="background-image:url('./static/hot/3Page.png'); background-size: 80px"></div>
                                <div class="hot-float hot-right">
                                    <p class="float-title">企业税务风险管理制度</p>
                                    <p class="float-desc">建立全套劳动用工体协，让您的企业全年避免用工风险</p>
                                </div>
                                <div class="shade">

                                </div>

                            </div>
                            <div class="hot-item right-center">
                                <div class="hot-img hot-float"
                                     style="background-image:url('./static/hot/6Page.png'); background-size: 80px"></div>
                                <div class="hot-float hot-right">
                                    <p class="float-title">股权顶层架构设计</p>
                                    <p class="float-desc">匹配战略布局——为企业生命线建立牢固的防火墙</p>
                                </div>
                                <div class="shade">

                                </div>
                            </div>
                            <div class="hot-item right-bottom">
                                <div class="hot-img hot-float"
                                     style="background-image:url('./static/hot/7Page.png'); background-size: 70px"></div>
                                <div class="hot-float hot-right">
                                    <p class="float-title">企业欠款清收</p>
                                    <p class="float-desc">颗粒归仓好的法律保障</p>
                                </div>
                                <div class="shade">

                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="service-wrapper">
            <div class="service-content">
                <h3>基础服务</h3>
                <el-row>
                    <el-col class="service-item service-item1">
                        <div class="item-img item-img1"></div>
                        <div class="item-title">法律咨询</div>
                        <p class="item-p">法律问题，随时解答<br/>一键呼叫，立即回应</p>
                        <div class="item-btn">
                            <span class="btn-text">了解详情</span>
                            <span class="btn-img"></span>
                        </div>
                        <div class="btn-shade"></div>
                    </el-col>
                    <el-col class="service-item service-item2">
                        <div class="item-img item-img2"></div>
                        <div class="item-title">合同修改</div>
                        <p class="item-p">合同审核，只需三步<br/>专业指导，效率倍增</p>
                        <div class="item-btn">
                            <span class="btn-text">了解详情</span>
                            <span class="btn-img"></span>
                        </div>
                        <div class="btn-shade"></div>
                    </el-col>
                    <el-col class="service-item service-item3">
                        <div class="item-img item-img3"></div>
                        <div class="item-title">全年法务</div>
                        <p class="item-p">随时为您的企业保驾护航</p>
                        <div class="item-btn">
                            <span class="btn-text">了解详情</span>
                            <span class="btn-img"></span>
                        </div>
                        <div class="btn-shade"></div>
                    </el-col>
                </el-row>

            </div>
        </div>

        <div class="split-wrapper">
            <div class="split-content">
                <p class="split-desc">
                    犀牛法律专注于律师的分析与挖掘，潜心专研产品 <br/>我们只为您的企业提供最适合的律师
                </p>
            </div>
        </div>

        <div class="cases-content">
            <div class="cases-wrapper">
                <h3>成功案例</h3>
                <el-carousel @change="currentPage" :autoplay="false" type="card" indicator-position="none"
                             height="250px">
                    <el-carousel-item style="background-image:url('./static/banner/30(3).jpg') "></el-carousel-item>
                    <el-carousel-item style="background-image:url('./static/banner/18(3).jpg') "></el-carousel-item>
                    <el-carousel-item style="background-image:url('./static/banner/28(3).jpg') "></el-carousel-item>
                    <el-carousel-item style="background-image:url('./static/banner/26(3).jpg') "></el-carousel-item>

                </el-carousel>
                <div v-show="showCases === 0" class="cases-desc">
                    <div class="desc-title">
                        <div class="title-logo"></div>
                        <div class="title-line"></div>
                        <div class="title-text">本来生活</div>
                    </div>
                    <div class="desc-text">
                        1关于在设计业务中各种法律的“坑”相信圈内的人，
                        早已经心知肚明！当年的宝宝只能把“苦水”往肚子里咽！
                        既不敢得罪甲方爸爸，也不敢得罪名牌设计师，还得抵挡不知何处而来的冷箭！
                        每年的维权成本要上百万。不过，这些好在已经过去，我们迎来了曙光，
                        在犀牛法律的帮助下，终于可以轻轻松松解决各种问题，从此宝宝过上了吃得下，
                        睡得香，一口气上五楼，不费劲的好日子。


                    </div>
                </div>
                <div v-show="showCases === 1" class="cases-desc">
                    <div class="desc-title">
                        <div class="title-logo"></div>
                        <div class="title-line"></div>
                        <div class="title-text">相信圈内</div>
                    </div>
                    <div class="desc-text">
                        2关于在设计业务中各种法律的“坑”相信圈内的人，
                        早已经心知肚明！当年的宝宝只能把“苦水”往肚子里咽！
                        既不敢得罪甲方爸爸，也不敢得罪名牌设计师，还得抵挡不知何处而来的冷箭！
                        每年的维权成本要上百万。不过，这些好在已经过去，我们迎来了曙光，
                        在犀牛法律的帮助下，终于可以轻轻松松解决各种问题，从此宝宝过上了吃得下，
                        睡得香，一口气上五楼，不费劲的好日子。

                    </div>
                </div>
                <div v-show="showCases === 2" class="cases-desc">
                    <div class="desc-title">
                        <div class="title-logo"></div>
                        <div class="title-line"></div>
                        <div class="title-text">宝宝只能</div>
                    </div>
                    <div class="desc-text">
                        3关于在设计业务中各种法律的“坑”相信圈内的人，
                        早已经心知肚明！当年的宝宝只能把“苦水”往肚子里咽！
                        既不敢得罪甲方爸爸，也不敢得罪名牌设计师，还得抵挡不知何处而来的冷箭！
                        每年的维权成本要上百万。不过，这些好在已经过去，我们迎来了曙光，
                        在犀牛法律的帮助下，终于可以轻轻松松解决各种问题，从此宝宝过上了吃得下，
                        睡得香，一口气上五楼，不费劲的好日子。


                    </div>
                </div>
                <div v-show="showCases === 3" class="cases-desc">
                    <div class="desc-title">
                        <div class="title-logo"></div>
                        <div class="title-line"></div>
                        <div class="title-text">轻轻松松</div>
                    </div>
                    <div class="desc-text">
                        4关于在设计业务中各种法律的“坑”相信圈内的人，
                        早已经心知肚明！当年的宝宝只能把“苦水”往肚子里咽！
                        既不敢得罪甲方爸爸，也不敢得罪名牌设计师，还得抵挡不知何处而来的冷箭！
                        每年的维权成本要上百万。不过，这些好在已经过去，我们迎来了曙光，
                        在犀牛法律的帮助下，终于可以轻轻松松解决各种问题，从此宝宝过上了吃得下，
                        睡得香，一口气上五楼，不费劲的好日子。


                    </div>
                </div>
            </div>
        </div>

        <div class="partner-wrapper">
            <div class="partner-content">
                <h3>合作客户</h3>
                <el-row>
                    <el-row class="row-box">
                        <el-col class="partner-box"
                                style="background-size:130px; background-image:url('./static/logo/guojia.png')"></el-col>
                        <el-col class="partner-box"
                                style="background-size:130px; background-image:url('./static/logo/benlai.png')"></el-col>
                        <el-col class="partner-box"
                                style="background-size:130px; background-image:url('./static/logo/hn.png')"></el-col>
                        <el-col class="partner-box"
                                style="background-size:130px; background-image:url('./static/logo/ttjr.png')"></el-col>
                        <el-col class="partner-box"
                                style="background-size:130px; background-image:url('./static/logo/hthr.png')"></el-col>
                    </el-row>
                    <el-row class="row-box row-box2">
                        <el-col class="partner-box"
                                style="background-size:130px; background-image:url('./static/logo/diandong.png')"></el-col>
                        <el-col class="partner-box"
                                style="background-size:130px; background-image:url('./static/logo/cheyun.png')"></el-col>
                        <el-col class="partner-box"
                                style="background-size:130px; background-image:url('./static/logo/zhengbang.png')"></el-col>
                        <el-col class="partner-box"
                                style="background-size:130px; background-image:url('./static/logo/waiwen.png')"></el-col>
                        <el-col class="partner-box"
                                style="background-size:130px; background-image:url('./static/logo/shima.png')"></el-col>
                    </el-row>
                </el-row>
            </div>
        </div>
        <Footers/>
        <BackTop/>

    </section>
</template>
<script type="text/ecmascript-6">
    import Footers from './template/footer.vue';
    import Navs from './template/nav.vue';
    import TopBar from './template/topBar.vue';
    import BackTop from './template/backTop.vue';
    export default({
        data() {
            return {
                showCases: 0
            };
        },
        components: {
            Footers,
            Navs,
            TopBar,
            BackTop
        },
        methods: {
            currentPage(index) {
                this.showCases = index;
            }
        },
        mounted() {

        }
    });
</script>
<style lang="scss">
    .swiper-content {
        position: relative;
        .el-carousel__container {
            height: 550px;
            .el-carousel__item {
                width: 100%;
                height: 100%;
                background-size: cover;
                background-repeat: no-repeat;
                img {
                    width: 100%;
                }
            }
        }
        .el-carousel__indicators {
            .el-carousel__indicator {
                padding: 12px 9px;
                .el-carousel__button {
                    width: 10px;
                    border-radius: 50%;
                    height: 10px;
                }
            }
        }
    }

    .hot-wrapper {
        background: #F7F7F7;
        .hot-content {
            width: 1100px;
            margin: 0 auto;
            padding: 70px 0;
            h3 {
                text-align: center;
                margin-bottom: 60px;
                font-family: PingFangSC-Regular;
                font-size: 25px;
                color: #222222;
            }
            .hot-row-box {
                height: 500px;
                .hot-col {
                    .hot-row {
                        width: 100%;
                        height: 500px;
                        .hot-item {
                            background: white;
                            border-radius: 2px;

                            overflow: hidden;
                            position: relative;
                            .hot-img {
                                width: 120px;
                                height: 150px;
                                background-repeat: no-repeat;
                                background-position: center center;
                            }
                            .hot-img-top {
                                margin: 20px auto 0;
                            }
                            .hot-float {
                                float: left;
                            }
                            .hot-right {
                                width: 200px;
                            }
                            .float-title {
                                padding-top: 39px;
                                font-size: 15px;
                                color: #333333;
                                margin-bottom: 37px;
                                position: relative;
                            }
                            .float-desc {
                                font-size: 13px;
                                color: #999999;
                                line-height: 18px;
                            }
                            .float-title:after {
                                content: '';
                                position: absolute;
                                left: 0;
                                bottom: -22px;
                                width: 20px;
                                height: 4px;
                                border-radius: 4px;
                                background: #FF5A5A;
                            }

                            .title1 {
                                text-align: center;
                                font-size: 16px;
                                color: #444444;
                                padding-top: 30px;
                            }
                            .title11 {
                                font-size: 13px;
                                color: #999999;
                                text-align: center;
                                padding-top: 25px;
                            }
                            .title12 {
                                width: 250px;
                                margin: 0 auto;
                                font-size: 13px;
                                color: #999999;
                                text-align: left;
                                padding-top: 18px;
                                line-height: 24px;
                            }
                            .shade {
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                left: 0;
                                top: 0;
                                border-radius: 2px;
                                background: rgba(254, 94, 94, .94);
                                -webkit-transition: all 0.3s ease-in-out;
                                -moz-transition: all 0.3s ease-in-out;
                                -ms-transition: all 0.3s ease-in-out;
                                -o-transition: all 0.3s ease-in-out;
                                transition: all 0.3s ease-in-out;
                                -webkit-transform: translate3d(0px, 100%, 0);
                                -moz-transform: translate3d(0px, 100%, 0);
                                -ms-transform: translate3d(0px, 100%, 0);
                                -o-transform: translate3d(0px, 100%, 0);
                                transform: translate3d(0px, 100%, 0);
                                opacity: 0.3;
                                .shade-title {
                                    font-size: 16px;
                                    color: white;
                                    text-align: center;
                                    padding-top: 60px;
                                    margin-bottom: 40px;
                                }
                                .shade-desc {
                                    color: white;
                                    font-size: 13px;
                                    font-weight: 300;
                                    margin-left: 50px;
                                    margin-bottom: 15px;
                                    position: relative;
                                }
                                .shade-desc:after {
                                    content: '';
                                    position: absolute;
                                    left: -16px;
                                    top: 4px;
                                    width: 4px;
                                    height: 4px;
                                    background: white;
                                    border-radius: 4px;
                                }
                                .shade-btn {
                                    position: absolute;
                                    width: 130px;
                                    height: 35px;
                                    border-radius: 35px;
                                    border: 1px solid white;
                                    left: 50%;
                                    margin-left: -65px;
                                    bottom: 30px;
                                    line-height: 34px;
                                    color: white;
                                    text-align: center;
                                    font-size: 13px;
                                    font-weight: 200;
                                    cursor: pointer;
                                }
                            }
                        }
                        .hot-item:hover {
                            .shade {
                                -webkit-transform: translate3d(0px, 0, 0);
                                -moz-transform: translate3d(0px, 0, 0);
                                -ms-transform: translate3d(0px, 0, 0);
                                -o-transform: translate3d(0px, 0, 0);
                                transform: translate3d(0px, 0, 0);
                                opacity: 1;
                            }

                        }

                        .left-top {
                            height: 327px;
                            margin-bottom: 20px;
                        }
                        .left-bottom {
                            height: 153px;
                        }
                        .center-top {
                            height: 153px;
                            margin-bottom: 20px;
                        }
                        .center-bottom {
                            height: 327px;
                        }
                        .right-top {
                            height: 153px;
                            margin-bottom: 20px;
                        }
                        .right-center {
                            height: 153px;
                            margin-bottom: 20px;
                        }
                        .right-bottom {
                            height: 153px;
                        }
                    }
                }

            }
        }
    }

    .service-wrapper {
        background: white;
        .service-content {
            width: 1200px;
            margin: 0 auto;
            padding: 70px 0;
            h3 {
                text-align: center;
                margin-bottom: 70px;
                font-family: PingFangSC-Regular;
                font-size: 25px;
                color: #222222;
            }
            .service-item {
                height: 420px;
                width: 320px;
                background: #FFFFFF;
                box-shadow: 0px 0px 5px 0px rgba(213, 213, 213, 0.50);
                -webkit-transition: all 0.3s ease-in-out;
                -moz-transition: all 0.3s ease-in-out;
                -ms-transition: all 0.3s ease-in-out;
                -o-transition: all 0.3s ease-in-out;
                transition: all 0.3s ease-in-out;
                position: relative;
                .item-img {
                    width: 119px;
                    height: 117px;
                    background-repeat: no-repeat;
                    background-size: cover;
                    margin: 50px auto 0;
                }
                .item-img1 {
                    background-image: url('../../static/image/Page 1@3x-2.png')
                }
                .item-img2 {
                    background-image: url('../../static/image/Page 1@3x.png')
                }
                .item-img3 {
                    background-image: url('../../static/image/Page 3@3x.png')
                }
                .item-title {
                    color: #222222;
                    font-size: 20px;
                    margin-top: 40px;
                    text-align: center;
                }
                .item-p {
                    text-align: center;
                    color: #999999;
                    line-height: 24px;
                    font-size: 14px;
                    margin-top: 20px;
                }
                .item-btn {
                    position: absolute;
                    left: 50%;
                    bottom: 40px;
                    margin-left: -85px;
                    width: 170px;
                    height: 42px;
                    border-radius: 42px;
                    line-height: 40px;
                    text-align: center;
                    background: url('../../static/image/Rectangle 14 Copy@3x.png') no-repeat;
                    background-size: cover;
                    /*background:-webkit-gradient(linear, 0 0, 0 bottom, from(rgb(255,200,153)), to(rgba(255, 90, 90, 1)));*/
                    /*background:-o-linear-gradient(top, rgb(255,200,153), rgba(255, 90, 90, 1));*/
                    /*background:-moz-linear-gradient(top, rgb(255,200,153), rgba(255, 90, 90, 1));*/
                    /*background:rgb(255,128,112); !* 一些不支持背景渐变的浏览器 *!*/
                    box-shadow: 0 20px 30px rgba(248, 126, 126, .2);
                    z-index: 1;
                    cursor: pointer;
                    opacity: 0;
                    -webkit-transition: all 0.3s ease-in-out;
                    -moz-transition: all 0.3s ease-in-out;
                    -ms-transition: all 0.3s ease-in-out;
                    -o-transition: all 0.3s ease-in-out;
                    transition: all 0.3s ease-in-out;
                    font-size: 0;
                    .btn-text {
                        display: inline-block;
                        vertical-align: top;
                        color: #fff;
                        font-size: 14px;
                    }
                    .btn-img {
                        display: inline-block;
                        width: 13px;
                        height: 12px;
                        background: url('../../static/image/eps copy@3x.png') no-repeat;
                        background-size: cover;
                        vertical-align: middle;
                        margin-left: 6px;
                    }
                }
                .btn-shade {
                    position: absolute;
                    width: 100%;
                    height: 120px;
                    left: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0);
                    z-index: 9;
                    display: block;
                }
            }
            .service-item1 {
                margin: 0 30px 0 77px;
                border-top: 10px solid #FFD551;
            }
            .service-item2 {
                margin: 0 20px;
                border-top: 10px solid #54B98A;
            }
            .service-item3 {
                margin: 0 0px 0 30px;
                border-top: 10px solid #7DA1E8;;
            }
            .service-item:hover {
                transform: translate3d(0, -30px, 0);
                border-top: 10px solid #fff;
                box-shadow: 0px 0px 15px 0px rgba(213, 213, 213, 0.50);
                .item-btn {
                    opacity: 1;
                }
                .btn-shade {
                    display: none;
                }
            }
        }
    }

    .split-wrapper {
        min-width: 1200px;
        height: 220px;
        background: url('../../static/image/fbanner@1x.png') no-repeat;
        background-size: cover;
        background-position: center center;
        .split-content {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .3);
            .split-desc {
                text-align: center;
                color: white;
                font-size: 25px;
                line-height: 60px;
                padding-top: 48px;
            }
        }
    }

    .cases-content {
        background: #F7F7F7;
        .cases-wrapper {
            width: 900px;
            margin: 0 auto;
            padding: 70px 0;
            h3 {
                text-align: center;
                margin-bottom: 30px;
                font-family: PingFangSC-Regular;
                font-size: 25px;
                color: #222222;
            }
            .cases-desc {
                margin-top: 30px;
                .desc-title {
                    font-size: 0;
                    .title-logo {
                        display: inline-block;
                        width: 73px;
                        height: 22px;
                        background: red;
                        vertical-align: top;
                    }
                    .title-line {
                        display: inline-block;
                        background: #D7D6D6;
                        width: 1px;
                        height: 22px;
                        vertical-align: top;
                        margin: 0 10px;
                    }
                    .title-text {
                        display: inline-block;
                        font-family: PingFangSC-Medium;
                        font-size: 16px;
                        color: #333333;
                        vertical-align: top;
                        padding-top: 3px;
                    }

                }
                .desc-text {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #444444;
                    line-height: 35px;
                    text-indent: 26px;

                }
            }
        }
    }

    .partner-wrapper {
        background: white;
        .partner-content {
            width: 1200px;
            margin: 0 auto;
            padding: 70px 0;
            h3 {
                text-align: center;
                margin-bottom: 60px;
                font-family: PingFangSC-Regular;
                font-size: 25px;
                color: #222222;
            }
            .row-box {

                .partner-box {
                    height: 206px;
                    width: 20%;
                    border: 1px solid #E1E1E1;
                    border-right: none;
                    border-bottom: none;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    background-repeat: no-repeat;
                    background-position: center center;
                }
                .partner-box:last-child {
                    border-right: 1px solid #E1E1E1;
                }
            }
            .row-box2 {
                border-bottom: 1px solid #E1E1E1;
            }

        }
    }

    .el-carousel__arrow:hover {
        background: #FF6161;
    }
</style>
