require('./index.css')
var _nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

var _util = require('util')
var api = require('api')
var cartTpl = require('./cart.tpl')

var page = {
	init:function(){
		this.$cartBox = $('.cart .cart-box')
		this.loadCarts()
		this.bindEvent()
	},
	loadCarts:function(){
		var _this = this;
		api.getCarts({
			success:function(data){
				// console.log(data)
				_this.renderCarts(data)
				
			},
			error:function(){
				_this.showErrPage()
			}
		})
	},
	renderCarts:function(data){
		_nav.loadCarts()
		//缓存结算总价
		this.totalCartPrice = data.totalCartPrice;
		if(data.cartList.length >0){
			var html = _util.render(cartTpl,data)
			this.$cartBox.html(html)
		}else{
			this.$cartBox.html('<p class="empty-message">您的购物车空空如也..</p>')
		}
	},
	showErrPage:function(){
		this.$cartBox.html('<p class="empty-message">您的请求出错啦,请稍后再试!</p>')
	},
	bindEvent:function(){
		var _this = this;
		//1.处理单个选中
		_this.$cartBox.on('click','.select-one',function(){
			// console.log(this)
			var $this = $(this)
			var productId = $this.parents('.product-item').data('product-id')
			if($this.is(':checked')){
				api.updateCartChoice({
					data:{
						productId:productId,
						checked:true
					},
					success:function(data){
						// console.log(data)
						_this.renderCarts(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}else{
				api.updateCartChoice({
					data:{
						productId:productId,
						checked:false
					},
					success:function(data){
						_this.renderCarts(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})

		//2.处理全选
		_this.$cartBox.on('click','.select-all',function(){
			// console.log(this)
			var $this = $(this)
			if($this.is(':checked')){
				api.updateCartChoice({
					data:{
						checked:true
					},
					success:function(data){
						// console.log(data)
						_this.renderCarts(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}else{
				api.updateCartChoice({
					data:{
						checked:false
					},
					success:function(data){
						_this.renderCarts(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})

		//3.删除单个商品
		_this.$cartBox.on('click','.delete-one',function(){
			// console.log(this)
			var $this = $(this)
			var productId = $this.parents('.product-item').data('product-id')
			if(_util.showConfirm('您确定删除这件商品吗?')){
				api.deleteCart({
					data:{
						productId:productId
					},
					success:function(data){
						// console.log(data)
						_this.renderCarts(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})

		//4.删除选中商品
		_this.$cartBox.on('click','.delete-selected',function(){
			// console.log(this)
			var $this = $(this)
			if(_util.showConfirm('您确定删除所选商品吗?')){
				api.deleteCart({
					success:function(data){
						// console.log(data)
						_this.renderCarts(data)
					},
					error:function(){
						_this.showErrPage()
					}
				})
			}
		})

		//5.处理商品数量
		_this.$cartBox.on('click','.count-btn',function(){
			// console.log(this)
			var $this = $(this)
			var productId = $this.parents('.product-item').data('product-id')
			var $input = $this.siblings('.count-input')
			var stock = $input.data('stock')
			var current = parseInt($input.val())
			var count = current
			if($this.hasClass('plus')){
				if(current >= stock){
					_util.showErrMsg('所选商品数量已超出库存!')
					return
				}
				count = current + 1
			}
			else if($this.hasClass('minus')){
				if(current <= 1){
					_util.showErrMsg('所选商品数量不少于1件!')
					return
				}
				count = current - 1
			}
			api.updateCartCounts({
				data:{
					productId:productId,
					count:count
				},
				success:function(data){
					// console.log(data)
					_this.renderCarts(data)
				},
				error:function(){
					_this.showErrPage()
				}
			})
		})

		//6.处理结算
		_this.$cartBox.on('click','.btn-submit',function(){
			// console.log(this)
			var $this = $(this)
			if(_this.totalCartPrice >0){
				window.location.href = './order-confirm.html'
			}else{
				_util.showErrMsg('请选择需要结算的商品')
			}
			
		})
	}
}

$(function(){
	page.init()
})