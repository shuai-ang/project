const express = require('express')
const app = express()
const swig = require('swig')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//解析json
app.use(bodyParser.json());
//解析urlencoded内容
app.use(bodyParser.urlencoded({ extended: false }));

//处理静态资源
app.use(express.static('public'))

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', function(){
	 console.log('connection error:')
});
db.once('open', function() {
	 console.log('connection success')
 })

//1.设置缓存
//开发阶段设置不走缓存
swig.setDefaults({
	  cache: false
	})
//2.配置应用模板
//第一个参数是模板名称,同时也是模板文件的扩展名
//第二个参数是解析模板的方法
app.engine('html', swig.renderFile);

//3.配置模板的存放目录
app.set('views', './views')

//4.注册模板引擎
app.set('view engine', 'html')

//配置cookies

app.use((req,res,next)=>{
	req.cookies = new Cookies(req,res);
})
//配置路由
app.use('/',require('./routers/index.js'))
app.use('/user',require('./routers/user.js'))

app.listen(3000, () => console.log('Server is running at http://127.0.0.1:3000!'))