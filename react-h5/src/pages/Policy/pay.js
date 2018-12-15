import React from 'react'
import request from '@/common/request'
import {
  Page,
  Toast,
  Preview,
  PreviewFooter,
  PreviewButton,
  Cells,
  Cell,
  CellBody,
  CellFooter,
  Dialog,
  Toptips
} from 'react-weui'
import ProductFooter from '@/components/ProductFooter'
import Placeholder from '@/components/Placeholder'
import Result from '@/components/Result'
import {RESULT_TYPE, POLICY_STATE} from '@/common/const'
import './pay.less'

class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showToast: false,
            toastTimer: null,
            showSuccessResult: false,
            showFailResult: false,
            showDialog: false,
            policyId: this.props.history.location.state.policyId,
            p: null,
            payCode: '',
            dialogButtons: [
                {
                    type: 'default',
                    label: '支付遇到问题，重新支付',
                    onClick: this.hideDialog.bind(this)
                },
                {
                    type: 'primary',
                    label: '已完成支付',
                    onClick: this.checkOrderState.bind(this)
                }
            ]
        }
        this.payNow = this.payNow.bind(this);
    }

    componentDidMount() {
        console.log('policyId: ' + this.state.policyId);
        this.getPolicyDetail();
    }

    componentWillUnmount() {
        this.state.toastTimer && clearTimeout(this.state.toastTimer);
    }

    // 隐藏dialog
    hideDialog() {
        this.setState({
            showDialog: false
        })
    }

    // 查询订单状态
    checkOrderState() {
        this.setState({
            showDialog: false,
            loading: true
        })
        let params = {
            payCode: this.state.payCode
        }
        request.get('/api/v1/client/insurance/payment/detail', {params: params})
            .then(res => {
                console.log('hh: ', res.data.data)
                this.setState({loading: false})
                if (res.data.statusCode === 0) {
                    var payState = res.data.data.payState;
                    if (payState === POLICY_STATE.POLICY_PAYMENT_SUCCESS) { // 付款成功
                        this.setState({
                            showSuccessResult: true,
                            showFailResult: false,
                            showToast: false
                        });
                    } else if (payState === POLICY_STATE.POLICY_PAYMENT_FAIL) { // 付款失败
                        this.setState({
                            showSuccessResult: false,
                            showFailResult: true,
                            showToast: false
                        });
                    } else { // 待付款
                        this.setState({
                            showSuccessResult: false,
                            showFailResult: false,
                            showToast: true
                        });
                    }
                    this.state.setState({
                        toastTimer: setTimeout(()=> {
                            this.setState({showToast: false})
                        }, 2000)
                    })
                }
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    // 获取保单详情
    getPolicyDetail() {
        this.setState({loading: true});
        let params = {
            policyId: this.state.policyId
        }
        request.get('/api/v1/client/insurance/policy/find', {params: params})
            .then(res => {
                console.log('detail: ', res.data.data)
                this.setState({loading: false})
                if (res.data.statusCode === 0) {
                    this.setState({
                        p: res.data.data
                    })
                }
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    // 立即支付
    payNow() {
        this.setState({loading: true});
        var p = this.state.p;
        let data = {
            amount: p.policy.payAmount,
            id: '',
            ownerName: p.owner.ownerName,
            ownerPhone: p.owner.ownerPhone,
            payCode: '',
            payState: 'POLICY_INIT',
            payTaskCode: '',
            payType: 'WACHAT_PAY_H5',
            payingDuration: p.policy.payingDuration,
            policyCode: p.policy.policyCode,
            policyId: this.state.policyId,
            productName: p.policy.productName,
            tradeCode: p.policy.tradeCode
        };
        request.post('/api/v1/client/insurance/payment/save', data)
            .then(res => {
                console.log('pay: ', res.data.data)
                this.setState({loading: false});
                if (res.data.statusCode === 0) {
                    console.log('codeUrl: ' + res.data.data.codeUrl);
                    window.location.href = res.data.data.codeUrl;
                    this.setState({
                        showDialog: true,
                        payCode: res.data.data.payCode
                    })
                }
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    // 查看保单
    viewPolicy() {
        this.props.history.push(`/policylist/${this.state.policyId}`)
    }

    render() {
        if (!this.state.p) {
            return null
        }
        let p = this.state.p;
        var resultPhone = '';
        if (p.owner.ownerPhone) {
            var phone = p.owner.ownerPhone;
            var prefix = phone.substring(0, 3);
            var subfix = phone.substring(7);
            resultPhone = prefix + '****' + subfix;
        }
        return (
            <Page transition={true} infiniteLoader={false} ptr={false}>
                <Cells className="mt0">
                    <Cell>
                        <CellBody>保险名称</CellBody>
                        <CellFooter>{p.policy.productName}</CellFooter>
                    </Cell>
                    <Cell>
                        <CellBody>保险金额</CellBody>
                        <CellFooter><em>{p.policy.payAmount}</em>元</CellFooter>
                    </Cell>
                    <Cell>
                        <CellBody>支付方式</CellBody>
                        <CellFooter>微信支付</CellFooter>
                    </Cell>
                </Cells>
                
                <Preview className="fixed-bottom full-width">
                    {
                        console.log('thirdId: ' + p.policy.thirdId)
                    }
                    <ProductFooter thirdId={p.policy.thirdId}/>
                    <Placeholder height="20" />
                    <PreviewFooter>
                        <PreviewButton primary className="btn btn-primary" onClick={this.payNow}>立即支付</PreviewButton>
                    </PreviewFooter>
                </Preview>
                <Dialog type="ios" title="" buttons={this.state.dialogButtons} show={this.state.showDialog}>
                    请确认微信支付是否已完成
                </Dialog>
                <Toast icon="loading" show={this.state.loading}>Loading...</Toast>
                <Toptips type="warn" show={this.state.showToast}> 您的订单处于待支付状态 </Toptips>
                {
                    this.state.showSuccessResult ? <Result data={
                        {
                            productId: p.policy.thirdId,
                            resultType: RESULT_TYPE.SUCCESS,
                            title: '保单支付成功',
                            content: '您的保单等待保险公司承保\n承保结果短信通知到您的预留手机\n' + resultPhone,
                            hotLine: '',
                            btnTitle: '查看保单',
                        }
                    } resultBtnClick={this.viewPolicy.bind(this)} /> : ''
                }
                {
                    this.state.showFailResult ? <Result data={
                        {
                            productId: p.policy.thirdId,
                            resultType: RESULT_TYPE.FAIL,
                            title: '支付失败',
                            content: '',
                            hotLine: '',
                            btnTitle: '立即支付',
                        }
                    } resultBtnClick={this.payNow.bind(this)} /> : ''
                }
            </Page>
        );
    }
}

export default Pay;
