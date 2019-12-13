import axios from 'axios'
import { message, Button } from 'antd';
import * as types from './actionTypes.js'
import {saveUsername} from 'util'
import api from 'api'


const getLoginStartAction = (data) =>({
	type:types.Login_Request_Start
})
const getLoginDoneAction = (data) =>({
	type:types.Login_Request_Done
})
export const getLoginAction = (values)=>{
	
	return (dispatch,getState)=>{
		dispatch(getLoginStartAction())
		values.role = 'admin';
		api.login(values)
		.then(result=>{
			const data = result.data;
			if(data.code == 0){
				saveUsername(data.data.username)
				window.location.href = '/'
			}else{
				message.error(data.message);
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!');
		})
		.finally(()=>{
			dispatch(getLoginDoneAction())
		})
		/*
		axios({
		  method: 'post',
		  url: 'http://127.0.0.1:3000/sessions/users',
		  withCredentials: true,
		  data: values
		})
		.then(result=>{
			const data = result.data;
			if(data.code == 0){
				saveUsername(data.data.username)
				window.location.href = '/'
			}else{
				message.error(data.message);
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!');
		})
		.finally(()=>{
			dispatch(getLoginDoneAction())
		})
		*/
	}
}
