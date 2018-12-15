import React from 'react';
import {
    Cells,
} from 'react-weui';
import './style.less';
import Item from './detailItem';
import ProductFooter from '@/components/ProductFooter';
import {RELATION_ENUM} from '@/common/const';
/**
 |--------------------------------------------------
 | 指定受益人详情信息
 |--------------------------------------------------
 */
class Beneficiary extends React.Component {
    state = {}

    render() {
        let beneficiaries = this.props.location.state.beneficiariesInfo;
        var list = beneficiaries.map((item, index) => {
            return <div key={index}>
                <Cells>
                    <Item title="与被保人关系" subTitle={this.getRelation(item.insuredRelation)}/>
                    <Item title="受益人姓名" subTitle={item.beneficiaryName}/>
                    <Item title="身份证号码" subTitle={item.beneficiaryIdentityCard}/>
                    <Item title="受益顺序" subTitle={item.beneficiaryOrder}/>
                    <Item title="受益比例" subTitle={item.beneficiaryRate + "%"}/>
                </Cells>
            </div>
        })
        return (
            <div>
                {list}
                <ProductFooter thirdId={this.props.match.params.id}/>
            </div>
        );
    }

    getRelation(insuredRelation) {
        let relation;
        switch (insuredRelation) {
            case RELATION_ENUM.RELATION_SELF:
                relation = '本人'
                break;
            case RELATION_ENUM.RELATION_MATE:
                relation = '配偶'
                break;
            case RELATION_ENUM.RELATION_PARENTS:
                relation = '父母'
                break;
            case RELATION_ENUM.RELATION_CHILDREN:
                relation = '子女'
                break;
            default:
                relation = '未知'
                break;
        }
        return relation;
    }
}

export default Beneficiary;