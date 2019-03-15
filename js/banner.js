$(function(){
	//轮播图
	var bannerInterval = function(){
		var banner = $('.banner'), 
			bannerPort = $('.banner .banner-port'), 
			bannerPoint = $('.banner .banner-point li'), 
			prev = $('.banner .prev'), 
			next = $('.banner .next'), 
			len = bannerPoint.length, 
			i = 0, 
			bannerWidth = banner.width(), 
			left = bannerPort.position().left, 
			interval = null, 
			bannerFun = null;

		bannerFun = function(){
			++i;
			if( i == len  ) {
				speed = left - i * bannerWidth + 'px';
				bannerPort.animate( { left: speed }, 600);
				i = 0 ; 
				bannerPort.animate( { left: 0 }, 0 );
				bannerPoint.removeClass('active').eq(0).addClass('active');
				return;
			}
			if( i <= -1 ) i = len - 1; 
			speed = left - i * bannerWidth + 'px';
			bannerPort.animate( { left: speed }, 600 );
			bannerPoint.removeClass('active').eq(i).addClass('active');
		}
		interval = setInterval(bannerFun, 3000);

		banner.mouseover(function(event) {
			clearInterval(interval);
			interval = null;
		});
		banner.mouseout(function(event) {
			interval = setInterval(bannerFun, 3000);
		});
		bannerPoint.click(function(event) {
			 i = bannerPoint.index(this) - 1;
			 bannerFun();
		});
		prev.click(function(event){
			i-=2;
			bannerFun();
		});
		next.click( bannerFun );
		
	};
	bannerInterval();
});