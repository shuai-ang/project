import axios from 'axios'
import * as types from './actionTypes.js'
import api from 'api'
import { message } from 'antd';

export const getAddCategories = (values)=>{
	return (dispatch,getState)=>{
		api.addCategories(values)
		.then(result=>{
			// console.log(result)
			
			const data = result.data;
			if(data.code == 0){
				message.success('新增分类成功!');
				dispatch(setLevelCategories(data.data))
			}else{
				message.error(data.message);
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}
const setLevelCategories = (payload) =>({
	type:types.SET_LEVEL_CATEGORIES,
	payload
})
export const getLevelCategories = ()=>{
	return (dispatch,getState)=>{
		api.levelCategories({
			level:3
		})
		.then(result=>{
			const data = result.data;
			if(data.code == 0){
				dispatch(setLevelCategories(data.data))
			}else{
				message.error('请求失败,请稍后再试!');
			}
			
		})
		.catch(err=>{
			console.log(err)
		})
	}
}
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
		api.getCategoriesList({
			page:page
		})
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){
				dispatch(setPageAction(data.data))
			}else{
				message.error('请求失败,请稍后再试!');
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('请求失败,请稍后再试!')
		})
		.finally(()=>{
			dispatch(getPageDoneAction())
		})
	}
}
export const getUpdateNameAction = (id,newName)=>{
	 
	return (dispatch,getState)=>{
		const page = getState().get('category').get('current')
		api.updateCategoriesName({
			id:id,
			name:newName,
			page:page
		})
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){
				message.success('更新分类成功!');
				dispatch(setPageAction(data.data))
			}else{
				message.error('请求失败,请稍后再试!');
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('请求失败,请稍后再试!')
		})
	}
}
export const getUpdateMobileNameAction = (id,newMobileName)=>{
	 
	return (dispatch,getState)=>{
		const page = getState().get('category').get('current')
		api.updateCategoriesMobileName({
			id:id,
			mobileName:newMobileName,
			page:page
		})
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){
				message.success('更新手机分类成功!');
				dispatch(setPageAction(data.data))
			}else{
				message.error('请求失败,请稍后再试!');
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('请求失败,请稍后再试!')
		})
	}
}
export const getUpdateOrderAction = (id,newOrder)=>{
	 
	return (dispatch,getState)=>{
		const page = getState().get('category').get('current')
		api.updateCategoriesOrder({
			id:id,
			order:newOrder,
			page:page
		})
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){
				message.success('更新排序成功!');
				dispatch(setPageAction(data.data))
			}else{
				message.error('请求失败,请稍后再试!');
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('请求失败,请稍后再试!')
		})
	}
}
export const getUpdateIsShowAction = (id,newIsShow)=>{
	 
	return (dispatch,getState)=>{
		const page = getState().get('category').get('current')
		api.updateCategoriesIsShow({
			id:id,
			isShow:newIsShow,
			page:page
		})
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){
				message.success('更新显示隐藏成功!');
				dispatch(setPageAction(data.data))
			}else{
				message.error('请求失败,请稍后再试!');
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('请求失败,请稍后再试!')
		})
	}
}