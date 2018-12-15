import React from 'react';
import {
    Toast,
    Cells,
    Cell,
    CellBody,
    CellFooter
} from 'react-weui';
import Item from './detailItem';
import Footer from './detailFooter';
import Placeholder from '@/components/Placeholder';
import ProductFooter from '@/components/ProductFooter';
import request from '@/common/request';
import './style.less';
import {POLICY_STATE,BENEFICIARY} from '@/common/const';
import ResultPage from '@/components/Result/';

/**
|--------------------------------------------------
| 保单详情页面
|--------------------------------------------------
*/
class Detail extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            loading: false,
            policyInfo: {},
            ownerInfo: {},
            insuredInfo: {},
            consultantInfo: {},
            beneficiariesInfo: {},
            paymentDatasInfo: {},
            resultPage: {
                show: false,
                data: {}
            }
        }
    }
    componentDidMount() {
        this.fetch();
        console.log()
    }
    fetch(done) {
        this.setState({loading: true})
        let params = {
            policyId: this.props.match.params.id
        }
        request
            .get('/api/v1/client/insurance/policy/find', {params: params})
            .then(res => {
                done && done()
                console.log('detail: ', res.data.data)
                this.setState({loading: false})
                if (res.data.statusCode === 0) {
                    let detail = res.data.data;
                    let policy = detail.policy; //保单详情
                    let owner = detail.owner; //投保人信息
                    let insured = detail.insured; //被保险人信息
                    let consultant = detail.consultant; //理财顾问信息
                    let beneficiaries = detail.beneficiaries; //受益人信息
                    let paymentDatas = detail.paymentDatas; //支付信息
                    this.setState({
                        policyInfo: policy,
                        ownerInfo: owner,
                        insuredInfo: insured,
                        consultantInfo: consultant,
                        beneficiariesInfo: beneficiaries,
                        paymentDatasInfo: paymentDatas
                    })
                }
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }
    toBeneficiaryDetail(){
        this.props.history.push(`/policylist/${this.state.policyInfo.thirdId}/beneficiary`,{beneficiariesInfo:this.state.beneficiariesInfo})
    }
    showResultPage(offset, data) {
        let resultPage = {
            show: offset,
            data: data
        };
        this.setState({resultPage: resultPage})
    }
    render() {
        if(!this.state.policyInfo || !this.state.policyInfo.id){
            return null;
        }
        let policyInfo = this.state.policyInfo;
        let state = policyInfo.state;
        let policyState = POLICY_STATE[state];
        return (
            <div>
                <div style={{display: this.state.resultPage.show?'none':'block'}}>
                    <Toast icon="loading" show={this.state.loading}>Loading...</Toast>
                    <Cells>
                        <Item title="产品名称" subTitle={policyInfo.productName}/>
                        <Item title="投保金额" subTitle={policyInfo.payAmount + "元"}/>
                        <Item title="缴费期限" subTitle={policyInfo.payingDuration}/>
                        <Item title="保障期限" subTitle={policyInfo.insuredDuration}/>
                        <Item title="保单状态" subTitle={policyState}/>
                        <Item title="下单时间" subTitle={policyInfo.createTime}/>
                        <Item title="支付时间" subTitle={policyInfo.payTime}/>
                        <Item title="生效日期" subTitle={policyInfo.effectTime}/>
                        <Item title="保单号" subTitle={policyInfo.id}/>
                        <Item title="保险公司" subTitle={policyInfo.insuranceCompanyName}/>
                        <Item title="投保人" subTitle={this.state.ownerInfo.ownerName}/>
                        <Item title="被投保人" subTitle={this.state.insuredInfo.insuredName}/> 
                        { policyInfo.beneficiaryType === BENEFICIARY.BENEFICIARY_TYPE_STATUTORY
                            ? <Item title="受益人" subTitle="法定受益人"/>
                            : <Cell access onClick={this.toBeneficiaryDetail.bind(this)}>
                                <CellBody>
                                    受益人
                                </CellBody>
                                <CellFooter>
                                    指定受益人
                                </CellFooter>
                            </Cell>
                        }
                    </Cells>
                    <ProductFooter thirdId={policyInfo.thirdId}/>
                    <Placeholder height="50"/>
                    <div style={{display:this.props.history.location.state ?'none':'block'}}>
                        <Footer policyInfo={policyInfo} history={this.props.history} showResultPage={this.showResultPage.bind(this)}/>
                    </div>
                </div>
                {this.state.resultPage.show
                    ? <ResultPage
                            data={this.state.resultPage.data}
                            resultBtnClick={this
                            .showResultPage
                            .bind(this)}/>
                    : ''
                }
            </div>
        );
    }
}

export default Detail;