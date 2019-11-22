var express = require('express')
var router = express.Router()
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')

async function getDataPromise(){
   const getCategoriesDataPromise = CategoryModel.find({},'name').sort({order:1})
   const getArticlesDataPromise = ArticleModel.find({},'title click').sort({click:-1})
   const categories = await getCategoriesDataPromise;
   const topArticles = await getArticlesDataPromise;
   return {
       categories,
       topArticles
   }
}

router.get('/',(req, res)=> {
	/*
	let userInfo = {}
	if(req.cookies.get('userInfo')){
		userInfo = JSON.parse(req.cookies.get('userInfo'));
	}
	*/
  ArticleModel.getPaginationData(req)
  .then(result=>{
      getDataPromise()
      .then(data=>{
         const { categories,topArticles } = data;
         res.render('main/index',{
            userInfo:req.userInfo,
            categories,
            topArticles,
            articles:result.docs,
            page:result.page,
            list:result.list,
            pages:result.pages,
            url:'/'
          })
      })
  })
  
  
})
router.get('/list',(req, res)=> {
  res.render('main/list',{
  	userInfo:req.userInfo
  })
})
router.get('/detail',(req, res)=> {
  res.render('main/detail',{
  	userInfo:req.userInfo
  })
})
//处理首页文章分页ajax
router.get('/articles',(req,res)=>{
  ArticleModel.getPaginationData(req)
  .then(result=>{
     res.json({
        code:0,
        message:"获取文章成功",
        data:result
     })
  })
  .catch(err=>{
     res.json({
        code:10,
        message:"获取文章失败"
     })
  })
})
module.exports = router;