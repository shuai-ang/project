import {SERVER,API_CONFIG} from './config.js'
import axios from 'axios'
import {removeUsername} from 'util'

const getApiObj = (API_CONFIG)=>{
	const apiObj = {}
	for(let key in API_CONFIG){
		apiObj[key] = (data)=>{
			let url = SERVER + API_CONFIG[key][0];
			let method = API_CONFIG[key][1];
			return request(url,method,data)
		}
		
	}


	return apiObj
}
const request = (url,method,data)=>{
	// console.log(url,method,data)
	return new Promise((resolve,reject)=>{
		const options = {
			method: method,
		    url: url,
		    withCredentials: true
		}
		switch(method.toUpperCase()){
			case 'GET':
			case 'DELETE':
				options.params = data
				break
			default :
				options.data = data
		}
		axios(options)
		.then(result=>{
			if(result.data.code == 10){
				removeUsername();
				window.location.href = '/login'
			}
			resolve(result)
		})
		.catch(err=>{
			reject(err)
		})
	})
}

export default getApiObj(API_CONFIG)