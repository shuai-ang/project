import axios from 'axios'
import * as types from './actionTypes.js'
import api from 'api'
import { message } from 'antd';

const setMainImageErr = () =>({
	type:types.SET_MAIN_IMAGE_ERR
})
const setImagesErr = () =>({
	type:types.SET_IMAGES_ERR
})
export const getSaveProductAction = (err,values)=>{
	return (dispatch,getState)=>{
		// console.log(values)
		const state = getState().get('product')
		const mainImage = state.get('mainImage')
		const images = state.get('images')
		const detail = state.get('detail')
		let hasErr = false;
		let request = api.addProducts; 
		if(err){
			hasErr = true;
		}
		if(!mainImage){
			hasErr = true;
			dispatch(setMainImageErr())
		}
		if(!images){
			hasErr = true;
			dispatch(setImagesErr())
		}
		if(hasErr){
			return
		}
		//判断新增还是编辑
		if(values.id){
			request = api.updateProducts
		}
		request({
			...values,
			mainImage:mainImage,
			images:images,
			detail:detail
		})
		.then(result=>{
			// console.log(result)
			
			const data = result.data;
			if(data.code == 0){
				message.success(data.message,()=>{
					window.location.href = '/product'
				});
			}else{
				message.error(data.message);
			}
		})
		.catch(err=>{
			console.log(err)
		})
		
	}
}
export const MainImageAction = (payload) =>({
	type:types.SET_MAIN_IMAGE,
	payload
})
export const ImagesAction = (payload) =>({
	type:types.SET_IMAGES,
	payload
})
export const DetailAction = (payload) =>({
	type:types.SET_DETAIL,
	payload
})
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
export const getPageAction = (page,value)=>{
	let options = {
			page:page
	}
	if(value){
		options.keyword = value
	}
	return (dispatch,getState)=>{
		dispatch(getPageStartAction())
		api.getProductsList(options)
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
export const getUpdateIsShowAction = (id,newIsShow)=>{
	 
	return (dispatch,getState)=>{
		const page = getState().get('product').get('current')
		api.updateProductsIsShow({
			id:id,
			isShow:newIsShow,
			page:page
		})
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){
				message.success('更新首页显示成功!');
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
export const getUpdateStatusAction = (id,newStatus)=>{
	 
	return (dispatch,getState)=>{
		const page = getState().get('product').get('current')
		api.updateProductsStatus({
			id:id,
			status:newStatus,
			page:page
		})
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){
				message.success('更新上下架成功!');
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
export const getUpdateIsHotAction = (id,newIsHot)=>{
	 
	return (dispatch,getState)=>{
		const page = getState().get('product').get('current')
		api.updateProductsIsHot({
			id:id,
			isHot:newIsHot,
			page:page
		})
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){
				message.success('更新是否热卖成功!');
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
		const page = getState().get('product').get('current')
		api.updateProductsOrder({
			id:id,
			order:newOrder,
			page:page
		})
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){
				message.success('更新商品排序成功!');
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
const setDetailProductAction = (payload) =>({
	type:types.SET_DETAIL_PRODUCT,
	payload
})
export const DetailProductAction = (id)=>{
	 
	return (dispatch,getState)=>{
		api.getDetailProduct({
			id:id
		})
		.then(result=>{
			// console.log(result)
			
			const data = result.data;
			// console.log(data)
			if(data.code == 0){
				dispatch(setDetailProductAction(data.data))
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