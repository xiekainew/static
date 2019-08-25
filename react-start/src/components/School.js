import React from 'react'

const list = [
	'清华大学',
	'安居二中',
	'北京大学'
]
const School = () => {
	return (
		<div>
			{list.map(item => <p key={item}>{item}</p>)}
		</div>
	)
}

export default School
// export default function() {
// 	return (
// 		<div>
// 			{list.map(item => <p key={item}>{item}</p>)}
// 		</div>
// 	)
// }