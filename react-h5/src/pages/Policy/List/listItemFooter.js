import React from 'react';
import './style.less';
import {RESULT_TYPE} from '@/common/const'

class ItemFooter extends React.Component {

    cancel() {
        //取消订单
        console.log("点击取消订单按钮");
    }
    pay() {
        //支付
        console.log("点击立即支付按钮");
        this.props.history.push('/policy/pay', {policyId: this.props.item.policyId});
    }
    surrender() {
        //申请退保
        let data = {
                    productId: this.props.item.thirdId,
                    resultType: RESULT_TYPE.CALL,
                    title: '申请退保',
                    hotLine: '',
                    btnTitle: '查看保单',
                };
        this.props.showResultPage(true,data);
    }
    claims() {
        //申请理赔
        let data = {
                    productId: this.props.item.thirdId,
                    resultType: RESULT_TYPE.CALL,
                    title: '申请理赔',
                    hotLine: '',
                    btnTitle: '查看保单',
                };
        this.props.showResultPage(true,data);
    }
    again() {
        //再次投保
        this.props.history.push(`/policy/product/${this.props.item.productId}`)
    }
    render() {
        let item = this.props.item;
        let currentState = item.state;
        let footer;
        switch (currentState) {
            case "POLICY_UNDERWRITING_ING":
                //核保中 暂不显示取消订单
                // footer = (
                //     <div
                //         className="footer"
                //         onClick={this
                //         .cancel
                //         .bind(this)}>
                //         <div className="red">取消订单</div>
                //     </div>
                // );
                break;
            case "POLICY_PAYMENT_WAITING":
                //待付款  暂不显示取消订单
                footer = (
                    <div className="footer">
                        {/*<div
                            className="red"
                            onClick={this
                            .cancel
                            .bind(this)}>取消订单</div>*/}
                        <div
                            className="blue"
                            onClick={this
                            .pay
                            .bind(this)}>立即支付</div>
                    </div>
                );
                break;
            case "POLICY_UNDERWRITE_SUCCESS":
                //承保成功
                footer = (
                    <div className="footer">
                        <div
                            className="red"
                            onClick={this
                            .surrender
                            .bind(this)}>申请退保</div>
                        <div
                            className="blue"
                            onClick={this
                            .claims
                            .bind(this)}>申请理赔</div>
                    </div>
                );
                break;
            case "POLICY_FINISHED":
                //已结束
                footer = (
                    <div className="footer">
                        <div
                            className="blue"
                            onClick={this
                            .again
                            .bind(this)}>再次投保</div>
                    </div>
                );
                break;
            case "POLICY_CANCEL":
                //已取消
                break;
            case "POLICY_SURRENDER_SUCCESS":
                //已退保  退保成功
                break;
            default:
                break;
        }
        return (
            <div>
                {footer}
            </div>
        );
    }
}

export default ItemFooter;