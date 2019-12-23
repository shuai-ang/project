require('./index.css')
var Hogan = require('hogan.js')
var tpl = require('./index.tpl')
var _util = require('util')

module.exports = {
	render:function(name){
		// console.log(name)
		var list = [
			{
				name:'user-center',
				url:'./user-center.html',
				desc:'用户中心'
			},
			{
				name:'order-list',
				url:'./order-list.html',
				desc:'我的订单'
			},
			{
				name:'user-update-password',
				url:'./user-update-password.html',
				desc:'修改密码'
			}
		]

		list.find(function(item){
			return item.name == name
		}).isActive = true
		// console.log(list)
		var html = _util.render(tpl,{
			list:list
		});

		// prints "Follow @dhg."
		$('.side').html(html);
	}
}