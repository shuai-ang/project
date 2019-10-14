;(function($){
	function Tab($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.now = this.getIndex(this.options.showIndex);
		this.tabItem = this.$elem.find('.tab-item');
		this.tabPanel = this.$elem.find('.tab-panel');
		this.itemNum = this.tabItem.length;
		this.timer = 0;
		//初始化
		this.init();
	}
	Tab.prototype = {
		constructor:Tab,
		init:function(){
			var _this = this;
			this.$elem.trigger('floor-show',[this.tabPanel.index(this.now),this.tabPanel[this.now]]);
			this.tabPanel.eq(this.now).show();
			this.tabItem.eq(this.now).addClass('tab-item-active');
			this.tabPanel.showHide(this.options);
			this.tabPanel.on('show',function(ev,index,elem){
				_this.$elem.trigger('floor-show',[_this.tabPanel.index(this),this])
			})
			var eventName = this.options.eventName == 'click' ? 'click' : 'mouseenter';
			this.$elem.on(eventName,'.tab-item',function(){
				_this._toggle(_this.tabItem.index(this));
			})
			if(this.options.interval){
				this.autoplay();
				this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this))
			}
		},
		_toggle:function(index){
			if(this.now == index) return;
			this.tabPanel.eq(this.now).showHide('hide');
			this.tabItem.eq(this.now).removeClass('tab-item-active');
			this.tabPanel.eq(index).showHide('show');
			this.tabItem.eq(index).addClass('tab-item-active');
			this.now = index;
		},
		getIndex:function(index){
			if(index < 0) return this.itemNum -1;
			if(index >= this.itemNum) return 0;
			return index;
		},
		autoplay:function(){
			this.timer = setInterval(function(){
				this._toggle(this.getIndex(this.now + 1));
			}.bind(this),this.options.interval)
		},
		paused:function(){
			clearInterval(this.timer)
		}

	}

	Tab.DEFAULTS = {
		showIndex:0,
		interval:1000,
		js:false,
		mode:'fade'
	}



	$.fn.extend({
		tab:function(options){

			return this.each(function(){
				var $elem = $(this);
				var tab  = $elem.data('tab');
				if(!tab){
					options = $.extend({},Tab.DEFAULTS,options);
					tab = new Tab($elem,options);
					$elem.data('tab',tab)
				}
				if(typeof tab[options] == 'function'){
					tab[options]();
				}

			})
		}
	})





})(jQuery);