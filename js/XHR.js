var XHR = (function(){
	var XMLHttp = function(){ return new XMLHttpRequest(); },
		ActiveHttp = function(){ return new ActiveXObject("Microsoft.XMLHTTP")};
	try{
		XMLHttp();
		XHR = XMLHttp;
	}catch(err){
		XHR = ActiveHttp;
	}
	return XHR;
})();

var getAjax = function( method,url,data,callback){
	var XML = XHR(),
	    method = method.toLowerCase();
	if(  method === 'get' ){
		url += '?';
		for( var name in data ){
			url += name + '=' + data[name] + '&';
		}
		url = url.replace(/\&*$/g,'');
		// console.log(url);
		XML.open( 'get', url );
		XML.send();
	}

	if( method === 'post' ){
		XML.open( 'post', url );
		XML.send( data );
	}

	XML.onreadystatechange = function(){
		if( XML.readyState == 4 ){
			if ( XML.status == 200 ){
				callback && callback(XML.responseText);
			}else{
				console.log( 'XML.status != 200');	
			}
		}
	}
}
