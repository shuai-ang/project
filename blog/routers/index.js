var express = require('express')
var router = express.Router()
router.get('/',(req, res)=> {
	/*
	let userInfo = {}
	if(req.cookies.get('userInfo')){
		userInfo = JSON.parse(req.cookies.get('userInfo'));
	}
	*/
  res.render('main/index',{
  	userInfo:req.userInfo
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
module.exports = router;