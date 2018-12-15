import React from 'react'
import request from '@/common/request'
import {
  Page,
  Cell,
  Toast,
  Preview,
  PreviewFooter,
  PreviewButton
} from 'react-weui'
import './industry.less'
import Placeholder from '@/components/Placeholder'

class Industry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            list: []
        };
    }

    componentDidMount() {
        this.fetch();
    }

    toggle(item, index) {
        item._open = !item._open
        let list = []
        list = this.state.list
        list[index] = item
        this.setState({list: list})
    }

    selectIndustry(industry) {
        console.log('选择的职业：' + industry.parentName)
        this.props.handle(industry);
    }

    close () {
        this.props.close()
    }

    // 获取行业列表
    fetch(done) {
        this.setState({loading: true});
        request.get('/api/v1/client/insurance/occupation/list')
            .then(res => {
                done && done()
                console.log('list: ', res.data.data)
                this.setState({loading: false})
                if (res.data.statusCode === 0) {
                    let industry = res.data.data;
                    let keys = Object.keys(industry);
                    var list = [];
                    for (let i = 0; i < keys.length; ++i) {
                        let obj = {
                            title: keys[i],
                            _open: false,
                            content: industry[keys[i]]
                        }
                        list.push(obj);
                    }
                    this.setState({
                        list: list
                    })
                }
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    render() {
        return (
            <Page transition={true} infiniteLoader={false} ptr={false} className="page-industry">
                <div style={{backgroundColor: '#ffffff'}}>
                    {
                        this.state.list.map((item, index) => (
                            <div className="cells-sub" key={index}>
                                <div className="weui-cell weui-cell_access" onClick={this.toggle.bind(this, item, index)}>
                                    <div className="weui-cell__bd one-line">{item.title}</div>
                                    <div className={item._open ? 'weui-cell__ft cell-down' : 'weui-cell__ft'}></div>
                                </div>
                                {
                                    item._open ?
                                    (
                                        item.content.map((subItem, subIndex) => (
                                            <Cell access key={subIndex} onClick={this.selectIndustry.bind(this, subItem)}>
                                                <div className="one-line">
                                                    {subItem.occupationName}
                                                </div>
                                                
                                            </Cell>
                                        ))
                                    ) : ''
                                }
                            </div>
                        ))
                    }
                </div>
                <Placeholder height="50" />
                <Preview>
                    <PreviewFooter className="fixed-bottom full-width">
                        <PreviewButton
                            primary
                            className="btn btn-primary"
                            onClick={this.close.bind(this)}
                        >
                            关闭
                        </PreviewButton>
                    </PreviewFooter>
                </Preview>
                <Toast icon="loading" show={this.state.loading}>Loading...</Toast>
            </Page>
        );
    }
}

export default Industry;
