var express = require('express')
var router = express.Router()
const CommentModel = require('../models/comment.js')
const pagination = require('../util/pagination.js')

router.use((req,res,next)=>{
  if(req.userInfo._id){
    next()
  }else{
    res.send('<h1>请使用管理员账号登陆</h1>')
  }
})