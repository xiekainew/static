import React from 'react';
import {Flex, FlexItem} from 'react-weui';
import './style.less';
import checking from '@/assets/imgs/checking.png';
import payReady from '@/assets/imgs/pay-ready.png';
import underwriteSuccess from '@/assets/imgs/underwrite_success.png';
import finished from '@/assets/imgs/finished.png';
import cancel from '@/assets/imgs/cancel.png';
import back from '@/assets/imgs/back.png';

class ListItem extends React.Component {

    detail(item) {
        this
            .props
            .history
            .push(`/policylist/${item.policyId}`,this.props.hideFooter)
    }
    render() {
        let item = this.props.item;
        let currentState = item.state;
        let src;
        switch (currentState) {
            case "POLICY_UNDERWRITING_ING":
                //核保中
                src = checking;
                break;
            case "POLICY_PAYMENT_WAITING":
                //待付款
                src = payReady;
                break;
            case "POLICY_UNDERWRITE_SUCCESS":
                //承保成功
                src = underwriteSuccess;
                break;
            case "POLICY_FINISHED":
                //已结束
                src = finished;
                break;
            case "POLICY_CANCEL":
                //已取消
                src = cancel;
                break;
            case "POLICY_SURRENDER_SUCCESS":
                //已退保  退保成功
                src = back;
                break;
            default:
                src = null;
                break;
        }
        return (
            <div
                className="policy-list-item bg-white"
                onClick={this
                .detail
                .bind(this, item)}>
                <img
                    src={src}
                    className={src === null
                    ? 'hidden'
                    : 'img'}
                    alt=""/>
                <div style={{
                    paddingTop: "20px"
                }}>{item.productName}</div>
                <Flex
                    style={{
                    marginTop: "10px",
                    alignItems: 'flex-end'
                }}>
                    <FlexItem>
                        <div className="policy-money">{item.payAmount}
                            <span>元</span>
                        </div>
                        <div className="policy-subTitle">投保金额</div>
                    </FlexItem>
                    <FlexItem>
                        <div>{item.insuredDuration}</div>
                        <div className="policy-subTitle">交费期限</div>
                    </FlexItem>
                    <FlexItem>
                        <div>{item.ownerName}</div>
                        <div className="policy-subTitle">投保人</div>
                    </FlexItem>
                </Flex>
            </div>
        );
    }
}

export default ListItem;