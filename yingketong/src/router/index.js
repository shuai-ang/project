//1.引入模块
import Vue from "vue"
import VueRouter from "vue-router"

//2.引入页面组件
import Home from 'pages/home'
import ActivityDec from 'pages/activitydec'
import Charts from 'pages/charts'
import PersonInfo from 'pages/personinfo'
import GetActivity from 'pages/getactivity'
import VoteShop from 'pages/voteshop'

//砍价部分
import BargainHome from 'pages/bargainhome'
import BargainShare from 'pages/bargainshare'

//转阅部分
import TransferHome from 'pages/transferhome'
import TransferDetail from 'pages/transferdetail'

//空白页处理
import EmptyPage from 'pages/emptypage'

//3.声明使用
Vue.use(VueRouter)


//4.导出路由对象
export default new VueRouter({
	mode:'hash',
	base:'/yingketong-1.0.1',
	routes:[
		{
			path:"/home",
			meta: {
		      title: '2020 第一届拉粉活动'
		    },
			component:Home
		},
		{
			path:"/activitydec",
			meta: {
		      title: '2020 第一届拉粉活动'
		    },
			component:ActivityDec
		},
		{
			path:"/charts",
			meta: {
		      title: '2020 第一届拉粉活动'
		    },
			component:Charts
		},
		{
			path:"/personinfo",
			meta: {
		      title: '2020 第一届拉粉活动'
		    },
			component:PersonInfo
		},
		{
			path:"/voteshop",
			meta: {
		      title: '2020 第一届拉粉活动'
		    },
			component:VoteShop
		},
		{
			path:"/getactivity",
			meta: {
		      title: '我要发起活动'
		    },
			component:GetActivity
		},
		{
			path:"/bargainhome",
			meta: {
		      title: '砍价商城'
		    },
			component:BargainHome
		},
		{
			path:"/bargainshare",
			meta: {
		      title: '砍价商城'
		    },
			component:BargainShare
		},
		{
			path:"/transferhome",
			meta: {
		      title: '转阅'
		    },
			component:TransferHome
		},
		{
			path:"/transferdetail",
			meta: {
		      title: '转阅'
		    },
			component:TransferDetail
		},
		{
			path:"/emptypage",
			meta: {
		      title: '审核中'
		    },
			component:EmptyPage
		},
	]
})