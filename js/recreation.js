$(function(){
	var recreationSlice = function(){
		window.d = {};
		var recreationShow 	    = $('#recreation #recreationShow');
		var recreationPage 	    = $('#recreation #page');
		var recreationSelectbtn = $('#recreation .recreation-select a');
		var recreationType		= $('#recreation .recreationType');
		var scrollElement 		= document.body.scrollTop ? document.body : document.documentElement;
	
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

		function createRecreationLi(json){
			var recreationName 		= json.recreation_name,
				recreationScore 	= json.recreation_score,
				recreationLink 		= json.recreation_Link,
				recreationPos 		= json.recreation_pos,
				recreationAddress 	= json.recreation_addr,
				recreationImgUrl 	= json.recreation_imageUrl,
				recreationRedu		= json.recreation_redu;

			recreationLink 	? recreationLink = recreationLink : recreationLink = "javascript:void(0)";
			recreationRedu	!= 0 ? recreationRedu  = "热度:" + recreationRedu : recreationRedu = '暂无数据';
			recreationScore != 0 ? recreationScore = recreationScore + '/5分' : recreationScore = '暂无评分';

			var recreationLi =	'<div class="recreation-img fl"><img src="' + recreationImgUrl + '" alt="'+ recreationName +'"></div>' + 
								'<div class="recreation-info fl">'+
									'<div class="nameAndType">'+
										'<a class="recreation-name" href="'+ recreationLink +'" m="查看详情">'+ recreationName +'</a>'+
									'</div>'+
									'<div class="address">' + recreationAddress + '</div>'+
									'<div class="route"><a href="javascript:void(0);" class="pos" data-pos="'+ recreationPos +'">查看地图</a></div>'+
								'</div>'+
								'<div class="priceAndScore fl">'+
									'<div class="score"><span>' + recreationScore +'</span></div>'+
									'<div class="redu"><span>'  + recreationRedu  +'</span></div>'+
								'</div>';

			var recreationRow = document.createElement('div');

			recreationRow.setAttribute('class', 'recreationRow clearfix');
			recreationRow.innerHTML = recreationLi;

			return recreationRow;
		}


		function getDataAndCreateLi( data, callback ){
			window.d = data;
			var to = './php/selectrecreation';
			var method = 'get';
			getAjax( method, to, data, callback );
		}

		function action( data ){
			var data = JSON.parse(data), 
				pageN = data.length/20 +1,
				page = pageNumByLength(pageN);
			//page
			$(recreationPage).append(page);
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
				$(recreationShow).append( createRecreationLi(data.data[i]) );

			startPos();						//重新加载pos按钮(含有pos类的)  点击选择条一次
		}

		function pageAClick(data){
			var data = JSON.parse(data);
			$(recreationShow).html('');
			for(var i = 0; i < data.data.length; i++) 
				$(recreationShow).append( createRecreationLi(data.data[i]) );
			
			startPos();						//重新加载pos按钮(含有pos类的)  点击分页按钮一次

			$(scrollElement).animate({"scrollTop":"0"},300);
			return false;
		}

		recreationShow.html('');
		recreationPage.html('');
		getDataAndCreateLi( {type: 0, page:1 }, action );

		recreationSelectbtn.click(function(event){

			var type = $(this).html();
			recreationType.html(type);

			recreationSelectbtn.removeClass('recreationActive');
			$(this).addClass('recreationActive');

			if( $(this).data('type') ){
				var type = $(this).data('type');
				var data = { type: type,page:1 };
			}else{
				var data = { type: 0, page:1 };
			}

			recreationShow.html('');
			recreationPage.html('');
			getDataAndCreateLi( data, action );
			return false;
		});
	};

	recreationSlice();

});