require('./index.css')
var _nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

var _util = require('util')
var api = require('api')
var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')
var _modal = require('./modal.js')

var page = {
	init:function(){
		this.$shippingBox = $('.shipping-box')
		this.$productBox = $('.product-box')
		this.bindEvent()
		this.loadShippingsList()
		this.loadProductsList()
	},
	bindEvent:function(){
		var _this = this;
		_this.$shippingBox.on('get-shippings',function(ev,shippings){
			_this.renderShippings(shippings)
		})
		_this.$shippingBox.on('click','.shipping-add',function(){
			_modal.show()
		})
		_this.$shippingBox.on('click','.shipping-delete',function(){
			var shippingId = $(this).parents('.shipping-item').data('shipping-id')
			if(_util.showConfirm('您确定要删除该地址吗?')){
				api.deleteShippings({
					data:{
						id:shippingId
					},
					success:function(shippings){
						_this.renderShippings(shippings)
					},
					error:function(){
						_util.showErrMsg('删除地址失败,请稍后再试!')
					}
				})
			}
			
		})
	},
	renderShippings:function(shippings){
		var html = _util.render(shippingTpl,{
			shippings:shippings
		})
		this.$shippingBox.html(html)
	},
	loadShippingsList:function(){
		var _this = this;
		api.getShippings({
			success:function(shippings){
				// console.log(shippings)
				_this.renderShippings(shippings)
			}
		})
		
	},
	loadProductsList:function(){
		var _this = this;
		api.getOrdersList({
			success:function(data){
				// console.log(data)
				if(data.cartList.length >0){
					var html = _util.render(productTpl,data)
					_this.$productBox.html(html)
				}else{
					_this.$productBox.html('<p class="empty-message">请先添加需要结算的商品!</p>')
				}
			},
			error:function(){
				_this.$productBox.html('<p class="empty-message">请求出错啦!</p>')
			}
		})
		
	}
}

$(function(){
	page.init()
})