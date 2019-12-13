import { fromJS } from 'immutable'
const defaultState = fromJS({
	isFecthing:false
})
import * as types from './actionTypes.js'

export default (state=defaultState,action)=>{
	if(action.type == types.Login_Request_Start){
		return state.set('isFecthing',true)
	}
	if(action.type == types.Login_Request_Done){
		return state.set('isFecthing',false)
	}
	return state
}