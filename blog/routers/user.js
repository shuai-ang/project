var express = require('express')
var router = express.Router()
const UserModel = require('../models/user.js')
const hmac = require('../util/hmac.js')


//处理注册
router.post('/register',(req, res)=> {
  //1.获取参数信息
   const { username,password } = req.body;
   console.log(username,password)
   //2.查找数据库同名验证
   UserModel.findOne({username:username})
   .then(user=>{
   	   if(user){
   	   	  res.json({
   	   	  	code:10,
   	   	  	message:"用户名已存在,请重置"
   	   	  })
   	   }else{
   	   	  UserModel.insertMany({
   	   	  	username:username,
   	   	  	password:hmac(password),
               // isAdmin:true
   	   	  })
   	   	  .then(result=>{
   	   	  	res.json({
   	   	  		code:0,
   	   	  		message:"注册成功",
   	   	  		user:result
   	   	  	})
   	   	  })
   	   	  .catch(err=>{
   	   	  	res.json({
   	   	  		code:10,
   	   	  		message:"数据库操作失败"
   	   	  	})
   	   	  })
   	   }
   })
   .catch(err=>{
	  	res.json({
	  		code:10,
	  		message:"数据库操作失败"
	  	})
	  })
   //3.插入数据
})

//处理登录
router.post('/login',(req, res)=> {
  //1.获取参数信息
   const { username,password } = req.body;
   //2.查找数据库同名验证
   UserModel.findOne({username:username,password:hmac(password)},'-password')
   .then(user=>{
   	   if(user){
   	   	//设置cookie
   	   	// req.cookies.set('userInfo',JSON.stringify(user),{maxAge:1000*60*60*24})

   	   	req.session.userInfo = user;
   	   	  res.json({
   	   	  	code:0,
   	   	  	message:"登陆成功",
   	   	  	user:user
   	   	  })
   	   }else{
   	   	  res.json({
	  		code:10,
	  		message:"用户名或密码不正确"
	  	})
   	   }
   })
   .catch(err=>{
	  	res.json({
	  		code:10,
	  		message:"数据库操作失败"
	  	})
	  })
})

//处理退出
router.get('/logout',(req,res)=>{
	//清除cookie
	// req.cookies.set('userInfo',null)
	req.session.destroy()
	res.json({
		code:0,
		message:"退出成功"
	})
})
module.exports = router;