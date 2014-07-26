define(['underscore'], function(){
	return {
		removeHost: function(url){
			return url.replace(/^.*\/\/[^\/]+/, '')
		},
		clearCookie: function( name ) {
		  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		},
		getCookie: function(c_name){
			var i,x,y,ARRcookies=document.cookie.split(";");

			for (i=0;i<ARRcookies.length;i++)
			{
					x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
					y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
					x=x.replace(/^\s+|\s+$/g,"");
					if (x==c_name)
					{
							return unescape(y);
					}
			 }
		}
	}
})
