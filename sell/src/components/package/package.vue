<template>
    <section>
        <TopBar/>
        <Navs/>

        <div class="banner-wrapper">
            <div class="banner-bg"></div>
            <div class="banner-content">
                <h1 class="title">劳动用工全无忧</h1>
                <h2 class="desc">让您的企业不再有用工纠纷</h2>
                <div class="btn-box">
                    <div class="btn">
                        <span class="btn-text">立即申请</span>
                        <span class="btn-img"></span>
                    </div>
                    <div class="btn btn2">
                        <span class="btn-text">立即沟通</span>
                        <span class="btn-img"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="detail-wrapper">
            <div class="detail-content">
                <h3 class="h3-title">产品详情</h3>
                <el-row class="item-content">
                    <el-col :span="6">
                        <div class="left-img"
                             style="background-image:url('../../../static/image/Pagefewdq3x.png')"></div>
                        <div class="left-title">服务目标</div>
                    </el-col>
                    <el-col :span="16">
                        <p class="items">零风险——建立企业劳动用工全套风险防控体系</p>
                        <p class="items">避纠纷——让可能产生的纠纷有预警及预案措施</p>
                        <p class="items">强防御——对于纠纷有把控力和防御力</p>
                    </el-col>
                </el-row>
                <el-row class="item-content">
                    <el-col :span="6">
                        <div class="left-img" style="background-image:url('../../../static/image/Fille1@3x.png')"></div>
                        <div class="left-title">服务对象</div>
                    </el-col>
                    <el-col :span="16">
                        <p class="items">行业：通用型</p>
                        <p class="items">行业领域：全行业，创业公司特别推荐</p>
                        <p class="items">服务地域：全国范围</p>
                    </el-col>
                </el-row>
                <el-row class="item-content">
                    <el-col :span="6">
                        <div class="left-img"
                             style="background-image:url('../../../static/image/Pagefewf@3x.png')"></div>
                        <div class="left-title">服务内容</div>
                    </el-col>
                    <el-col :span="16">
                        <p class="items">律师调研，了解企业劳动用工制度及现状；</p>
                        <p class="items">完善或制定企业规章制度中劳动用工条款；</p>
                        <p class="items">针对企业用工的不同岗位完善或制定《劳动合同》、《保密协议》、《竞业禁止协议》、《劳务合同》等劳动用工协议;</p>
                        <p class="items">完善或制定人力资源部门、财务部门管理常用表单；</p>
                        <p class="items">劳动纠纷证据体系建设；</p>
                        <p class="items">为人力资源部门、财务部门出具合法化的用工人事、财务法律意见；</p>
                        <p class="items">对人力资源部门、财务部门进行劳动用工相关培训；</p>
                        <p class="items">接受企业日常劳动用工法律咨询；</p>
                        <p class="items">对于出现劳动用工的纠纷出具法律意见。</p>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="group-wrapper">
            <div class="group-content">
                <h3 class="h3-title">服务团队</h3>
                <div class="">
                    <el-row class="group-item" :gutter="20">
                        <el-col :span="6">
                            <img class="item-img" src="../../../static/image/bann.png"/>
                            <h1 class="item-name">王殿明律师</h1>
                            <p class="item-tip">执业15年</p>
                        </el-col>
                        <el-col :span="12">
                            <p class="item-text">
                                <span class="text-title">学校：</span>
                                <span>毕业于北京大学法法学院</span>
                            </p>
                            <p class="item-text">
                                <span class="text-title">简介：</span>
                                <span>拥有十五年执业经验，经办案件达680余件。曾担任北大方正集团法务总监，担任北广、中粮、中石油等集团专项法律培训讲师，目前为北京同创律师事务所合伙人。</span>
                            </p>
                            <p class="item-text item-cases">
                                <span class="text-title">劳动用工服务案例：</span>
                                <span>
                                在北大方正集团有限公司担任法务总监期间，
                            王殿明律师健全和完善了集团公司及下属118个子公司经营管理制度及员工用工制度，
                            并负责全集团劳动用工纠纷处理。对北广、中粮、中石油等集团进行专项劳动用工法律培训。
                            担任上海徐峥影视、江苏省建工集团有限公司、斌凝祥融（集团）、北京东洲致胜建筑装饰、
                            北京旭隆阳光、北京聚善堂生物科技、北京金辰联盟科技、孙晓岐品牌咨询等多家公司的常年法律顾问。
                            参与顾问单位的劳动用工法律制度建设，担任企业劳动用工纠纷、劳动争议、仲裁、
                            侵权等劳动诉讼案件代理律师，胜诉率高达90%。
                            </span>
                            </p>
                        </el-col>
                        <el-col :span="6">
                            <div class="price">犀牛价：<span>¥40000</span></div>
                            <div class="price-tip">市场价＞50000</div>
                            <div class="price-btn">立即申请</div>
                        </el-col>
                    </el-row>
                    <el-row class="group-item" :gutter="20">
                        <el-col :span="6">
                            <img class="item-img" src="../../../static/image/bann.png"/>
                            <h1 class="item-name">王殿明律师</h1>
                            <p class="item-tip">执业15年</p>
                        </el-col>
                        <el-col :span="12">
                            <p class="item-text">
                                <span class="text-title">学校：</span>
                                <span>毕业于北京大学法法学院</span>
                            </p>
                            <p class="item-text">
                                <span class="text-title">简介：</span>
                                <span>拥有十五年执业经验，经办案件达680余件。曾担任北大方正集团法务总监，担任北广、中粮、中石油等集团专项法律培训讲师，目前为北京同创律师事务所合伙人。</span>
                            </p>
                            <p class="item-text item-cases">
                                <span class="text-title">劳动用工服务案例：</span>
                                <span>
                                在北大方正集团有限公司担任法务总监期间，
                            王殿明律师健全和完善了集团公司及下属118个子公司经营管理制度及员工用工制度，
                            并负责全集团劳动用工纠纷处理。对北广、中粮、中石油等集团进行专项劳动用工法律培训。
                            担任上海徐峥影视、江苏省建工集团有限公司、斌凝祥融（集团）、北京东洲致胜建筑装饰、
                            北京旭隆阳光、北京聚善堂生物科技、北京金辰联盟科技、孙晓岐品牌咨询等多家公司的常年法律顾问。
                            参与顾问单位的劳动用工法律制度建设，担任企业劳动用工纠纷、劳动争议、仲裁、
                            侵权等劳动诉讼案件代理律师，胜诉率高达90%。
                            </span>
                            </p>
                        </el-col>
                        <el-col :span="6">
                            <div class="price">犀牛价：<span>¥40000</span></div>
                            <div class="price-tip">市场价＞50000</div>
                            <div class="price-btn">立即申请</div>
                        </el-col>
                    </el-row>
                    <el-row class="group-item" :gutter="20">
                        <el-col :span="6">
                            <img class="item-img" src="../../../static/image/bann.png"/>
                            <h1 class="item-name">王殿明律师</h1>
                            <p class="item-tip">执业15年</p>
                        </el-col>
                        <el-col :span="12">
                            <p class="item-text">
                                <span class="text-title">学校：</span>
                                <span>毕业于北京大学法法学院</span>
                            </p>
                            <p class="item-text">
                                <span class="text-title">简介：</span>
                                <span>拥有十五年执业经验，经办案件达680余件。曾担任北大方正集团法务总监，担任北广、中粮、中石油等集团专项法律培训讲师，目前为北京同创律师事务所合伙人。</span>
                            </p>
                            <p class="item-text item-cases">
                                <span class="text-title">劳动用工服务案例：</span>
                                <span>
                                在北大方正集团有限公司担任法务总监期间，
                            王殿明律师健全和完善了集团公司及下属118个子公司经营管理制度及员工用工制度，
                            并负责全集团劳动用工纠纷处理。对北广、中粮、中石油等集团进行专项劳动用工法律培训。
                            担任上海徐峥影视、江苏省建工集团有限公司、斌凝祥融（集团）、北京东洲致胜建筑装饰、
                            北京旭隆阳光、北京聚善堂生物科技、北京金辰联盟科技、孙晓岐品牌咨询等多家公司的常年法律顾问。
                            参与顾问单位的劳动用工法律制度建设，担任企业劳动用工纠纷、劳动争议、仲裁、
                            侵权等劳动诉讼案件代理律师，胜诉率高达90%。
                            </span>
                            </p>
                        </el-col>
                        <el-col :span="6">
                            <div class="price">犀牛价：<span>¥40000</span></div>
                            <div class="price-tip">市场价＞50000</div>
                            <div class="price-btn">立即申请</div>
                        </el-col>
                    </el-row>
                </div>


                <div class="look-more">
                    <span class="look-text">查看更多律师</span>
                    <span class="look-img"></span>
                </div>
            </div>
        </div>

        <div class="our-wrapper">
            <div class="our-content">
                <h3 class="h3-title">我们的保障</h3>
                <el-row :gutter="60">
                    <el-col :span="6">
                        <div class="our-item">
                            <div class="item-img" style="background-image:url('../../../static/image/our1.png')"></div>
                            <div class="item-title">全程跟踪</div>
                            <div class="item-tips">犀牛法律管家全程陪护，随时接受客户反馈意见，并及时处理</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="our-item">
                            <div class="item-img" style="background-image:url('../../../static/image/our2.png')"></div>
                            <div class="item-title">全程跟踪</div>
                            <div class="item-tips">如果客户不满意律师的服务，可随时向犀牛法律平台提出更换律师</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="our-item">
                            <div class="item-img" style="background-image:url('../../../static/image/our3.png')"></div>
                            <div class="item-title">全程跟踪</div>
                            <div class="item-tips">律师服务受律师事务所和犀牛法律平台的双重监督</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="our-item">
                            <div class="item-img" style="background-image:url('../../../static/image/our4.png')"></div>
                            <div class="item-title">全程跟踪</div>
                            <div class="item-tips">经认定由于律师原因导致的损失，犀牛法律先行赔付</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="recommend-wrapper">
            <div class="recommend-content">
                <h3 class="h3-title">为您推荐</h3>
                <table>
                    <tr>
                        <td class="items">
                            <img class="item-img" src="../../../static/image/r1.png"/>
                            <h1 class="item-title">股权顶层架构设计</h1>
                            <p class="item-content">匹配战略布局——为企业生命线建立牢固的防火墙，优化商业模式——业务剥离，资本回流节税无忧</p>
                            <div class="item-btn">了解详情</div>
                        </td>
                        <td class="item-split"></td>
                        <td class="items">
                            <img class="item-img" src="../../../static/image/r2.png"/>
                            <h1 class="item-title">企业债务反清算</h1>
                            <p class="item-content">合理避债，滴水不漏</p>
                            <div class="item-btn">了解详情</div>
                        </td>
                        <td class="item-split"></td>
                        <td class="items">
                            <img class="item-img" src="../../../static/image/r3.png"/>
                            <h1 class="item-title">创业公司合同专项服务</h1>
                            <p class="item-content">匹配战略布局——建立健全企业合同管理制度，优化商业模式——对可能产生的合同纠纷有维权及应急体系</p>
                            <div class="item-btn">了解详情</div>
                        </td>
                    </tr>
                </table>

            </div>
        </div>

        <Footers/>
        <BackTop/>
    </section>
