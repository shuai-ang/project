;(function($){
	$('.btn-sub').on('click',function(){
		var val = $('#text-content').val().trim();
		var $err = $('.err');
		if(!val){
			$err.html("请输入内容后再提交");
			return;
		}else{
			$err.html('')
		}
		if(val.length > 100){
			$err.html("输入内容不超过100个字符");
			return;
		}else{
			$err.html('')
		}

		var id = $(this).data('id');
		$.ajax({
			url:"/comment/add",
			type:"post",
			dataType:"json",
			data:{
				content:val,
				article:id
			}
		})
		.done(result=>{
			console.log(result)
		})
		.fail(err=>{
			console.log(err)
		})
	})
})(jQuery);