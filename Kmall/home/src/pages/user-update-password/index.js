require('./index.css')
require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')
var _util = require('util')
var api = require('api')
var tpl = require('./index.tpl')
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
		this.renderSide()
		this.bindEvent()
	},
	renderSide:function(){
		_side.render('user-update-password')
	},
	bindEvent:function(){
		var _this = this;
		$('#btn-submit').on('click',function(){
			_this.submit()
		})

		$('.side-content input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
	},
	submit:function(){
		var formValues = {
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val())
		}
		var formValuesValidate = this.validate(formValues);
		// console.log(formValuesValidate)
		if(formValuesValidate.status == true){
			formErr.hide()
			
			api.updateUsers({
				data:{
					password:formValues.password
				},
				success:function(data){
					// window.location.href = '/result.html?type=updatePassword'
					_util.goResult('updatePassword')
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
		
		result.status = true;
		return result
	}
}

$(function(){
	page.init()
})