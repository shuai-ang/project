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

		$('[name="username"]').on('blur',function(){
			var username = $.trim($(this).val());
			if(!_util.validate(username,'required')){
				return
			}
			if(!_util.validate(username,'username')){
				return
			}
			api.checkUsername({
				data:{
					username:username
				},
				success:function(){
					formErr.hide()
				},
				error:function(msg){
					formErr.show(msg)
				}
			})
		})
	},
	submit:function(){
		var formValues = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			email:$.trim($('[name="email"]').val())
		}
		var formValuesValidate = this.validate(formValues);
		// console.log(formValuesValidate)
		if(formValuesValidate.status == true){
			formErr.hide()
			//发送ajax请求
			api.register({
				data:formValues,
				success:function(){
					// window.location.href = '/result.html?type=register'
					_util.goResult('register')
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
		if(formValues.repassword != formValues.password){
			result.msg = '两次输入的密码不一致'
			return result
		}
		if(!_util.validate(formValues.phone,'required')){
			result.msg = '手机号不能为空'
			return result
		}
		if(!_util.validate(formValues.phone,'phone')){
			result.msg = '手机号格式不正确'
			return result
		}
		if(!_util.validate(formValues.email,'required')){
			result.msg = '邮箱不能为空'
			return result
		}
		if(!_util.validate(formValues.email,'email')){
			result.msg = '邮箱格式不正确'
			return result
		}
		result.status = true;
		return result
	}
}

$(function(){
	page.init()
})