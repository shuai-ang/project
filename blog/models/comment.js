const mongoose = require('mongoose');
const moment = require('moment');
const pagination = require('../util/pagination.js')
//1.定义文档模型
 var CommentSchema = new mongoose.Schema({
	  content:{
	  	type:String
	  },
	  user:{
	  	type:mongoose.Schema.Types.ObjectId,
	  	ref:'user'
	  },
	  article:{
	  	type:mongoose.Schema.Types.ObjectId,
	  	ref:'article'
	  },
	  createAt:{
	  	type:Date,
	  	default:Date.now
	  }
	});
 CommentSchema.virtual('createdTime').get(function() {
    return moment(this.createAt).format('YYYY - MM - DD HH:mm:ss')
})

 //定义分页静态方法
CommentSchema.statics.getPaginationData = function(req,query={}){
	const options = {
       page:req.query.page / 1,
       model:CommentModel,
       query:query,
       projection:'-__v',
       sort:{_id:1},
       populates:[{ path: 'user', select: 'username' },{ path: 'article', select: 'title' }]
    }
    return pagination(options)
    
}

 //2.根据文档模型生成对应集合
 //2.1第一个参数就是需要生成的集合名称，mongoose会将集合名称转化为复数
 //2.2第二个参数就是前面定义的模型
var CommentModel = mongoose.model('comment', CommentSchema);

module.exports = CommentModel;