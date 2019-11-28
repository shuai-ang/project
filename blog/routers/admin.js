var express = require('express')
var router = express.Router()
const UserModel = require('../models/user.js')
const CommentModel = require('../models/comment.js')
const pagination = require('../util/pagination.js')
const hmac = require('../util/hmac.js')

//权限验证
router.use((req,res,next)=>{
  if(req.userInfo.isAdmin){
    next()
  }else{
    res.send('<h1>请使用管理员账号登陆</h1>')
  }
})

router.get('/',(req, res)=> {
  res.render('admin/index',{
  	userInfo:req.userInfo
  })
})
router.get('/user',(req, res)=> {
    /*
    const limit = 2;
    let page = req.query.page / 1;

    if(isNaN(page)){
       page = 1
    }
    //上一页边界控制
    if(page == 0){
       page = 1
    }

    UserModel.countDocuments((err,count)=>{
       // console.log(count)
       let pages = Math.ceil(count/limit);
       if(page > pages){
          page = pages;
       }
       let list = [];
       for(let i=1;i<=pages;i++){
          list.push(i)
       }

       let skip = (page - 1)*limit;
        UserModel.find({},'-password -__v')
        .skip(skip)
        .limit(limit)
        .sort({_id:-1})
        .then(users=>{
           res.render('admin/user_list',{
              userInfo:req.userInfo,//获取用户信息
              users:users,
              page:page,
              list:list,
              pages:pages
           })
        })
        .catch(err=>{
           console.log(err)
        })
    })
    */
    const options = {
       page:req.query.page / 1,
       model:UserModel,
       query:{},
       projection:'-password -__v',
       sort:{_id:-1}
    }
    pagination(options)
    .then(result=>{
        res.render('admin/user_list',{
            userInfo:req.userInfo,//获取用户信息
            users:result.docs,
            page:result.page,
            list:result.list,
            pages:result.pages,
            url:'/admin/user'
         })
    })
    .catch(err=>{
           console.log(err)
        })
})

router.get('/comment',(req,res)=>{
  CommentModel.getPaginationData(req)
  .then(result=>{
       res.render('admin/comment_list',{
            userInfo:req.userInfo,//获取用户信息
            comments:result.docs,
            page:result.page,
            list:result.list,
            pages:result.pages
         })
  })
  .catch(err=>{
     console.log(err)
  })   
})

router.get('/comment/delete/:id',(req,res)=>{
  const id = req.params.id;
  CommentModel.deleteOne({_id:id})
  .then(comment=>{
    res.render('admin/ok',{
      userInfo:req.userInfo,
      message:"删除评论成功",
      url:'/admin/comment'
    })
  })
  .catch(err=>{
    res.render('admin/err',{
      userInfo:req.userInfo,
      message:"数据库操作失败,请稍后再试",
      url:'/admin/comment'
    })
  })
})
//显示修改密码页面
router.get('/password',(req,res)=>{
    res.render('admin/password',{
         userInfo:req.userInfo
    })
})

//处理修改密码路由
router.post('/password',(req,res)=>{
  const { password } = req.body;
  UserModel.updateOne({_id:req.userInfo._id},{password:hmac(password)})
  .then(data=>{
       req.session.destroy();
       res.render('admin/ok',{
         userInfo:req.userInfo,
         message:"修改密码成功",
         url:'/'
       })
  })
  .catch(err=>{
       res.render('admin/err',{
         userInfo:req.userInfo,
         message:"更新密码失败,请稍后再试"
       })
  })
})

module.exports = router;