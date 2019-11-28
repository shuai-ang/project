;(function($){
	var $subPassword = $('#subPassword');
	$('.btn-sub-password').on('click',function(){
		var password = $subPassword.find($("[name='password']")).val();
		var repassword = $subPassword.find($("[name='repassword']")).val();
		var passReg = /^\w{3,6}$/;
		if(!passReg.test(password)){
			$('.err').eq(0).html('密码为3-6位任意字符');
			return false;
		}else{
			$('.err').eq(0).html('');
		}
		if(repassword != password){
			$('.err').eq(1).html('两次输入的密码不一致,请重新输入');
			return false;
		}else{
			$('.err').eq(1).html('');
		}
	})
})(jQuery);