var express = require('express')
var router = express.Router()
const CategoryModel = require('../models/category.js')
const pagination = require('../util/pagination.js')

router.use((req,res,next)=>{
  if(req.userInfo.isAdmin){
    next()
  }else{
    res.send('<h1>请使用管理员账号登陆</h1>')
  }
})

router.get('/',(req, res)=> {
	/*
	  res.render('admin/category_list',{
	  	userInfo:req.userInfo
	  })
    */
    const options = {
       page:req.query.page / 1,
       model:CategoryModel,
       query:{},
       projection:'-__v',
       sort:{order:1}
    }
    pagination(options)
    .then(result=>{
        res.render('admin/category_list',{
            userInfo:req.userInfo,//获取用户信息
            categories:result.docs,
            page:result.page,
            list:result.list,
            pages:result.pages,
            url:'/category'
         })
    })
    .catch(err=>{
           console.log(err)
        })
})

router.get('/add',(req, res)=> {
  res.render('admin/category_add_edit',{
  	userInfo:req.userInfo
  })
})

//处理新增分类
router.post('/add',(req,res)=>{
	//1.获取参数信息
	let { name,order } = req.body;
	if(!order){
		order = 0
	}
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

router.get('/edit/:id',(req, res)=> {
	let id = req.params.id;
	// console.log(id)
	CategoryModel.findById(id)
	.then(category=>{
		res.render('admin/category_add_edit',{
		  	userInfo:req.userInfo,
		  	category
		  })
	})
  	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"数据库操作失败,请稍后再试"
		})
	})
})

//处理编辑分类
router.post('/edit',(req,res)=>{
	//1.获取参数信息
	let { name,order,id } = req.body;
	if(!order){
		order = 0
	}
	// console.log(name,order,id)
	CategoryModel.findById(id)
	.then(category=>{
		if(category.name == name && category.order == order){
			res.render('admin/err',{
				userInfo:req.userInfo,
				message:"分类信息没有更改"
			})
		}else{
			CategoryModel.findOne({name:name,_id:{$ne:id}})
			.then(category=>{
				if(category){
					res.render('admin/err',{
						userInfo:req.userInfo,
						message:"该分类名称已存在,请重置"
					})
				}else{
					CategoryModel.updateOne({_id:id},{name,order,id})
					.then(category=>{
						res.render('admin/ok',{
							userInfo:req.userInfo,
							message:"更新分类成功",
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

//处理删除分类
router.get('/delete/:id',(req,res)=>{
	//1.获取参数信息
	const id = req.params.id;
	CategoryModel.deleteOne({_id:id})
	.then(category=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:"删除数据成功",
			url:'/category'
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"数据库操作失败,请稍后再试",
			url:'/category'
		})
	})
})
module.exports = router;