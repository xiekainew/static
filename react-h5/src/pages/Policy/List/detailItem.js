import React from 'react';
import {
    Cell,
    CellBody,
    CellFooter
} from 'react-weui';
class Item extends React.Component {
   
    render() {
        return (
            <Cell>
                <CellBody>
                    {this.props.title}
                </CellBody>
                <CellFooter style={{
                    width:'200px'}}>
                    {this.props.subTitle}
                </CellFooter>
            </Cell>
        );
    }
}

export default Item;