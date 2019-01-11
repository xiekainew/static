<template>
    <section class="footer-wrapper">
        <el-row class="footer-content">
            <el-row>
                <el-col class="item" :span="5">
                    <div class="item-title">犀牛产品</div>
                    <p class="item-tips">犀牛法律app</p>
                    <p class="item-tips">犀牛企业法务app</p>
                    <p class="item-tips">犀牛法律订阅号</p>
                </el-col>
                <el-col class="item" :span="9">
                    <div class="item-title">联系我们</div>
                    <el-row class="item-tips">
                        <el-col class="label" :span="3">电话：</el-col>
                        <el-col :span="8">010-51077205</el-col>
                    </el-row>
                    <el-row class="item-tips">
                        <el-col class="label" :span="3">邮箱：</el-col>
                        <el-col :span="8">service@xiniufalv.com</el-col>
                    </el-row>
                    <el-row class="item-tips address">
                        <el-col class="label" :span="3">地址：</el-col>
                        <el-col :span="15" >北京市海淀区西北旺东路10号院10号楼中关村新兴产业联盟大厦3层320室</el-col>
                    </el-row>
                </el-col>
                <el-col class="item" :span="5">
                    <div class="item-title">犀牛法律</div>
                    <div class="item-erwei"></div>
                </el-col>
                <el-col class="item" :span="5">
                    <div class="item-title">犀牛企业法务</div>
                    <div class="item-erwei"></div>
                </el-col>
            </el-row>
            <p class="copyright">Copyright © 2015-2017 北京犀牛创世信息科技有限公司 版权所有</p>


        </el-row>
    </section>
</template>
<script type="text/ecmascript-6">

	export default({
		data() {
			return {};
		},
		methods: {

        },
		mounted() {
		}
	});
</script>
<style lang="scss" scoped>
.footer-wrapper{
    background: #363B48;
    padding-top: 50px;
    padding-bottom: 40px;
    .footer-content{
        width: 1100px;
        margin: 0 auto;
        .item{
            .item-title{
                font-family: PingFangSC-Regular;
                font-size: 17px;
                color: #FFFFFF;
                margin-bottom: 30px;
            }
            .item-tips{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #999EAA;
                margin-bottom: 15px;
                .label{
                    width: 10.8%;
                }
            }
            .address{
                line-height: 20px;
            }
            .item-erwei{
                width: 90px;
                height: 90px;
                background:url('../../../static/image/weweima.png') no-repeat;
                background-size: contain;
                background-position: center center;
            }
        }
        .copyright{
            font-family: PingFangSC-Regular;
            font-size: 15px;
            color: #999EAA;
            text-align: center;
            margin-top: 80px;
        }
    }
}
</style>
