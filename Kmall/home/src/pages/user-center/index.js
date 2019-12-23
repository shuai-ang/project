require('./index.css')
require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')
var _util = require('util')
var api = require('api')
var tpl = require('./index.tpl')

var page = {
	init:function(){
		this.renderSide()
		this.loadUserInfo()
	},
	renderSide:function(){
		_side.render('user-center')
	},
	loadUserInfo:function(){
		api.getUserInfo({
			success:function(data){
				// console.log(data)
				var html = _util.render(tpl,data)
				$('.side-content').html(html)
			},
			error:function(err){
				console.log(err)
			}
		})
	}
}

$(function(){
	page.init()
})