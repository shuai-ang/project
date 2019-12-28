require('./index.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

var _util = require('util')
var api = require('api')
var detailTpl = require('./detail.tpl')

var page = {
	productsDetailParams:{
		id:_util.getParamsFormUrl('productId')
	},
	init:function(){
		this.$detailBox = $('.detail-box')
		this.loadProductDetail()
		this.bindEvent()
	},
	loadProductDetail:function(){
		var _this = this;
		api.getProductDetail({
			data:_this.productsDetailParams,
			success:function(product){
				_this.stock = product.stock
				product.images = product.images.split(',')
				product.activeImage = product.images[0]
				console.log(product)
				var html = _util.render(detailTpl,product)
				_this.$detailBox.html(html)
			}
		})
	},
	bindEvent:function(){
		var _this = this;
		_this.$detailBox.on('mouseenter','.product-small-img-item',function(){
			// console.log(this)
			var $this = $(this);
			$this
			.addClass('active')
			.siblings('.product-small-img-item')
			.removeClass('active')
			var imageUrl = $this.find('img').attr('src');
			_this.$detailBox.find('.product-main-img').find('img').attr('src',imageUrl)
		})
		_this.$detailBox.on('click','.count-btn',function(){
			// console.log(this)
			var $this = $(this);
			var $input = _this.$detailBox.find('.count-input')
			var current = parseInt($input.val())
			if($this.hasClass('plus')){
				$input.val(current < _this.stock ? current+1 : _this.stock)
			}else if($this.hasClass('minus')){
				$input.val(current > 1 ? current-1 : 1)
			}
		})
		//添加购物车
		_this.$detailBox.on('click','.add-cart-btn',function(){
			// console.log(this)
			var $this = $(this);
			var count = $('.count-input').val()

			api.addCarts({
				data:{
					productId:_this.productsDetailParams.id,
					count:count
				},
				success:function(){
					_util.goResult('addCart')
					// console.log(_this.productsDetailParams.id)
				}
			})
		})
	}
}

$(function(){
	page.init()
})