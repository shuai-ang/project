const mongoose = require('mongoose');
//1.定义文档模型
 var UserSchema = new mongoose.Schema({
	  username:{
	  	type:String,
	  	required:[true,"必须输入用户名"],
	  	minlength:[3,"最小长度不小于三位"],
	  	maxlength:[10,"最大长度不超过十位"]
	  },
	  password:{
	  	type:String
	  },
	  isAdmin:{
	  	type:Boolean,
	  	default:false
	  }
	});
 
 //2.根据文档模型生成对应集合
 //2.1第一个参数就是需要生成的集合名称，mongoose会将集合名称转化为复数
 //2.2第二个参数就是前面定义的模型
var UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;