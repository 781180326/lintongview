$(function(){
	var localSearch = window.location.search.slice(1);
	var searchId = localSearch.split('=')[1];
	var scenicBox = $('#scenic');
	var scenicHead = $(scenicBox).children('.scenicHead');
	var scenicContent = $(scenicBox).children('.scenicContent');

	var scenicHeadImg =  scenicHead.children('img');
	var scenicHeadPrie = $('#scenic .scenicHead .price');
	var scenicHeadAddress = $('#scenic .scenicHead .address');
	var scenicHeadTime = $('#scenic .scenicHead .openTime');
	var scenicContentIntro = $('#scenic .scenicContent .intro');
	var scenicContentImgBox = scenicContent.children('.scenicImg');

	var cover = $('#imgCover');
	var coverOffDiv = cover.children('.offDiv');
	var imgs;

	var xmlMethod = 'get';
	var xmlUrl = 'php/selectById.php';
	var xmlData = { id: searchId };

	getAjax( xmlMethod, xmlUrl, xmlData, getScenicById );

	function getScenicById( xml ){
		var xml = JSON.parse(xml);
		var scenicImgNum = xml.scenic_imgnum;
		var scenicName = xml.scenic_name;
		var scenicPrice = xml.scenic_price;
		var scenicAddress = xml.scenic_address;
		var scenicOpentime = xml.scenic_opentime;
		var scenicClosetime = xml.scenic_closetime;
		var scenicPos = xml.scenic_pos;
		var p = null;
		var scenicIntroRow = xml.scenic_intro.split("换行符");


		scenicContentIntro.html('<p style="color:green;font-size:18px;">'+scenicName+'</p>');
		for (var i = 0, len = scenicIntroRow.length; i < len; i++) {
			P = createEle('P');
			P.innerHTML = scenicIntroRow[i];
			scenicContentIntro.append(P);
		}
		scenicHeadImg.attr('src', 'img/'+scenicName + '/' + scenicName  + '1.jpg');
		scenicHeadImg.attr('alt', scenicName);
		scenicHeadPrie.html(scenicPrice);
		scenicHeadAddress.html(scenicAddress);
		scenicHeadTime.html(scenicOpentime + '-' + scenicClosetime + '<a class="pos" data-pos="'+ scenicPos +'">查看地图</a>');
		

		for(var i = 1; i <= scenicImgNum; ++i){
			var json = {
				src: 'img/' + scenicName + '/' + scenicName + i + '.jpg',
				alt: scenicName,
				class:'imgBorder'
			}
			var imgEle = createEle( 'img', json );
			scenicContentImgBox.append(imgEle);
		}

		imgs = scenicContentImgBox.children('img');
		imgs.click(function(event) {
			var json = {
				src: this.src,
				alt: scenicName
			}
			var imgEle = createEle( 'img', json );
			coverOffDiv.append(imgEle);
			cover.show();;
		});
		cover.click(function(event) {
			$(this).hide();;
			coverOffDiv.html('');
		});

	}

	function createEle( nodeName, json ){
		if( nodeName.toLowerCase == 'text' ){
			return document.createTextNode(json[text]);
		}else{
			var ele = document.createElement( nodeName );
			for(var attr in json){
				ele.setAttribute( attr, json[attr] );
			}
			return ele;
		}
	}
	
});