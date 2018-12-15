import React from 'react';
import {
    Page,
    Toast,
    Tab,
    TabBody,
    NavBar,
    NavBarItem
} from 'react-weui';
import './style.less';
import request from '@/common/request';
import ListItem from './listItem';
import ItemFooter from './listItemFooter';
import ResultPage from '@/components/Result/';

/**
 |--------------------------------------------------
 | 保单查询列表页面
 |--------------------------------------------------
 */
class Policy extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            loading: false,
            mineList: [],
            consumerList: [],
            tab: 0,
            resultPage: {
                show: false,
                data: {}
            }
        }
    }

    componentDidMount() {
        this.fetch(null, 0);
        this.fetch(null, 1);
    }

    fetch(done, tab = this.state.tab) {
        this.setState({loading: true});
        let api = tab === 0 ?
            '/api/v1/client/insurance/policy/finance/list' :
            '/api/v1/client/insurance/policy/owner/list';
        let params = tab === 0
            ? {financialPlannerId: 'financial-planner-id-001'}
            : {clientOwnerId: 'client-owner-id-001'};
        request
            .get(api, {params: params})
            .then(res => {
                done && done();
                console.log('detail:', res.data.data);
                this.setState({loading: false});
                if (res.data.statusCode === 0) {
                    if (tab === 0) {
                        this.setState({
                            consumerList: res.data.data
                        })
                    } else {
                        this.setState({
                            mineList: res.data.data
                        })
                    }
                }
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    showResultPage(offset, data) {
        let resultPage = {
            show: offset,
            data: data
        };
        this.setState({resultPage: resultPage})
    }

    render() {
        var minePolicyList = this
            .state
            .mineList
            .map((item, index) => {
                return <div key={index}>
                    <ListItem item={item} history={this.props.history}/>
                    <ItemFooter
                        item={item}
                        history={this.props.history}
                        showResultPage={this
                            .showResultPage
                            .bind(this)}/>
                </div>
            });
        var consumerPolicyList = this
            .state
            .mineList
            .map((item, index) => {
                return <div key={index}>
                    <ListItem item={item} history={this.props.history} hideFooter={true}/>
                </div>
            });
        return (
            <div>
                <Page
                    transition={true}
                    infiniteLoader={true}
                    ptrOnRefresh={this
                        .fetch
                        .bind(this)}>
                    <Toast icon="loading" show={this.state.loading}>Loading...</Toast>
                    <Tab>
                        <NavBar >
                            <NavBarItem
                                active={this.state.tab === 0}
                                onClick={e => this.setState({tab: 0})}>好友保单</NavBarItem>
                            <NavBarItem
                                active={this.state.tab === 1}
                                onClick={e => this.setState({tab: 1})}>我的保单</NavBarItem>
                        </NavBar>
                        <TabBody>
                            <div
                                style={{
                                    display: this.state.tab === 0
                                        ? null
                                        : 'none'
                                }}>
                                {consumerPolicyList}
                            </div>
                            <div
                                style={{
                                    display: this.state.tab === 1
                                        ? null
                                        : 'none'
                                }}>
                                {minePolicyList}
                            </div>
                        </TabBody>
                    </Tab>
                </Page>
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

export default Policy;