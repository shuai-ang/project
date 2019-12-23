import { fromJS } from 'immutable'
const defaultState = fromJS({
	list:[],
	usernum:0,
    ordernum:0,
    productnum:0,
    current:1,
	pageSize:10,
	total:100,
	isFecthing:false,
	categories:[],
	mainImage:'',
	images:'',
	detail:'',
	mainImageValidateStatus:'',
	mainImageHelp:'',
	imagesValidateStatus:'',
	imagesHelp:'',

	category:'',
	categoryName:'',
	name:'',
	description:'',
	price:'',
	stock:''
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
	if(action.type == types.SET_LEVEL_CATEGORIES){
		return state.set('categories',fromJS(action.payload))
	}
	if(action.type == types.SET_MAIN_IMAGE){
		return state.merge({
			mainImage:action.payload,
			mainImageValidateStatus:'',
			mainImageHelp:''
		})
	}
	if(action.type == types.SET_IMAGES){
		return state.merge({
			images:action.payload,
			imagesValidateStatus:'',
			imagesHelp:''
		})
	}
	if(action.type == types.SET_DETAIL){
		return state.set('detail',action.payload)
	}
	if(action.type == types.SET_MAIN_IMAGE_ERR){
		return state.merge({
			mainImageValidateStatus:'error',
			mainImageHelp:'请上传封面图片'
		})
	}
	if(action.type == types.SET_IMAGES_ERR){
		return state.merge({
			imagesValidateStatus:'error',
			imagesHelp:'请上传商品图片'
		})
	}
	if(action.type == types.SET_DETAIL_PRODUCT){
		return state.merge({
			category:action.payload.category._id,
			categoryName:action.payload.category.name,
			name:action.payload.name,
			description:action.payload.description,
			price:action.payload.price,
			stock:action.payload.stock,
			mainImage:action.payload.mainImage,
			images:action.payload.images,
			detail:action.payload.detail
		})
	}
	return state
}