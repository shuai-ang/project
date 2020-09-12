//唯一更改state的方法
//mutation必须是同步函数
import { GET_OPENID } from './types.js'
export default {
	[GET_OPENID](state,openid){
		console.log('mutations.js..',state)
		console.log('mutations.js..',openid)
		state.openid = openid
	}
}