import React from 'react'
import {
	Input,
	Button,
	List
} from 'antd'
const ListItem = (props) => {
	console.log(props)
	const {
		inputValue,
		list,
		handleInputChange,
		handleBtnClick,
		handleDelete
	} = props
	return (
		<div style={{padding: 10}}>
			<Input 
				placeholder="输入内容" 
				style={{width: 300, marginRight: 10}}
				value={inputValue}
				onChange={handleInputChange}
			/>
			<Button type="primary" onClick={handleBtnClick}>提交</Button>
			<List
				style={{width: 300}}
				bordered
				dataSource={list}
				renderItem={(item, index) => (
					<List.Item onClick={(index) => handleDelete(index)}>
						{item}
					</List.Item>
				)}
			/>
		</div>
	)
}

export default ListItem