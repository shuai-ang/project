require('./index.css')
var api = require('api')
var _util = require('util')

var page = {
	init:function(){
		this.loadUsername()
		this.bindEvent()
		this.loadCarts()
		return this
	},
	loadUsername:function(){
		api.getUsername({
			success:function(data){
				// console.log(data)
				$('.not-login').hide()
				$('.login')
				.show()
				.find('.username')
				.text(data.username)
			}
		})
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			api.logout({
				success:function(data){
					window.location.reload()
				},
				error:function(err){
					_util.showErrMsg(err)
				}
			})
		})
		
	},
	loadCarts:function(){
		var $cartNum = $('.cart-num')
		api.getCartsNum({
			success:function(data){
				$cartNum.text(data)
			},
			error:function(){
				$cartNum.text(0)
			}
		})
	}
}

module.exports = page.init()