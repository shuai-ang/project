require('./index.css')
require('pages/common/logo')
require('pages/common/footer')

var _util = require('util')
var api = require('api')
var formErr = {
	show:function(err){
		$('.error-item').show()
		$('.error-item')
		.find('.error-msg')
		.text(err)
	},
	hide:function(){
		$('.error-item').hide()
		$('.error-item')
		.find('.error-msg')
		.text('')
	}
}

var page = {
	init:function(){
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this;
		$('#btn-submit').on('click',function(){
			_this.submit()
		})

		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
	},
	submit:function(){
		var formValues = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
		}
		var formValuesValidate = this.validate(formValues);
		// console.log(formValuesValidate)
		if(formValuesValidate.status == true){
			formErr.hide()
			//发送ajax请求
			/*
			$.ajax({
				url:'/sessions/users',
				method:'post',
				dataType:'json',
				data:formValues,
				success:function(result){
					if(result.code == 0){
						window.location.href = '/'
					}else{
						formErr.show(result.message)
					}
				},
				error:function(err){
					formErr.show('网络故障,请稍后再试')
				}
			})
			*/
			api.login({
				data:formValues,
				success:function(){
					window.location.href = _util.getParamsFormUrl('redirect') || '/'
				},
				error:function(msg){
					formErr.show(msg)
				}
			})
		}else{
			formErr.show(formValuesValidate.msg)
		}
	},
	validate:function(formValues){
		var result = {
			status:false,
			msg:''
		}
		if(!_util.validate(formValues.username,'required')){
			result.msg = '用户名不能为空'
			return result
		}
		if(!_util.validate(formValues.username,'username')){
			result.msg = '用户名格式不正确'
			return result
		}
		if(!_util.validate(formValues.password,'required')){
			result.msg = '密码不能为空'
			return result
		}
		if(!_util.validate(formValues.password,'password')){
			result.msg = '密码格式不正确'
			return result
		}
		result.status = true;
		return result
	}
}

$(function(){
	page.init()
})