const express = require('express')
const app = express()
const swig = require('swig')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Cookies = require('cookies')
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

//解析json
app.use(bodyParser.json());
//解析urlencoded内容
app.use(bodyParser.urlencoded({ extended: false }));

//处理静态资源
app.use(express.static('public'))

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

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
/*
app.use((req,res,next)=>{
	//生成cookies对象并存到req
	req.cookies = new Cookies(req,res);
	let userInfo = {}
	if(req.cookies.get('userInfo')){
		userInfo = JSON.parse(req.cookies.get('userInfo'));
	}
	req.userInfo = userInfo;
	next()
})
*/

app.use(session({
    //设置cookie名称
    name:'blogid',
    //用它来对session cookie签名，防止篡改
    secret:'abc',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use((req,res,next)=>{
	//获取并将cookies存到req.userInfo
	req.userInfo = req.session.userInfo || {}
	next()
})

//配置路由
app.use('/',require('./routers/index.js'))
app.use('/user',require('./routers/user.js'))
app.use('/admin',require('./routers/admin.js'))
app.use('/category',require('./routers/category.js'))
app.use('/article',require('./routers/article.js'))
app.use('/comment',require('./routers/comment.js'))

app.listen(3000, () => console.log('Server is running at http://127.0.0.1:3000!'))