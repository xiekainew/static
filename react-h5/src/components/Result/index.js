import React from 'react'
import request from '@/common/request'
import {
  Page,
  Preview,
  PreviewFooter,
  PreviewButton
} from 'react-weui'
import Placeholder from '@/components/Placeholder'
import ProductFooter from '@/components/ProductFooter'
import WarnIcon from '@/assets/imgs/1.png'
import SuccessIcon from '@/assets/imgs/2.png'
import FailIcon from '@/assets/imgs/3.png'
import CallIcon from '@/assets/imgs/4.png'
import {RESULT_TYPE} from '@/common/const'
import './style.less'

class Result extends React.Component {
    constructor(props) {
        super(props);
        var data = this.props.data;
        this.state = {
            productId: data.productId,
            resultType: data.resultType,
            title: data.title,
            content: data.content,
            hotLine: data.hotLine,
            btnTitle: data.btnTitle,
            third: null
        };
    }

    componentDidMount() {
        this.fetchThird();
    }

    fetchThird() {
        let params = {
            thirdId: this.state.productId
        }
        request.get('/api/v1/client/insurance/third/detail', {params: params})
            .then(res => {
                console.log('third: ', res.data.data)
                if (res.data.statusCode === 0) {
                    this.setState({third: res.data.data})
                }
            })
            .catch(err => {
                
            })
    }

    resultBtnClick() {
        this.props.resultBtnClick(false);
    }

    render() {
        var resultImg = SuccessIcon;
        if (this.state.resultType === RESULT_TYPE.WARN) { // 警告
            resultImg = WarnIcon;
        } else if (this.state.resultType === RESULT_TYPE.FAIL) { // 失败
            resultImg = FailIcon;
        } else if (this.state.resultType === RESULT_TYPE.CALL) { // 电话
            resultImg = CallIcon;
        }
        var phone = '';
        if (this.state.third) {
            phone = this.state.third.servicePhone;
        }
        return (
            <Page transition={true} infiniteLoader={false} ptr={false} className="page-result">
                <div>
                    <Placeholder height="50" />
                    <img src={resultImg} className="result-image" alt="result"/>
                    <div className="mlr18 title">{this.state.title}</div>
                    <div className="mlr18 content text-block pre-line" style={{display: this.state.content == null || this.state.content === '' ? 'none' : '', lineHeight: '25px'}}>
                        {this.state.content}
                    </div>
                    <div className="mlr18 hot-line" style={{marginTop: this.state.content == null || this.state.content === '' ? '20px' : '40px'}} >
                        如有疑问请致电客服电话：<em>{phone}</em>
                    </div>
                </div>
                <Preview className="fixed-bottom full-width">
                    <ProductFooter className='white-bg' thirdId={this.state.productId}/> 
                    <Placeholder height="20" />
                    <PreviewFooter>
                        <PreviewButton primary className="btn btn-primary" onClick={this.resultBtnClick.bind(this)} >{this.state.btnTitle}</PreviewButton>
                    </PreviewFooter>
                </Preview>
            </Page>
        );
    }
}

export default Result;
