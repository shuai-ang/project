var _util = require('util')
var api = require('api')
var modalTpl = require('./modal.tpl')
var _city = require('util/city')
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
module.exports = {
	show:function(){
		this.$modalBox = $('.modal-box')
		this.loadModal()
		this.bindEvent()
		this.loadProvinces()
	},
	loadProvinces:function(){
		var provinces = _city.getProvinces()
		var provinceSelect = this.$modalBox.find('.province-select')
		provinceSelect.html(this.getSelectOption(provinces))
	},
	loadCities:function(province){
		var cities = _city.getCities(province)
		var citySelect = this.$modalBox.find('.city-select')
		citySelect.html(this.getSelectOption(cities))
	},
	getSelectOption:function(arr){
		var html = '<option value="">请选择</option>'
		for(var i=0;i<arr.length;i++){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>'
		}
		return html
	},
	loadModal:function(){
		var html = _util.render(modalTpl)
		this.$modalBox.html(html)
	},
	bindEvent:function(){
		var _this = this
		//1.点击关闭地址弹出层
		this.$modalBox.on('click','.close',function(){
			_this.hideModal()
		})
		this.$modalBox.on('click','.modal-container',function(ev){
			ev.stopPropagation()
		})
		//2.省份城市二级联动
		this.$modalBox.on('change','.province-select',function(){
			//获取省份信息
			var province = $(this).val()
			_this.loadCities(province)
		})
		//3.提交新增地址
		this.$modalBox.find('#btn-submit').on('click',function(){
			_this.submit()
		})

		this.$modalBox.find('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
	},
	hideModal:function(){
		this.$modalBox.empty()
	},
	submit:function(){
		var _this = this;
		var formValues = {
			name:$.trim($('[name="name"]').val()),
			province:$.trim($('[name="province"]').val()),
			city:$.trim($('[name="city"]').val()),
			address:$.trim($('[name="address"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			zip:$.trim($('[name="zip"]').val())
		}
		var formValuesValidate = this.validate(formValues);
		// console.log(formValuesValidate)
		if(formValuesValidate.status == true){
			formErr.hide()
			//发送ajax请求
			api.addShippings({
				data:formValues,
				success:function(shippings){
					// 新增地址成功后处理
					_this.hideModal()
					$('.shipping-box').trigger('get-shippings',[shippings])
					_util.showSuccessMsg('新增地址成功')
				},
				error:function(msg){
					_util.showErrMsg('请求发送失败,请稍后再试')
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
		if(!_util.validate(formValues.name,'required')){
			result.msg = '用户姓名不能为空'
			return result
		}
		if(!_util.validate(formValues.province,'required')){
			result.msg = '省份不能为空'
			return result
		}
		if(!_util.validate(formValues.city,'required')){
			result.msg = '城市不能为空'
			return result
		}
		if(!_util.validate(formValues.address,'required')){
			result.msg = '请添加详细地址'
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
		
		result.status = true;
		return result
	}
}