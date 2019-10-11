;(function($){
	function Carousel($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.now = this.options.showIndex;
		this.$carouselItem = this.$elem.find('.carousel-item');
		this.$itemNum = this.$carouselItem.length;
		this.$btns = this.$elem.find('.btn-item');
		this.$control = this.$elem.find('.control');
		this.timer = 0;
		//初始化
		this.init();
	}
	Carousel.prototype = {
		constructor:Carousel,
		init:function(){
			if(this.options.slide){

			}else{
				this.$elem.addClass('fade');
				this.$carouselItem.eq(this.now).show();
				this.$btns.eq(this.now).addClass('active');
				this.$carouselItem.showHide({js:true,mode:'fade'})
				this.$elem.hover(function(){
					this.$control.show();
				}.bind(this),function(){
					this.$control.hide();
				}.bind(this))
				.on('click','.control-left',function(){
					this._fade(this.getIndex(this.now - 1));
				}.bind(this))
				.on('click','.control-right',function(){
					this._fade(this.getIndex(this.now + 1));
				}.bind(this))
				if(this.options.interval){
					this.autoplay();
					this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this));
				}
			}
		},
		_fade:function(index){
			this.$carouselItem.eq(this.now).showHide('hide');
			this.$btns.eq(this.now).removeClass('active');
			this.$carouselItem.eq(index).showHide('show');
			this.$btns.eq(index).addClass('active');
			this.now = index;
		},
		getIndex:function(index){
			if(index <0) return this.$itemNum - 1;
			if(index >= this.$itemNum) return 0;
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
		slide:false,
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