require('./index.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')

var _util = require('util')
var api = require('api')
var productsTpl = require('./products.tpl')

var page = {
	productsListParams:{
		category:_util.getParamsFormUrl('categoryId'),
		keyword:_util.getParamsFormUrl('keyword'),
		page:_util.getParamsFormUrl('page') || 1,
		orderBy:_util.getParamsFormUrl('orderBy') || 'default'
	},
	init:function(){
		this.$paginationBox = $('.pagination-box')
		//初始化分页器
		this.initPagination()
		this.loadProductsList()
		this.bindEvent()
	},
	initPagination:function(){
		var _this = this;
		this.$paginationBox.pagination()
		this.$paginationBox.on('page',function(ev,page){
			// console.log(page)
			_this.productsListParams.page = page;
			_this.loadProductsList()
		})
	},
	loadProductsList:function(){
		var _this = this;
		api.getProductsList({
			data:this.productsListParams,
			success:function(data){
				// console.log(data)
				if(data.list.length >0){
					var html = _util.render(productsTpl,{
						list:data.list
					})
					$('.product-list-box').html(html)
					//构建分页器
					_this.$paginationBox.pagination('render',{
						current:data.current,
						total:data.total,
						pageSize:data.pageSize
					})
				}else{
					$('.product-list-box').html('<p class="empty-message">你搜索的商品起飞啦!</p>')
				}
				
			}
		})
	},
	bindEvent:function(){
		var _this = this;
		$('.sort-item').on('click',function(){
			
			// console.log(this)
			var $this = $(this);
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return
				}
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active')
				
				_this.productsListParams.orderBy = 'default'
			}
			else if($this.hasClass('price')){
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active')
				if($this.hasClass('asc')){
					$this
					.removeClass('asc')
					.addClass('desc')
					_this.productsListParams.orderBy = 'price_desc'
				}
				else if($this.hasClass('desc')){
					$this
					.removeClass('desc')
					.addClass('asc')
					
					_this.productsListParams.orderBy = 'price_asc'
				}
			}
			_this.productsListParams.page = 1;
			_this.loadProductsList()
		})
	}
}

$(function(){
	page.init()
})