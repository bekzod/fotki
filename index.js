var express = require('express');
var request = require('request');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();


app.use( express.static(__dirname + '/static') );
app.use( cookieParser( 'night night' ) );
app.use( session({secret:'good night'}) );

var YANDEX_FOTKI_APP_ID = '8320fe58bcfa45429153c2780037002a';
var YANDEX_FOTKI_APP_SECRET = '0255d42605574a1aa252c811c6e6ac53';

app.all('/api*', function(req,res){
  var oauth = req.session.access_token;
	if( !req.cookies.cid || !oauth ){
		req.session.destroy();
		return res.status(401).send('');
	}

	var requestParams = {
		url:'http://api-fotki.yandex.ru' + req.path,
		method: req.method,
		headers:{
			"accept": "application/json",
			"content-type": "application/json; charset=utf-8; type=entry",
			"authorization": "OAuth " + oauth
		}
	};

	for (var param in req.headers) {
		if( ['content-length', 'content-type'].indexOf(param.toLowerCase()) > -1 ){
		 if( !requestParams.headers[param] || req.headers[param].indexOf(requestParams.headers[param]) == -1 ){
				requestParams.headers[param] = req.headers[param];
			}
		}
	}
	req.pipe(request(requestParams)).pipe(res);
});

app.get('/oauth', function(req,res){
	request({
		url:' https://oauth.yandex.ru/token',
		method: 'POST',
		form: {
			code: req.query.code,
			grant_type: 'authorization_code',
			client_id: YANDEX_FOTKI_APP_ID,
			client_secret: YANDEX_FOTKI_APP_SECRET
		}
	}, function (e, r, body) {
		var params = JSON.parse(body);
		if( params.access_token && params.access_token.length === 32 ){
			req.session.access_token = params.access_token;
			res.cookie( 'cid', Math.random().toString(16).split('.')[1], {
			 expires: req.session.cookie.expires,
			 httpOnly: true
			});
		}
		res.redirect('/');
	});
});

app.get(/^\/(?!api|oauth|loginOauth)(.+)$/, function(req,res){
  res.redirect('/#' + req.path.substr(1));
});


app.get('/loginOauth', function(req,res){
	res.redirect(
		'https://oauth.yandex.ru/authorize?response_type=code&client_id=' + YANDEX_FOTKI_APP_ID
	);
});

app.listen( process.env.PORT || 9000 );
