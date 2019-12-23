require('./index.css')
require('pages/common/logo')
require('pages/common/footer')

var page = {
	init:function(){
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this;
		$('#btn-search').on('click',function(){
			_this.submit()
		})

		$('#search-input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
	},
	submit:function(){
		var keyword = $.trim($('#search-input').val());
		window.location.href = '/list.html?keyword='+keyword;
	}
}

$(function(){
	page.init()
})