</template>
<script type="text/ecmascript-6">
    import Footers from '../template/footer.vue';
    import Navs from '../template/nav.vue';
    import TopBar from '../template/topBar.vue';
    import BackTop from '../template/backTop.vue';
    export default({
        data() {
            return {};
        },
        components: {
            Footers,
            Navs,
            TopBar,
            BackTop
        },
        methods: {
            move() {
                let target = document.getElementsByClassName('banner-content')[0];
                let targetMove = document.getElementsByClassName('banner-bg')[0];
                let c = {
                    x: (target.offsetWidth / 2),
                    y: target.offsetHeight / 2
                };
                target.onmousemove = function (e) {
                    e.preventDefault();
                    let _x = -(e.offsetX - c.x) * 0.01;
                    let _y = -(e.offsetY - c.y) * 0.01;
                    targetMove.style.transform = `translate3d(${_x}px,${_y}px,0) scale(1.1)`;
                    targetMove.style.webkitTransform = `translate3d(${_x}px,${_y}px,0) scale(1.1)`;
                    targetMove.style.transition = `all 0.1s ease-in-out`;
                    targetMove.style.webkitTransition = `all 0.1s ease-in-out`;
                };
                target.onmouseout = function () {
                    targetMove.style.transform = `translate3d(0px,0px,0) scale(1.1)`;
                    targetMove.style.webkitTransform = `translate3d(0px,0px,0) scale(1.1)`;
                    targetMove.style.transition = `all 0.3s ease-in-out`;
                    targetMove.style.webkitTransition = `all 0.3s ease-in-out`;
                };
            }
        },
        mounted() {
            this.move();
        }
    });
