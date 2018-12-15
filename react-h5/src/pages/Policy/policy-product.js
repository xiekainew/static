import React from 'react'
import request from '@/common/request'
import {
  Toast,
  Flex,
  FlexItem,
  Preview,
  PreviewFooter,
  PreviewButton,
  Panel,
  PanelHeader,
  PanelBody,
  MediaBox,
  MediaBoxDescription,
  Cells,
  Cell,
  CellBody,
  CellFooter,
  Toptips
} from 'react-weui'
import {img} from '@/common/utils'
import Placeholder from '@/components/Placeholder'
import ProductFooter from '@/components/ProductFooter'
import Industry from './industry'
import defaultCover from '@/assets/imgs/cover.png'
import Notice from '@/pages/Product/notice'
import './policy-product.less'

let renbaoProductID = "a792595c-6d15-49a4-8665-f5248f1a6497"; // 人保健康产品ID
let yonganProductID = "c9f63b90-718c-444a-a7bf-a6c3fd867823"; // 永安百万产品ID

class PolicyProduct extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            toastTimer: null,
            showToast: false,
            showCover: false,
            showNotice: false,
            showResult: false,
            showIndustry: false,
            hideIndustry: false,
            p: {},
            insureAmount: [
                {content: '10万', selected: true},
                {content: '20万', selected: false},
                // {content: '300万', selected: false},
                // {content: '400万', selected: false},
            ],
            insureAge: [
                {content: '18-30岁', selected: true},
                {content: '30-50岁', selected: false},
                {content: '50-70岁', selected: false},
            ],
            insureTerm: [
                {content: '趸交1', selected: true},
                {content: '3年', selected: false},
                {content: '5年', selected: false},
                {content: '10年', selected: false},
                {content: '20年', selected: false},
            ],
            // 计算保费相关数据
            productId: this.props.match.params.id,
            coverage: 0,
            combination: '',
            items: [],
            // 行业
            industry: '',
            // 保费
            premium: '0'
        };
        this.fetch = this.fetch.bind(this);
        this.noticeHandle = this.noticeHandle.bind(this);
        this.noticeCallback = this.noticeCallback.bind(this);
        this.showOrHideCover = this.showOrHideCover.bind(this);
        this.gotoInsure = this.gotoInsure.bind(this);
        this.selectIndustry = this.selectIndustry.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id === renbaoProductID) { // 人保
            this.setState({
                coverage: 100000,
                combination: '组合一'
            })
        } else {
            this.setState({
                coverage: 5000000
            })
        }
        this.fetch();
    }

    componentWillUnmount() {
        this.state.toastTimer && clearTimeout(this.state.toastTimer);
    }

    // 获取产品详情
    fetch(done) {
        this.setState({loading: true});
        let params = {
            productId: this.props.match.params.id
        }
        request.get('/api/v1/client/insurance/product/detail', {params: params})
            .then(res => {
                done && done()
                console.log('detail: ', res.data.data)
                this.setState({loading: false})
                if (res.data.statusCode === 0) {
                    this.setState({
                        p: res.data.data,
                    });
                    if (res.data.data.id === yonganProductID) { // 永安百万
                        this.setState({
                            hideIndustry: true
                        })
                        var data = {
                            coverage: this.state.coverage,
                            productId: this.state.productId,
                            items: [
                                // {key: 'payDuration', value: this.state.p.payDuration},
                                {key: 'payDuration', value: "一年交"},
                                {key: 'insuredDuration', value: this.state.p.insuredDuration}
                            ]
                        }
                        this.calPremium(data);
                    }
                }
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    // 计算保费
    calPremium(data) {
        request.post('/api/v1/client/insurance/product/premium/cal', data)
            .then(res => {
                console.log('cal: ', res.data.data)
                if (res.data.statusCode === 0) {
                    this.setState({
                        premium: res.data.data
                    });
                }
            })
            .catch(err => {

            })
    }

    // 投保须知
    noticeHandle () {
        this.setState({showNotice: true})
    }

    // 投保须知回调
    noticeCallback(showNotice) {
        return this.setState({
            showNotice: showNotice
        })
        // this.props.history.push(`/policy/pay`, {name: '保险产品名称', amount: '2000', payType: '支付宝'})
    }

    // 显示或隐藏遮罩层
    showOrHideCover() {
        this.setState({
            showCover: !this.state.showCover
        })
    }

    // 跳转到投保页面
    gotoInsure() {
        if (this.state.premium === '0') {
            this.setState({showToast: true});

            this.state.setState({
              toastTimer: setTimeout(()=> {
                this.setState({showToast: false})
              }, 2000)
            })

            return;
        }
        this.props.history.push(`/policyinsure`,
            {
            policy: this.state.p ,
            premium : this.state.premium,
            industry : this.state.industry,
            }
        )
    }

    // 选择保额
    selectInsureAmount(index) {
        var insureAmount = [];
        for(let i = 0; i < this.state.insureAmount.length; ++i) {
            var obj = this.state.insureAmount[i];
            obj = {content: obj.content, selected: false};
            if (i === index) {
                obj = {content: obj.content, selected: true};
            }
            insureAmount.push(obj);
        }
        this.setState({
            insureAmount: insureAmount,
        });

        var coverage = 0;
        var combination = "";
        if (index === 0) {
            coverage = 100000;
            combination = "组合一";
        } else {
            coverage = 200000;
            combination = "组合二";
        }
        this.setState({
            coverage: coverage,
            combination: combination
        })
        var data = {
            coverage: coverage,
            productId: this.state.productId,
            items: [
                { key: 'occupationCode', value: this.state.industry.type + '类' },
                { key: 'combination', value: combination }
            ]
        }
        // 没有选择行业的时候不试算保费
        if (this.state.industry === '') {
            return;
        }
        this.calPremium(data);
    }

    // 选择投保年龄
    selectInsureAge(index) {
        var insureAge = [];
        for(let i = 0; i < this.state.insureAge.length; ++i) {
            var obj = this.state.insureAge[i];
            obj = {content: obj.content, selected: false};
            if (i === index) {
                obj = {content: obj.content, selected: true};
            }
            insureAge.push(obj);
        }
        this.setState({
            insureAge: insureAge
        })
    }

    // 选择投保期限
    selectInsureTerm(index) {
        var insureTerm = [];
        for(let i = 0; i < this.state.insureTerm.length; ++i) {
            var obj = this.state.insureTerm[i];
            obj = {content: obj.content, selected: false};
            if (i === index) {
                obj = {content: obj.content, selected: true};
            }
            insureTerm.push(obj);
        }
        this.setState({
            insureTerm: insureTerm
        })
    }

    // 选择行业
    selectIndustry() {
        console.log('选择行业');
        this.setState({
            showIndustry: true
        })
    }

    // 选择行业后的回调函数
    selectIndustryCallback(industry) {
        console.log(`${industry.code}: ${industry.occupationName}`);
        this.setState({
            showIndustry: false,
            industry: industry
        })
        var data = {
            coverage: this.state.coverage,
            productId: this.state.productId,
            items: [
                {key: 'occupationCode', value: industry.type + '类'},
                { key: 'combination', value: this.state.combination }
            ]
        }
        this.calPremium(data);
    }

    // 关闭行业选择页面
    selectIndustryClose() {
        this.setState({
            showIndustry: false
        })
    }

    // 结果页按钮点击事件
    resultBtnCallback(flag) {
        console.log('结果按钮点击');
        this.setState({
            showResult: flag
        })
    }

    render() {
        if (!this.state.p || !this.state.p.id) {
            return null
        }
        let p = this.state.p
        return (
            <div>
                <div style={{display: this.state.showNotice ? 'none':'block'}}>
                    {
                        this.state.loading ? <div></div> :
                        <div className="page-product-detail">
                            <img src={img(p.minPic) || defaultCover} className="product-cover" alt="cover" />
                            <div className="bg-white pb15">
                                <Flex className="clearfix">
                                    <FlexItem>
                                        <div className="pro-detail-top pl18 pr18 pt18 pb18">
                                            <span><em>￥</em>{p.referencePremium}</span>
                                            <span>元起</span>
                                        </div>
                                    </FlexItem>
                                </Flex>
                                <Flex>
                                    <FlexItem>
                                        <div className="sub-row ml18">
                                            <div>{p.insuredAge}</div>
                                            <div>投保年龄</div>
                                        </div>
                                    </FlexItem>
                                    <FlexItem style={{width:'30%', flex:'initial'}}>
                                        <div className="sub-row ml18">
                                            <div>{p.insuredDuration}</div>
                                            <div>保险期限</div>
                                        </div>
                                    </FlexItem>
                                </Flex>
                                <Flex>
                                    <FlexItem>
                                        <div className="sub-row ml18 mt15">
                                            <div>{p.insuranceCompanyName}</div>
                                            <div>保险公司</div>
                                        </div>
                                    </FlexItem>
                                </Flex>
                            </div>
                            <Panel>
                                <PanelHeader>产品特色</PanelHeader>
                                <PanelBody>
                                    <MediaBox>
                                        <MediaBoxDescription className="text-block pre-line">
                                            {p.productFeature}
                                        </MediaBoxDescription>
                                    </MediaBox>
                                </PanelBody>
                            </Panel>
                            <Cells className="mt12">
                                <Cell access onClick={this.noticeHandle}>
                                    <CellBody>投保须知</CellBody>
                                    <CellFooter />
                                </Cell>
                            </Cells>
                            <ProductFooter thirdId={this.state.p.thirdId}/>
                            <Placeholder height="64"/>

                            <Preview>
                                <PreviewFooter className="fixed-bottom full-width">
                                    <PreviewButton primary className="btn btn-primary" onClick={this.showOrHideCover}>立即投保</PreviewButton>
                                </PreviewFooter>
                            </Preview>
                        </div>
                    }
                    <Toast icon="loading" show={this.state.loading}>Loading...</Toast>
                </div>
                {/* 灰色遮罩层 */}
                <div className="cover" style={{display: this.state.showCover ? '' : 'none'}} onClick={this.showOrHideCover} />
                {/* 弹出的选择框 */}
                <div className="bottom-view" style={{display: this.state.showCover ? '' : 'none'}}>
                    <div className="bottom-view-item">保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：<em>{this.state.premium}元</em></div>
                    <div className="bottom-view-item">保障期限：{p.insuredDuration}</div>
                    <div className="bottom-view-item">投保期限：{p.payDuration}</div>
                    <div className="bottom-view-item" style={{display: this.state.hideIndustry ? 'none' : '', marginLeft: '0', marginRight: '0'}} >
                        <Flex>
                            <span style={{marginLeft: '7px'}}>职业类别：</span>
                            <FlexItem>
                                <span>{this.state.industry.occupationName}</span>
                            </FlexItem>
                            <FlexItem style={{width:'25%', flex:'initial'}}>
                                <span className="search-industry-btn" onClick={this.selectIndustry}>查询</span>
                            </FlexItem>
                        </Flex>
                    </div>
                    <div className="bottom-view-item" style={{display: this.state.hideIndustry ? '' : 'none'}}>保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额：500万</div>
                    <Panel style={{display: this.state.hideIndustry ? 'none' : ''}}>
                        <PanelHeader>保额：</PanelHeader>
                        <PanelBody>
                            <Flex>
                                {
                                    this.state.insureAmount.map((item, index) => {
                                        return (
                                            <FlexItem key={index}>
                                                <div className={
                                                        item.selected
                                                        ? "bottom-view-flexitem bottom-view-flexitem-selected"
                                                        : "bottom-view-flexitem bottom-view-flexitem-normal"
                                                        }

                                                    onClick={this.selectInsureAmount.bind(this, index)}>
                                                        {item.content}
                                                </div>
                                            </FlexItem>
                                        )
                                    })
                                }
                            </Flex>
                        </PanelBody>
                    </Panel>
                    <Placeholder height="74" />
                    <Preview>
                            <PreviewFooter className="fixed-bottom full-width">
                                <PreviewButton
                                        primary
                                        className="btn btn-primary"
                                        onClick={this.gotoInsure}>
                                    立即投保
                                </PreviewButton>
                            </PreviewFooter>
                    </Preview>
                    <Toptips type="warn" show={this.state.showToast}> 请先进行保费试算 </Toptips>
                </div>
                {/* 选择行业 */}
                {
                    this.state.showIndustry ? <Industry handle={this.selectIndustryCallback.bind(this)} close={this.selectIndustryClose.bind(this)} /> : ''
                }
                {/* 投保须知 */
                    this.state.showNotice ? <Notice datas={p} handle={this.noticeCallback}/> : ''
                }
            </div>
        );
    }
}

export default PolicyProduct;
