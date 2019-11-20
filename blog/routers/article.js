var express = require('express')
var router = express.Router()
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
const pagination = require('../util/pagination.js')
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

router.use((req,res,next)=>{
  if(req.userInfo.isAdmin){
    next()
  }else{
    res.send('<h1>请使用管理员账号登陆</h1>')
  }
})

router.get('/',(req, res)=> {
    const options = {
       page:req.query.page / 1,
       model:ArticleModel,
       query:{},
       projection:'-__v',
       sort:{_id:1}
    }
    pagination(options)
    .then(result=>{
        res.render('admin/article_list',{
            userInfo:req.userInfo,//获取用户信息
            articles:result.docs,
            page:result.page,
            list:result.list,
            pages:result.pages,
            url:'/article'
         })
    })
    .catch(err=>{
           console.log(err)
        })
})

router.get('/add',(req, res)=> {
	CategoryModel.find({},'name')
	.then(categories=>{
		res.render('admin/article_add_edit',{
		  	userInfo:req.userInfo,
		  	categories
		})
	})
  	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"数据库操作失败,请稍后再试"
		})
	})
})

//处理新增文章
router.post('/add',(req,res)=>{
	//1.获取参数信息
	let { category,title,intro,content } = req.body;
	ArticleModel.insertMany({category,title,intro,content,user:req.userInfo._id})
	.then(result=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:"新增文章成功",
			url:'/article'
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"数据库操作失败,请稍后再试",
			url:'/article'
		})
	})
	
})

//处理上传图片资源
router.post('/uploadImage',upload.single('upload'),(req,res)=>{
	// console.log(req.file)
	const filePath = '/uploads/' + req.file.filename;
	res.json({
		uploaded:true,
		url:filePath
	})
})

//显示编辑文章
router.get('/edit/:id',(req, res)=> {
	let id = req.params.id;
	// console.log(id)
	CategoryModel.find({})
	.then(categories=>{
		ArticleModel.findById(id)
		.then(article=>{
			res.render('admin/article_add_edit',{
			  	userInfo:req.userInfo,
			  	categories,
			  	article
			})
		})
		.catch(err=>{
			res.render('admin/err',{
				userInfo:req.userInfo,
				message:"数据库操作失败,请稍后再试"
			})
		})
	})
  	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"数据库操作失败,请稍后再试"
		})
	})
})

//处理编辑文章
router.post('/edit',(req,res)=>{
	//1.获取参数信息
	let { category,title,intro,content,id } = req.body;
	
	ArticleModel.updateOne({_id:id},{category,title,intro,content})
	.then(article=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:"更新文章成功",
			url:'/article'
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"数据库操作失败,请稍后再试"
		})
	})
})

//处理删除文章
router.get('/delete/:id',(req,res)=>{
	//1.获取参数信息
	const id = req.params.id;
	ArticleModel.deleteOne({_id:id})
	.then(article=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:"删除文章成功",
			url:'/article'
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"数据库操作失败,请稍后再试",
			url:'/article'
		})
	})
})
module.exports = router;