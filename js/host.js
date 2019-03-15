$(function(){
	var hostSlice = function(){
		window.d = {};
		var hostShow 		= $('#host #hostShow'),
			hostPage 		= $('#host #page'),
			hostSelectbtn 	= $('#host .host-select a'),
			scrollElement 	= document.body.scrollTop ? document.body : document.documentElement,
			starIntro = {
				2:'经济型',
				3:'舒适型',
				4:'高档型',
				5:'豪华型'
			};
		
		function pageNumByLength( num ){	
			if( num <= 2 ) return;
			var data = window.d;
			var pageWarp = $('<div>');
			var pagePrev = $('<a>');
			var pageNext = $('<a>');
			pagePrev.attr('class', 'pagePrev');
			pagePrev.attr('href', '');
			pagePrev.html('上一页');
			pageNext.attr('class', 'pageNext');
			pageNext.attr('href', '');
			pageNext.html('下一页') ;
			pageWarp.append(pagePrev);
			for(var i = 1; i <= num; i++){
				var pageNum = $('<a>');
				pageNum.attr('class', 'pageNum');
				pageNum.attr('href','javascript:void(0);');
				pageNum.attr('data-page',i);
				pageNum.html(i);
				pageWarp.append(pageNum);
			}
			pageWarp.append( pageNext );
			
			return pageWarp;
		}

		 
		function createHostLi(json){
			var hostName 		= json.host_name,
				hostStar 		= json.host_star,
				host_tuniuLink 	= json.host_tuniuLink,
				hostPos 		= json.host_pos,
				hostAddress 	= json.host_address,
				hostImgUrl 		= json.host_imgUrl,
				hostPrice 		= json.host_price,
				hostScore 		= json.host_score,
				hostDecorateYear= json.host_decorateYear;

				hostPrice   != 0 ? hostPrice = '￥' + hostPrice + '元起' 		 : hostPrice = '暂无报价';
				hostScore   != 0 ? hostScore = hostScore + '/5分'				 : hostScore = '暂无评分';
				hostDecorateYear ? hostDecorateYear = hostDecorateYear + '年装修' : hostDecorateYear = '';
				hostStar = starIntro[hostStar];

			var hostLi ='<div class="host-img fl"><img src="' + hostImgUrl + '" alt="'+ hostName +'"></div>' + 
						'<div class="host-info fl">'+
							'<div class="nameAndType">'+
								'<a class="host-name" href="http://hotel.tuniu.com'+ host_tuniuLink +'" m="查看详情">'+ hostName +'</a>'+
								'<span class="host-star">'+ hostStar +'</span>'+
								'<span class="decorate-year">'+ hostDecorateYear +'</span>'+
							'</div>'+
							'<div class="address">'+ hostAddress +'</div>'+
							'<div class="route"><a href="javascript:void(0);" class="pos" data-pos="'+ hostPos +'">查看地图</a></div>'+
						'</div>'+
						'<div class="priceAndScore fl">'+
							'<div class="startPrice"><span>'+ hostPrice +'</span></div>'+
							'<div class="score"><span>'+ hostScore +'</span></div>'+
							'<div class="detail"><a class="radiu shadow" href="http://hotel.tuniu.com'+ host_tuniuLink +'">查看详情</a></div>'+
						'</div>';

			var hostRow = document.createElement('div');

			hostRow.setAttribute('class', 'hostRow clearfix');
			hostRow.innerHTML = hostLi;

			return hostRow;
		}


		function getDataAndCreateLi( data, callback ){
			window.d = data;
			var to = './php/selectHost',
				method = 'get';
			getAjax( method, to, data, callback );
		}
		function action( data ){
			var data = JSON.parse(data), 
				pageN = data.length/20 +1,
				page = pageNumByLength(pageN);
			//page
			$(hostPage).append(page);
			$(page).children('a').eq(1).addClass('pageActive');
			$(page).children('a').click(function(event) {
				var className = $(this).attr('class');
				if( className.indexOf('pagePrev')  !== -1 ) window.d.page && window.d.page--; 
				if( className.indexOf('pageNext')  !== -1 ) window.d.page == pageN || window.d.page++;
				if( className.indexOf('pageNum')   !== -1 ) window.d.page = $(this).data('page');
				if( className.indexOf('pageActive') == -1){
					$(page).children('a').removeClass('pageActive');
					$(page).children('a').eq(window.d.page).addClass('pageActive');
					getDataAndCreateLi(window.d, pageAClick);
				}
				return false;
			});

			for(var i = 0; i < data.data.length; i++) 
				$(hostShow).append( createHostLi(data.data[i]) );
			
			startPos();		//重新加载pos按钮(含有pos类的)  点击选择条一次
		}

		function pageAClick(data){
			var data = JSON.parse(data);
			$(hostShow).html('');
			for(var i = 0; i < data.data.length; i++) 
				$(hostShow).append( createHostLi(data.data[i]) );
			
			startPos();		//重新加载pos按钮(含有pos类的)  点击分页按钮一次
			$(scrollElement).animate({"scrollTop":"0"},300);	//回到顶部
			return false;
		}

		hostShow.html('');
		hostPage.html('');
		getDataAndCreateLi( {page:1}, action );

		hostSelectbtn.click(function(event){
			if( $(this).data('star') ){
				var star = $(this).data('star');
				var data = { star: star,page:1 };
			}else if( $(this).data('score') ){
				var score 	= $(this).data('score');
				var data 	= { score: score,page:1 };
			}else if( $(this).data('pricetop')  ){
				var pricetop 	= $(this).data('pricetop');
				var pricebottom = $(this).data('pricebottom');
				var data = { pricetop:pricetop, pricebottom:pricebottom,page:1 };
			}else{
				var data = {page:1};
			}
			hostShow.html('');
			hostPage.html('');
			getDataAndCreateLi( data, action );
			return false;
		});
	};

	hostSlice();

});