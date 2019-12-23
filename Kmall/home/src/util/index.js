var Hogan = require('hogan.js')

module.exports = {
	validate:function(value,type){
		//非空验证
		if(type == 'required'){
			return !!value
		}
		if(type == 'username'){
			return /^[a-z][a-z0-9_]{2,5}$/ig.test(value)
		}
		if(type == 'password'){
			return /^\w{3,6}$/.test(value)
		}
		if(type == 'phone'){
			return /^1[35678]\d{9}$/.test(value)
		}
		if(type == 'email'){
			return /^\w+@+\w+\.\w{2,6}$/.test(value)
		}
	},
	showSuccessMsg:function(msg){
		alert(msg)
	},
	showErrMsg:function(msg){
		alert(msg)
	},
	goLogin:function(){
		return window.location.href = '/user-login.html?redirect='+encodeURIComponent(window.location.href)
	},
	getParamsFormUrl:function(key){
		var query = window.location.search.substr(1);
		var reg = new RegExp('(^|&)'+key+'='+'([^&]*)($|&)')
		var result = query.match(reg)
		return result ? decodeURIComponent(result[2]) : null
	},
	render:function(tpl,data){
		var template = Hogan.compile(tpl);
		var html = template.render(data)
		return html
	}
}