var quanju = {};
	quanju.opendown = true;
var posMap = function(){
	if($('#BMap')) $('#BMap').html('').remove();
	var BMapDiv = $("<div id='BMap'></div>");
	var map = $("<div id='map'></div>");
	BMapDiv.css({
		width: '400px',
		height: '0',
		position: 'fixed',
		display: 'none',
		top: '10px',
		left: '50%'
	});
	map.css({ 
		width: '100%', 
		height: '100%' 
	});
	BMapDiv.append(map);
	$('body').append(BMapDiv);

	//地图
   	var map = new BMap.Map("map");
   	map.enableScrollWheelZoom(true); 

	//获取data-pos数据
	$('.pos').click(function(event){
		if($(this).data('pos')){
			map.clearOverlays();
			var pos = $(this).data('pos').replace(/ */g,'');
			var pos_x = parseFloat(pos.split(',')[0]);
			var pos_y = parseFloat(pos.split(',')[1]);
			var point = new BMap.Point(pos_x,pos_y);
			var marker = new BMap.Marker(point);
			map.addOverlay(marker);
			BMapDiv.css('display', 'block');
			BMapDiv.animate({ 'height': '400px' }, 600, function(){ 
				marker.setAnimation(BMAP_ANIMATION_BOUNCE);
				map.centerAndZoom(point, 15);
			});
		}else{
			if(quanju.opendown){
				quanju.opendown = false;
				window.confirm("抱歉，暂无数据");
				setTimeout(function(){
					quanju.opendown = true;
				},500);
			}
		}
		event.stopPropagation();
		return false;
	});

	
	$(BMapDiv).click(function(event){
		event.stopPropagation();
		return false;
	});
	$(document).click(function(){ BMapDiv.animate({ 'height': 0 }, 600, function(){
		BMapDiv.css('display', 'none');
	});});
};

function startPos(){
	function tim(){
		var i = $('.pos').length;
		if( i == 0 ){
			timer = setTimeout( tim, 1000 );
		}else{
			clearTimeout(timer);
			posMap();
		}
	}
	var timer = setTimeout(tim,1000);
}


$(function(){
	startPos();
});