var express = require('express')
var router = express.Router()
const CategoryModel = require('../models/category.js')

router.use((req,res,next)=>{
  if(req.userInfo.isAdmin){
    next()
  }else{
    res.send('<h1>请使用管理员账号登陆</h1>')
  }
})

router.get('/',(req, res)=> {
  res.render('admin/category_list',{
  	userInfo:req.userInfo
  })
})

router.get('/add',(req, res)=> {
  res.render('admin/category_add',{
  	userInfo:req.userInfo
  })
})

//处理新增分类
router.post('/add',(req,res)=>{
	//1.获取参数信息
	const { name,order } = req.body;
	// console.log(name,order)
	CategoryModel.findOne({name:name})
	.then(category=>{
		if(category){
			res.render('admin/err',{
				userInfo:req.userInfo,
				message:"分类名称已存在"
			})
		}else{
			CategoryModel.insertMany({name,order})
			.then(result=>{
				res.render('admin/ok',{
					userInfo:req.userInfo,
					message:"新增分类成功",
					url:'/category'
				})
			})
			.catch(err=>{
				res.render('admin/err',{
					userInfo:req.userInfo,
					message:"数据库操作失败,请稍后再试"
				})
			})
		}
	})
	.catch(err=>{
		console.log(err)
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"数据库操作失败,请稍后再试"
		})
	})
})

router.get('/edit',(req, res)=> {
  res.render('admin/category_edit',{
  	userInfo:req.userInfo
  })
})
module.exports = router;