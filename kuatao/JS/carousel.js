;(function($){
	function Carousel($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.now = this.options.showIndex;
		this.$carouselItem = this.$elem.find('.carousel-item');
		this.itemNum = this.$carouselItem.length;
		this.$btns = this.$elem.find('.btn-item');
		this.$control = this.$elem.find('.control');
		this.timer = 0;
		//初始化
		this.init();
	}
	Carousel.prototype = {
		constructor:Carousel,
		init:function(){
			var _this = this;
			_this.$elem.trigger('carousel-show',[_this.now,_this.$carouselItem.eq(_this.now)]);
			if(this.options.slide){//划入划出
				this.$elem.addClass('slide');
				this.$carouselItem.eq(this.now).css({left:0});
				this.itemWidth = this.$carouselItem.eq(this.now).width();
				//this.$btns.eq(this.now).addClass('active');
				this.$carouselItem.on('move',function(){
					var index = _this.$carouselItem.index(this);
					if(_this.now != index){
						_this.$elem.trigger('carousel-show',[index,this])
					}
					
				})
				this.$carouselItem.move(this.options);
				this.tab = this._slide;
			}else{//淡入淡出
				//将所有图片隐藏
				this.$elem.addClass('fade');
				//默认显示
				this.$carouselItem.eq(this.now).show();
				this.$carouselItem.on('show',function(){
					_this.$elem.trigger('carousel-show',[_this.$carouselItem.index(this),this])
				})
				//this.$btns.eq(this.now).addClass('active');
				//将显示隐藏插件初始化
				this.$carouselItem.showHide(this.options);
				this.tab = this._fade;
				//将左右按钮显示出来(监听事件)
				/*
				this.$elem
				.hover(function(){
					this.$control.show();
				}.bind(this),function(){
					this.$control.hide();
				}.bind(this))
				.on('click','.control-left',function(){
					this._fade(this.getIndex(this.now - 1))
				}.bind(this))
				.on('click','.control-right',function(){
					this._fade(this.getIndex(this.now + 1))
				}.bind(this))
				//处理自动轮播
				if(this.options.interval){
					this.autoplay();
					this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this))
				}
				//处理底部按钮的点击事件
				var _this = this;
				this.$btns.on('click',function(){
					//获取对应的下标
					_this._fade(_this.$btns.index($(this)))
				})
				*/
			}
			this.$btns.eq(this.now).addClass('active');
			this.$elem
				.hover(function(){
					this.$control.show();
				}.bind(this),function(){
					this.$control.hide();
				}.bind(this))
				.on('click','.control-left',function(){
					this.tab(this.getIndex(this.now - 1),-1)
				}.bind(this))
				.on('click','.control-right',function(){
					this.tab(this.getIndex(this.now + 1),1)
				}.bind(this))
				//处理自动轮播
				if(this.options.interval){
					this.autoplay();
					this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this))
				}
				//处理底部按钮的点击事件
				
				this.$btns.on('click',function(){
					//获取对应的下标
					_this.tab(_this.$btns.index($(this)))
				})
		},
		_slide:function(index,direction){
			//console.log(index)
			if(!direction){
				if(this.now < index){
					direction = 1;
				}else{
					direction = -1;
				}
			}
			//如果当前值和即将显示的值相等的话，不执行
			if(this.now == index) return;
			$(this.$carouselItem[index]).css({left:direction * this.itemWidth});
			this.$carouselItem.eq(this.now).move('x',-1 * direction * this.itemWidth);
			$(this.$carouselItem[index]).move('x',0);
			this.$btns.eq(this.now).removeClass('active');
			this.$btns.eq(index).addClass('active');
			//将inde赋给this.now
			this.now = index;
		},
		_fade:function(index){
			//如果当前值和即将显示的值相等的话，不执行
			if(this.now == index) return;
			//让当前显示的隐藏
			this.$carouselItem.eq(this.now).showHide('hide');
			this.$btns.eq(this.now).removeClass('active');
			//让即将显现的出现
			$(this.$carouselItem[index]).showHide('show');
			this.$btns.eq(index).addClass('active');
			//将inde赋给this.now
			this.now = index;
		},
		getIndex:function(index){
			if(index < 0) return this.itemNum -1;
			if(index >= this.itemNum) return 0;
			return index;
		},
		autoplay:function(){
			this.timer = setInterval(function(){
				this.$control.eq(1).trigger('click')
			}.bind(this),this.options.interval)
		},
		paused:function(){
			clearInterval(this.timer)
		}

	}

	Carousel.DEFAULTS = {
		slide:true,
		showIndex:0,
		interval:1000,
		js:true,
		mode:'fade'
	}



	$.fn.extend({
		carousel:function(options){

			return this.each(function(){
				var $elem = $(this);
				var carousel  = $elem.data('carousel');
				if(!carousel){
					options = $.extend({},Carousel.DEFAULTS,options);
					carousel = new Carousel($elem,options);
					$elem.data('carousel',carousel)
				}
				if(typeof carousel[options] == 'function'){
					carousel[options]();
				}

			})
		}
	})





})(jQuery);