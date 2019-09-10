// import Axios from 'axios'
// const host = 'http://localhost:2002'
// export const getList = () => {
// 	return Axios.get('/api/menu/list')
// 	// return Axios.get(host + '/api/menu/list')
// }

import serverApi from '~api'
console.log(serverApi)

export const getList = () => {
	return serverApi.get('/api/menu/list')
}