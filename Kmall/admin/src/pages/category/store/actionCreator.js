import axios from 'axios'
import * as types from './actionTypes.js'
import api from 'api'

const setPageAction = (payload) =>({
	type:types.SET_PAGE,
	payload
})
const getPageStartAction = (data) =>({
	type:types.Page_Request_Start
})
const getPageDoneAction = (data) =>({
	type:types.Page_Request_Done
})
export const getPageAction = (page)=>{
	return (dispatch,getState)=>{
		dispatch(getPageStartAction())
		api.getPage({
			page:page
		})
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){
				dispatch(setPageAction(data.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			dispatch(getPageDoneAction())
		})
	}
}
