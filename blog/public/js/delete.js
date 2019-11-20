
;(function($){
	$('.del').on('click',function(){
		if(!window.confirm('您确定删除这项数据吗')){
			return false
		}
	})
})(jQuery);