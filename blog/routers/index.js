var express = require('express')
var router = express.Router()
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
const CommentModel = require('../models/comment.js')

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
router.get('/list/:id',(req, res)=> {
  let id = req.params.id;
  ArticleModel.getPaginationData(req,{category:id})
  .then(result=>{
      getDataPromise()
      .then(data=>{
         const { categories,topArticles } = data;
         res.render('main/list',{
            userInfo:req.userInfo,
            categories,
            topArticles,
            articles:result.docs,
            page:result.page,
            list:result.list,
            pages:result.pages,
            url:'/',
            currentCategoryId:id
          })
      })
  })
})

//获取详情页数据
async function getCommonData(req){
  let id = req.params.id;

  const getArticleData = ArticleModel.findOneAndUpdate({_id:id},{$inc:{click:1}},{new:true})
                        .populate({ path: 'user', select: 'username' })
                        .populate({ path: 'category', select: 'name' })

  const getCommentData = CommentModel.getPaginationData(req,{article:id});
   const getCommonData = getDataPromise();
   const articleData = await getArticleData;

   const commentData = await getCommentData;
   const commonData = await getCommonData;
   const { categories,topArticles } = commonData;
   return {
       categories,
       topArticles,
       articleData,
       commentData
   }
}

router.get('/detail/:id',(req, res)=> {
  getCommonData(req)
  .then(data=>{
     const { categories,topArticles,articleData,commentData } = data;
     // console.log(articleData)
      res.render('main/detail',{
          userInfo:req.userInfo,
          categories,
          topArticles,
          articleData,
          currentCategoryId:articleData.category._id.toString(),
          //返回分页数据
          comments:commentData.docs,
          page:commentData.page,
          list:commentData.list,
          pages:commentData.pages
      })
  })
  
})
//处理首页文章分页ajax
router.get('/articles',(req,res)=>{
  let id = req.query.id;
  let query = {};
  if(id){
     query.category = id;
  }
  ArticleModel.getPaginationData(req,query)
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

