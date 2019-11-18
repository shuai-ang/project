var express = require('express')
var router = express.Router()
const UserModel = require('../models/user.js')

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
    
})

module.exports = router;