$(function(){
	//nav
	var navAnimate = function(){
		var navLiA =  $('#nav>li>a'),
			navUlList = null,
			lenUlList = 0;
		
		navLiA.mouseover(function(event){
			navUlList = $(this).nextAll('.subnav').children('ul').children('li');
			lenUlList = navUlList.length;
			for(var i = 0; i < lenUlList; i++){
				navUlList.eq(i).css({marginLeft: i*20 + 'px'}).animate({marginLeft:0}, i*80);
			}
		});
	
	}
	navAnimate();

	//景区舒适度轮播
	var jqssdNav = function(){
		var nav = $('.jq-ssd ul'),
			top = nav.position().top,
			navList = nav.children('li'),
			len = navList.length,
			height = navList.height(),
			i = 0,
			speed = 0,
			interval = null,
			NavUp = null;

		NavUp = function(){
			++i;
			if( i >= len  ) i = 0; 
			speed = top - i * height + 'px';
			nav.animate( { top: speed },200 );
			setTimeout(NavUp, 3000)
		}
		interval = setTimeout(NavUp, 3000);
	}
	jqssdNav();

	//天气查询
	var jqCity = $(".jq-city");
	var data ={
        'key': "b51c345b5971414fbaaa05df108ef55f",
        'info': "天气",
        'loc':"西安市临潼区",
        'userid': "17629237656"
	};

	$.ajax({ 
      url: 'http://www.tuling123.com/openapi/api', 
      type: 'post', 
      data: data,
      scriptCharset: 'utf-8',  
      success:function(data){
      	var text = data.text;
      	text= text.slice(text.indexOf(':')+1);
      	text= text.replace(/最高气温|最低气温/g,'').replace(/度/g,'').replace(/，/,'~') + '度 &nbsp; &nbsp;  临潼区';
      	jqCity.html(text);
      },
      error:function(){
      	jqCity.html('获取失败');
      }
    });
});