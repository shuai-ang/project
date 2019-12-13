import { fromJS } from 'immutable'
const defaultState = fromJS({
	list:[],
	usernum:0,
    ordernum:0,
    productnum:0,
    current:1,
	pageSize:10,
	total:100,
	isFecthing:true
})
import * as types from './actionTypes.js'

export default (state=defaultState,action)=>{
	if(action.type == types.SET_PAGE){
		return state.merge({
			list:fromJS(action.payload.list),
			current:fromJS(action.payload.current),
			pageSize:fromJS(action.payload.pageSize),
			total:fromJS(action.payload.total)
		})
	}
	if(action.type == types.Page_Request_Start){
		return state.set('isFecthing',true)
	}
	if(action.type == types.Page_Request_Done){
		return state.set('isFecthing',false)
	}
	return state
}