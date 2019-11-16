
;(function($){
	//登录注册切换
	var $login = $('#login');
	var $register = $('#register');
	var $userInfo = $('#user-info');
	$('#go-register').on('click',function(){
		$login.hide();
		$register.show();
	})

	$('#go-login').on('click',function(){
		$register.hide();
		$login.show();
	})

	//2.点击注册发送请求
	$('#sub-register').on('click',function(){
		//2.1获取注册信息
		var username = $register.find($("[name='username']")).val();
		var password = $register.find($("[name='password']")).val();
		var repassword = $register.find($("[name='repassword']")).val();
		var $err = $register.find($(".err"));
		var errMsg = '';
		//2.2验证信息合法性
		var userReg = /^[a-z][a-z0-9_]{2,9}$/i;
		var passReg = /^\w{3,6}$/;
		if(!userReg.test(username)){
			errMsg = '用户名是以字母开头的3-10位字符'
		}
		else if(!passReg.test(password)){
			errMsg = '密码为3-6位任意字符'
		}
		else if(repassword != password){
			errMsg = '两次输入的密码不一致'
		}else{
			errMsg = ''
		}
		if(errMsg){
			$err.html(errMsg)
		}else{
			$err.html('')
			//2.3发送ajax请求
			$.ajax({
				url:"user/register",
				type:"POST",
				dataType:"json",
				data:{
					username:username,
					password:password
				}
			})
			.done(function(data){
				if(data.code == 0){
					$('#go-login').trigger('click')
				}else{
					$err.html(data.message)
				}
				
			})
			.fail(function(err){
				$err.html('请求失败,请稍后再试')
			})
		}
		
	})

	//3.点击登录发送请求
	$('#sub-login').on('click',function(){
		//3.1获取登录信息
		var username = $login.find($("[name='username']")).val();
		var password = $login.find($("[name='password']")).val();
		var $err = $login.find($(".err"));
		var errMsg = '';
		//3.2验证信息合法性
		var userReg = /^[a-z][a-z0-9_]{2,9}$/i;
		var passReg = /^\w{3,6}$/;
		if(!userReg.test(username)){
			errMsg = '用户名是以字母开头的3-10位字符'
		}
		else if(!passReg.test(password)){
			errMsg = '密码为3-6位任意字符'
		}
		else{
			errMsg = ''
		}
		if(errMsg){
			$err.html(errMsg)
		}else{
			$err.html('')
			//2.3发送ajax请求
			$.ajax({
				url:"user/login",
				type:"POST",
				dataType:"json",
				data:{
					username:username,
					password:password
				}
			})
			.done(function(data){
				if(data.code == 0){
					$userInfo.find($('span')).html(data.user.username)
					$login.hide();
					$userInfo.show();
				}else{
					$err.html(data.message)
				}
				
			})
			.fail(function(err){
				$err.html('请求失败,请稍后再试')
			})
		}
		
	})
})(jQuery);