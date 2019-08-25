import React from 'react'
export default function Hello(props) {
	console.log(props)
	return (
		<p>hello{props.name}</p>
		)
}