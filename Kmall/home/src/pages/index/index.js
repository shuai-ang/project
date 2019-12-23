require('./index.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
import Swiper from 'swiper'
require ('node_modules/swiper/css/swiper.min.css')
var _util = require('util')
var api = require('api')
var categoriesTpl = require('./categories.tpl')
var adsTpl = require('./ads.tpl')
var floorsTpl = require('./floors.tpl')

var page = {
	init:function(){
		this.loadHomeCategories()
		this.loadSwiper()
		this.loadHomeFloors()
	},
	loadHomeCategories:function(){
		api.getHomeCategories({
			success:function(data){
				// console.log(data)
				var html = _util.render(categoriesTpl,{
					categories:data
				})
				$('.categories').html(html)
			},
			error:function(err){
				console.log(err)
			}
		})
	},
	loadSwiper:function(){
		
		api.getAdsImage({
			position:1,
			success:function(data){
				// console.log(data)
				var html = _util.render(adsTpl,{
					slides:data
				})
				$('.swiper-container .swiper-wrapper').html(html)
				var mySwiper = new Swiper ('.swiper-container', {
				    loop: true, // 循环模式选项
				    
				    // 如果需要分页器
				    pagination: {
				      el: '.swiper-pagination',
				      clickable :true
				    },
				    
				    // 如果需要前进后退按钮
				    navigation: {
				      nextEl: '.swiper-button-next',
				      prevEl: '.swiper-button-prev',
				    },
				    autoplay:true,
				    
				})
			}
		})

	},
	loadHomeFloors:function(){
		api.getHomeFloors({
			success:function(data){
				console.log(data)
				var html = _util.render(floorsTpl,{
					floors:data
				})
				$('.floor-wrap').html(html)
			}
		})
	}
}



$(function(){
	page.init()
})