import React from 'react';
import {Preview, PreviewFooter, PreviewButton} from 'react-weui';
import {RESULT_TYPE} from '@/common/const'

class Footer extends React.Component {

    cancel() {
        //取消订单 按钮暂时隐藏
        console.log("点击取消订单按钮");
    }

    pay() {
        //支付
        console.log("点击立即支付按钮");
        this.props.history.push('/policy/pay', {policyId: this.props.policyInfo.id});
    }

    surrender() {
        //申请退保
        let data = {
            productId: this.props.policyInfo.thirdId,
            resultType: RESULT_TYPE.CALL,
            title: '申请退保',
            hotLine: '',
            btnTitle: '查看保单'
        };
        this
            .props
            .showResultPage(true, data);
    }

    claims() {
        //申请理赔
        let data = {
            productId: this.props.policyInfo.thirdId,
            resultType: RESULT_TYPE.CALL,
            title: '申请理赔',
            hotLine: '',
            btnTitle: '查看保单'
        };
        this
            .props
            .showResultPage(true, data);
    }

    again() {
        //再次投保
        this
            .props
            .history
            .push(`/policy/product/${this.props.item.productId}`)
    }

    render() {
        let currentState = this.props.policyInfo.state;
        let footer;
        if (currentState === "POLICY_UNDERWRITING_ING") {
            //核保中  暂不显示取消订单
            footer = (
                // <Preview style={{zIndex: 9999,}}>
                //     <PreviewBody></PreviewBody>
                //     <PreviewFooter className="fixed-bottom full-width">
                //         <PreviewButton
                //             className="bg-white color-orange"
                //             onClick={this
                //             .cancel
                //             .bind(this)}>取消订单</PreviewButton>
                //     </PreviewFooter>
                // </Preview>
                <div></div>
            )
        } else if (currentState === "POLICY_PAYMENT_WAITING") {
            //代付款 暂不显示取消订单
            footer = (
                <Preview>
                    <PreviewFooter className="fixed-bottom full-width" style={{zIndex: 9999,}}>
                        {/*<PreviewButton
                         className="bg-white color-orange"
                         onClick={this
                         .cancel
                         .bind(this)}>取消订单</PreviewButton>*/}
                        <PreviewButton
                            primary
                            className="btn btn-primary"
                            onClick={this
                                .pay
                                .bind(this)}>立即支付</PreviewButton>
                    </PreviewFooter>
                </Preview>
            )
        } else if (currentState === "POLICY_UNDERWRITE_SUCCESS") {
            //承保成功
            footer = (
                <Preview>
                    <PreviewFooter className="fixed-bottom full-width" style={{zIndex: 9999,}}>
                        <PreviewButton
                            className="bg-white color-orange"
                            onClick={this
                                .surrender
                                .bind(this)}>申请退保</PreviewButton>
                        <PreviewButton
                            primary
                            className="btn btn-primary"
                            onClick={this
                                .claims
                                .bind(this)}>申请理赔</PreviewButton>
                    </PreviewFooter>
                </Preview>
            )
        } else if (currentState === "POLICY_FINISHED") {
            //已结束
            footer = (
                <Preview>
                    <PreviewFooter className="fixed-bottom full-width" style={{zIndex: 9999,}}>
                        <PreviewButton
                            primary
                            className="btn btn-primary"
                            onClick={this
                                .again
                                .bind(this)}>再次投保</PreviewButton>
                    </PreviewFooter>
                </Preview>
            )
        } else {
            footer = (
                <div></div>
            );
        }
        return (
            <div>
                {footer}
            </div>
        );
    }
}

export default Footer;
