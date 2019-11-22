;(function($){
	$.fn.extend({
		pagination:function(options){
			// console.log(this)
			var $elem = this;
			$elem.on('click','a',function(){
				// console.log(this)
				var $this = $(this);
				var currentPage = $elem.find('.active a').html() /1;
				var labelText = $this.attr('aria-label');
				// console.log(labelText)
				var page = 0;
				if(labelText == "Next"){
					page = currentPage + 1
				}else if(labelText == "Previous"){
					page = currentPage - 1
				}else{
					page = $this.html() /1
				}

				if(page == currentPage){
					return false;
				}
				$.ajax({
					url:options.url+"?page="+page,
					type:"get",
					dataType:"json"
				})
				.done(function(result){
					console.log(result)
					$elem.trigger('get-data',result.data)
				})
				.fail(function(err){
					console.log(err)
				})
			})
		}
	})
})(jQuery);