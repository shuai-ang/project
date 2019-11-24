
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
					/*
					$userInfo.find($('span')).html(data.user.username)
					$login.hide();
					$userInfo.show();
					*/
					window.location.reload()
				}else{
					$err.html(data.message)
				}
				
			})
			.fail(function(err){
				$err.html('请求失败,请稍后再试')
			})
		}
		
	})

	//4.处理退出
	$('#logout').on('click',function(){
		$.ajax({
			url:'user/logout',
			type:"GET"
		})
		.done(data=>{
			if(data.code == 0){
				window.location.href = '/'
			}
		})
		.fail(function(err){
			$userInfo.find('.err').html('请求失败,请稍后再试')
		})
	})

	//首页分页逻辑
	var $articlePage = $('#articlePage');
	var $articleWrap = $('#articleWrap');

	function buildArticalHtml(articles){
		var html = '';
		articles.forEach(function(article){
			var createdTime = moment(article.createAt).format('YYYY - MM - DD HH:mm:ss')
			html += `<div class="panel panel-default">
				  <div class="panel-heading">
				  	<h3 class="panel-title"><a href="/detail/${ article._id.toString() }" class="link">${ article.title }</a></h3>
				  </div>
				  <div class="panel-body">
				    ${ article.intro }
				  </div>
				  <div class="panel-footer">
				  	<ul class="list-group">
					  <li class="list-group-item">
					  	<span class="glyphicon glyphicon-user"></span>&nbsp;${ article.user.username }
					  </li>
					  <li class="list-group-item">
					  	<span class="glyphicon glyphicon-th-list"></span>&nbsp;${ article.category.name }
					  </li>
					  <li class="list-group-item">
					  	<span class="glyphicon glyphicon-time"></span>&nbsp;${ createdTime }
					  </li>
					  <li class="list-group-item">
					  	<span class="glyphicon glyphicon-eye-open"></span>&nbsp;${ article.click }
					  </li>
					</ul>
				  </div>
				</div>`
		})
		
		
		return html;
	}

	function buildPaginationHtml(page,pages,list){
		var html = '';
		if(page == 1){
			html += `<li class="disabled">`
		}else{
			html += `<li>`
		}
		html += ` <a href="javascript:;" aria-label="Previous">
			        <span aria-hidden="true">&laquo;</span>
			      </a>`
	    list.forEach(function(i){
	    	if(i == page){
	    		html += '<li class="active"><a href="javascript:;">'+i+'</a></li>'
	    	}else{
	    		html += '<li><a href="javascript:;">'+i+'</a></li>'
	    	}
	    })
	    if(page == pages){
	    	html += `<li class="disabled">`
		}else{
			html += `<li>`
		}
		html += ` <a href="javascript:;" aria-label="Next">
			        <span aria-hidden="true">&raquo;</span>
			      </a>`
	    return html;
	}

	$articlePage.on('get-data',function(ev,data){
		//获取首页文章分页数据
		//构建文章列表结构
		$articleWrap.html(buildArticalHtml(data.docs))
		//构建分页器结构
		var $pagination = $articlePage.find('.pagination');
		if(data.pages >1){
			$pagination.html(buildPaginationHtml(data.page,data.pages,data.list))
		}else{
			$pagination.html('')
		}
		
	})

	$articlePage.pagination({
		url:'/articles'
	})
})(jQuery);