</script>
<style lang="scss" scoped>
    .banner-wrapper {
        min-width: 1100px;
        height: 500px;
        position: relative;
        overflow: hidden;
        .banner-bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: url("../../../static/image/bann.png") no-repeat;
            background-size: cover;
            background-position: center center;
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            -ms-transform: scale(1.1);
            -o-transform: scale(1.1);
            transform: scale(1.1);
            /*-webkit-transition: all 0.1s ease-in-out;*/
            /*-moz-transition: all 0.1s ease-in-out;*/
            /*-ms-transition: all 0.1s ease-in-out;*/
            /*-o-transition: all 0.1s ease-in-out;*/
            /*transition: all 0.1s ease-in-out;*/
            z-index: 1;
        }
        .banner-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .45);
            z-index: 9;
            .title {
                text-align: center;
                color: white;
                font-size: 34px;
                padding-top: 125px;
            }
            .desc {
                text-align: center;
                color: white;
                font-size: 22px;
                font-weight: 200;
                padding-top: 45px;
            }
            .btn-box {
                font-size: 0;
                text-align: center;
                margin-top: 110px;
                .btn {
                    display: inline-block;
                    width: 166px;
                    height: 38px;
                    border-radius: 38px;
                    line-height: 38px;
                    text-align: center;
                    background: #FF5A5A;
                    border: 2px solid #FF5A5A;
                    box-shadow: 0 20px 30px rgba(248, 126, 126, .2);
                    z-index: 1;
                    cursor: pointer;
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
                        background: url('../../../static/image/eps copy@3x.png') no-repeat;
                        background-size: cover;
                        vertical-align: middle;
                        margin-left: 6px;
                    }
                }
                .btn2 {
                    background: none;
                    border: 2px solid white;
                    box-shadow: none;
                    margin-left: 60px;
                }
            }
        }
    }

    .detail-wrapper {
        background: white;
        .detail-content {
            width: 1100px;
            margin: 0 auto;
            padding: 50px 0;
            .item-content {
                margin-bottom: 50px;
                .left-img {
                    width: 60px;
                    height: 60px;
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center center;
                    margin: 12px auto 0;
                }
                .left-title {
                    text-align: center;
                    color: #222222;
                    padding-top: 20px;
                }
                .items {
                    font-size: 14px;
                    color: #444444;
                    padding: 10px 0;
                    font-weight: 400;
                    position: relative;
                }
                .items:after {
                    position: absolute;
                    left: -16px;
                    top: 15px;
                    width: 4px;
                    height: 4px;
                    background: #444444;
                    border-radius: 4px;
                    content: '';

                }
            }
            .item-content:last-child {
                margin-bottom: 0;
            }

        }
    }

    .group-wrapper {
        background: #FAFAFA;
        .group-content {
            padding: 50px 0;
            width: 1100px;
            margin: 0 auto;
            .group-item {
                padding: 40px 0;
                border-bottom: 1px dashed #979797;
                .item-img {
                    display: block;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    margin: 0 auto;

                }
                .item-name {
                    color: #333333;
                    font-size: 16px;
                    text-align: center;
                    padding-top: 24px;
                }
                .item-tip {
                    color: #32A492;
                    font-size: 14px;
                    padding-top: 14px;
                    text-align: center;
                }
                .item-text {
                    font-size: 14px;
                    color: #666666;
                    line-height: 34px;
                    font-weight: 400;
                    .text-title {
                        color: #444444;
                        font-weight: 500;
                    }
                }
                .item-cases {
                    margin-top: 30px;
                }
                .price {
                    color: #333333;
                    font-size: 16px;
                    text-align: center;
                    padding-top: 30px;
                    span {
                        color: #FF6666;
                        font-size: 22px;
                    }
                }
                .price-tip {
                    font-size: 12px;
                    color: #BBBBBB;
                    text-decoration: line-through;
                    text-align: center;
                    padding-top: 10px;
                }
                .price-btn {
                    width: 140px;
                    height: 40px;
                    background: #FF6666;
                    border-radius: 5px;
                    text-align: center;
                    line-height: 39px;
                    color: white;
                    cursor: pointer;
                    margin: 30px auto 0;
                }
            }
            .group-item:last-child {
                border-bottom: none;
            }
            .look-more {
                width: 160px;
                height: 42px;
                border: 1px solid #FF6666;
                border-radius: 6px;
                text-align: center;
                line-height: 41px;
                font-size: 0;
                margin: 30px auto 0;
                cursor: pointer;
                .look-text {
                    font-size: 15px;
                    color: #FF6666;
                    display: inline-block;
                }
                .look-img {
                    display: inline-block;
                    width: 9px;
                    height: 14px;
                    margin-top: 13px;
                    padding-top: 0px;
                    vertical-align: top;
                    margin-left: 11px;
                    background: url('../../../static/image/rightren.png') no-repeat;
                    background-size: cover;
                    background-position: center center;

                }
            }
        }
    }

    .our-wrapper {
        background: white;
        .our-content {
            width: 1100px;
            padding: 50px 0 80px;
            margin: 0 auto;
            .our-item {
                .item-img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center center;
                    margin: 20px auto 0;
                }
                .item-title {
                    text-align: center;
                    font-size: 18px;
                    color: #222222;
                    padding-top: 28px;

                }
                .item-tips {
                    font-size: 14px;
                    color: #707070;
                    line-height: 22px;
                    padding-top: 28px;
                }
            }
        }
    }

    .recommend-wrapper {
        background: #FAFAFA;
        .recommend-content {
            width: 1100px;
            margin: 0 auto;
            padding: 50px 0 80px;
            table {
                width: 100%;
                .items {
                    width: 31.4%;
                    background: white;
                    box-shadow: 0 0 5px #C8C8C8;
                    padding: 20px 40px 120px;
                    border-radius: 2px 20px 2px 20px;
                    /*border-radius: 5px;*/
                    position: relative;
                    -webkit-transition: all 0.3s ease-in-out;
                    -moz-transition: all 0.3s ease-in-out;
                    -ms-transition: all 0.3s ease-in-out;
                    -o-transition: all 0.3s ease-in-out;
                    transition: all 0.3s ease-in-out;
                    .item-img {
                        display: block;
                        width: 40px;
                        height: 40px;
                        margin-top: 10px;
                        margin-bottom: 25px;
                    }
                    .item-title {
                        color: #333333;
                        font-size: 17px;
                        padding-bottom: 40px;
                    }
                    .item-content {
                        color: #666666;
                        font-size: 14px;
                        line-height: 30px;
                        font-weight: 300;
                    }
                    .item-btn {
                        position: absolute;
                        left: 40px;
                        bottom: 55px;
                        width: 120px;
                        height: 30px;
                        border-radius: 30px;
                        border: 1px solid #FF6D6D;
                        text-align: center;
                        line-height: 30px;
                        color: #FF6D6D;
                        font-size: 14px;
                        cursor: pointer;

                    }
                }
                .items:hover {
                    -webkit-transform: translate3d(0, -30px, 0);
                    -moz-transform: translate3d(0, -30px, 0);
                    -ms-transform: translate3d(0, -30px, 0);
                    -o-transform: translate3d(0, -30px, 0);
                    transform: translate3d(0, -30px, 0);
                    border-radius: 20px 2px 20px 2px;
                    /*border-radius: 10px;*/
                    box-shadow: 0 0 15px #C8C8C8;
                }
            }

        }
    }

    .h3-title {
        color: #222222;
        font-size: 24px;
        text-align: center;
        margin-bottom: 40px;
    }
</style>
