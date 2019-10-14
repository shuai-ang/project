;(function($){
	//共通只加载一次html
	function loadHtmlOnce($elem,cb){

		var $layer = $elem.find('.dropdown-layer');
		var dataUrl = $elem .data('url');
		if(!dataUrl) return;
		if($elem.data('isLoaded')) return;
		$.getJSON(dataUrl,function(data){
			$elem.data('isLoaded',true);
			/*
			var html = '';
			
			for(var i=0;i<data.length;i++){
				html += '<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
			}
			//.模仿数据加载
			setTimeout(function(){
				$layer.html(html);
			},1000)
			*/
			typeof cb == 'function' && cb(data,$layer);
			
			
		})
	}
	//封装加载图片的函数
	function ImgLoad(imgUrl,success,error){
		var image = new Image();
		image.onload = function(){
			typeof success == 'function' && success();
		}
		image.onerror = function(){
			typeof error == 'function' && error();
		}
		setTimeout(function(){
			image.src = imgUrl;
		},500)
		
	}
	function carouselLazyLoad($elem){
		$elem.item = {};
		$elem.loadItemNum = $elem.find('.carousel-item').length;
		$elem.loadedItemNum = 0;
		$elem.fnload = null;
		//开始加载
		$elem.on('carousel-show',$elem.fnload = function(ev,index,elem){
			//console.log('carousel-show');
			$elem.trigger('carousel-load',[index,elem]);
		})
		//执行加载
		$elem.on('carousel-load',function(ev,index,elem){
			if($elem.item[index] != 'loaded'){
				//console.log('loaded',index)
				var $Imgs = $(elem).find('.carousel-img');
				$Imgs.each(function(){
					var $Img = $(this);
					var imgUrl = $Img.data('src');
					ImgLoad(imgUrl,function(){
						$Img.attr('src',imgUrl);
					},function(){
						$Img.attr('src',"images/focus-carousel/placeholder.png");
					})
					
				})
				$elem.item[index] = 'loaded';
				$elem.loadedItemNum ++;
				if($elem.loadedItemNum == $elem.loadItemNum){
					$elem.trigger('carousel-loaded');
					
				}
			}
		})
		//加载结束
		$elem.on('carousel-loaded',function(){
			$elem.off('carousel-show',$elem.fnload);
		})
	}
	//轮播图楼层图片懒加载
	function floorImgLazyLoad($elem){
		$elem.item = {};
		$elem.loadItemNum = $elem.find('.floor-item').length;
		$elem.loadedItemNum = 0;
		$elem.fnload = null;
		//开始加载
		$elem.on('floor-show',$elem.fnload = function(ev,index,elem){
			//console.log('carousel-show');
			$elem.trigger('floor-load',[index,elem]);
		})
		//执行加载
		$elem.on('floor-load',function(ev,index,elem){
			if($elem.item[index] != 'loaded'){
				//console.log('loaded',index)
				var $Imgs = $(elem).find('.floor-img');
				$Imgs.each(function(){
					var $Img = $(this);
					var imgUrl = $Img.data('src');
					ImgLoad(imgUrl,function(){
						$Img.attr('src',imgUrl);
					},function(){
						$Img.attr('src',"images/floor/placeholder.png");
					})
					
				})
				$elem.item[index] = 'loaded';
				$elem.loadedItemNum ++;
				if($elem.loadedItemNum == $elem.loadItemNum){
					$elem.trigger('floor-loaded');
					
				}
			}
		})
		//加载结束
		$elem.on('floor-loaded',function(){
			$elem.off('floor-show',$elem.fnload);
		})
	}

	function handleDropDown(){
		var $dropdown = $('.nav-side .dropdown');
		
		$dropdown.on('dropdown-show',function(ev){
			/*
			var $elem = $(this);
			var $layer = $elem.find('.dropdown-layer');
			var dataUrl = $elem .data('url');
			if(!dataUrl) return;
			if($elem.data('isLoaded')) return;
			$.getJSON(dataUrl,function(data){
				$elem.data('isLoaded',true);
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
				}
				
				
			})
			*/
			loadHtmlOnce($(this),createMenuHtml)
			function createMenuHtml(data,$layer){
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
				}
				//.模仿数据加载
				setTimeout(function(){
					$layer.html(html);
				},1000)
			}
		})
		$dropdown.dropdown({delay:200}); 
		/*
		$('.nav-side button').on('click',function(ev){
			// ev.stopPropagation();
			$('.nav-side .dropdown').dropdown('show');
		})
		*/
	}
	handleDropDown();
	function handleSearch(){
		$('.search').search();
		$('.search').on('getData',function(ev,data){
			//1.将数据包装成html代码
			var html = createLayerHtml(data,5);
			//2.将html代码放入到下拉层中
			// this.addHtml(html);
			$('.search').search('addHtml',html);
			//3.将下拉层展示出来
			// this.showLayer()
			$('.search').search('showLayer');

		})
		$('.search').on('getNoData',function(){
			/*
			this.addHtml('');
			this.hideLayer();
			*/
			$('.search').search('addHtml','');
			$('.search').search('hideLayer');

		})
		function createLayerHtml(data,itenNum){
			var html = '';
			for(var i=0;i<data.result.length;i++){
				if(i >= itenNum) break;
				html += '<li class="search-item">'+data.result[i][0]+'</li>';
			}
			return html;
		}
	}
	handleSearch();

	function handleCategory(){
		var $dropdown = $('.category .dropdown');
		
		$dropdown.on('dropdown-show',function(ev){
			/*
			var $elem = $(this);
			var $layer = $elem.find('.dropdown-layer');
			var dataUrl = $elem .data('url');
			if(!dataUrl) return;
			if($elem.data('isLoaded')) return;
			$.getJSON(dataUrl,function(data){
				$elem.data('isLoaded',true);
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">'
					for(var j=0;j<data[i].items.length;j++){
						html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
					}
					html += '</dd></dl>'
				}
				//.模仿数据加载
				setTimeout(function(){
					 $layer.html(html);
				},1000)
				
			})
			*/
			loadHtmlOnce($(this),createCategoryHtml)
			function createCategoryHtml(data,$layer){
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">'
					for(var j=0;j<data[i].items.length;j++){
						html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
					}
					html += '</dd></dl>'
				}
				//.模仿数据加载
				setTimeout(function(){
					$layer.html(html);
				},1000)
			}
		})
		$dropdown.dropdown({delay:200,js:true,mode:"fade"});
	}
	handleCategory();
	
	

	function handleCarousel(){
		var $carousel = $('.focus .carousel-wrap');
		/*
		var item = {};
		var loadItemNum = $carousel.find('.carousel-item').length;
		var loadedItemNum = 0;
		var fnload = null;
		//开始加载
		$carousel.on('carousel-show',fnload = function(ev,index,elem){
			//console.log('carousel-show');
			$carousel.trigger('carousel-load',[index,elem]);
		})
		//执行加载
		$carousel.on('carousel-load',function(ev,index,elem){
			if(item[index] != 'loaded'){
				//console.log('loaded',index)
				var $Img = $(elem).find('.carousel-img');
				var imgUrl = $Img.data('src');
				
				var image = new Image();
				image.onload = function(){
					$Img.attr('src',imgUrl);
				}
				image.onerror = function(){
					$Img.attr('src',"images/focus-carousel/placeholder.png");
				}
				image.src = imgUrl;
				
				ImgLoad(imgUrl,function(){
					$Img.attr('src',imgUrl);
				},function(){
					$Img.attr('src',"images/focus-carousel/placeholder.png");
				})
				item[index] = 'loaded';
				loadedItemNum ++;
				if(loadedItemNum == loadItemNum){
					$carousel.trigger('carousel-loaded');
					
				}
			}
		})
		//加载结束
		$carousel.on('carousel-loaded',function(){
			$carousel.off('carousel-show',fnload);
		})
		*/
		carouselLazyLoad($carousel);
		$carousel.carousel({});
	}
	handleCarousel();
	function handleTodays(){
		var $carousel = $('.todays .carousel-wrap');
		carouselLazyLoad($carousel);
		$carousel.carousel({});
	}
	handleTodays();
	function handleFloor(){
		var $floor = $('.floor');
		var $win = $(window);
		var $doc = $(document);
		/*
		$floor.on('floor-show',function(ev,index,item){

		})
		*/
		/*
		$floor.each(function(){
			floorImgLazyLoad($(this));
		})
		*/
		$doc.on('floor-b',function(ev,index,elem){
			console.log(index,elem)
		})
		function timeToshow(){
			$floor.each(function(index,elem){
				if(isVisitable($(this))){
					//console.log(index,this)
					clearTimeout(elem.timer);
					elem.timer = setTimeout(function(){
						$doc.trigger('floor-b',[index,elem]);
					},200)
					
				}
			})
		}
		$win.on('scroll load resize',timeToshow);
		
		function isVisitable($elem){
			return $win.scrollTop() + $win.height() > $elem.offset().top && $win.scrollTop() < $elem.offset().top + $elem.height();
		}
		$floor.tab({});
	}
	handleFloor();
})(jQuery);