const mongoose = require('mongoose');
//1.定义文档模型
 var ArticleSchema = new mongoose.Schema({
	  title:{
	  	type:String
	  },
	  intro:{
	  	type:String
	  },
	  user:{
	  	type:mongoose.Schema.Types.ObjectId,
	  	ref:'user'
	  },
	  category:{
	  	type:mongoose.Schema.Types.ObjectId,
	  	ref:'category'
	  },
	  createAt:{
	  	type:Date,
	  	default:Date.now
	  },
	  click:{
	  	type:Number,
	  	default:0
	  },
	  content:{
	  	type:String
	  }
	});
 
 //2.根据文档模型生成对应集合
 //2.1第一个参数就是需要生成的集合名称，mongoose会将集合名称转化为复数
 //2.2第二个参数就是前面定义的模型
var ArticleModel = mongoose.model('article', ArticleSchema);

module.exports = ArticleModel;