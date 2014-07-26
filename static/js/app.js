define([
	'utils',
	'album',
	'photo',
	'photos',
	'albums',
	'albumsView',
	'albumAddView',
	'photoAddView',
	'headerView',
	'photosView',
	'loginView',
	'fullPhotoView',
	],
	function( Utils, Album, Photo, Photos, Albums, AlbumsView, AlbumAddView, PhotoAddView, HeaderView, PhotosView, LoginView, FullPhotoView ){
	var app = new Backbone.Marionette.Application();

	app.addRegions({
		header: '#header',
		main: '#main',
		footer: '#footer'
	});

	var $loader = $('.loader');
	app.showLoader = function(){
	  $loader.show();
	};
	app.hideLoader = function(){
	  $loader.fadeOut();
	};

	var albums;
	app.urls = {};
	app.addInitializer( function(){
		$.ajax('/api/me/')
			.done( function(json) {
				app.urls.album = Utils.removeHost( json.collections['album-list'].href );
				app.urls.photo = Utils.removeHost( json.collections['photo-list'].href );
				app.urls.tag = Utils.removeHost( json.collections['tag-list'].href );
				albums = new Albums(null, { url: app.urls.album });
				app.vent.trigger('app:initialized', true);
			})
			.fail(function(){
				app.vent.trigger('app:initialized', false);
			});
	});

	app.vent.on('app:show:albums',function(){
		app.showLoader();
		app.header.show( new HeaderView() );
		app.main.show( new AlbumsView({ collection: albums }) );
		albums.fetch({ success: function(){
			app.hideLoader();
		}});
	});

	app.vent.on('app:add:album', function(){
		app.main.show( new AlbumAddView({ collection: albums }) );
		app.hideLoader();
	});

	app.vent.on('app:created:photo',function(albumId){
		Backbone.history.navigate("album/" + albumId,{trigger: true});
	});

	app.vent.on('app:destroy:photo', function(photoId){
		var url = app.urls.photo;
		var photo = new Photo({id: photoId, urlRoot: url.substring( 0 , url.length - 2 ) + '/' });
		photo.destroy({
			wait:true,
			success: function(){
				Backbone.history.navigate("albums", {trigger: true});
			}
		});
	});

	app.vent.on('app:created:album', function(){
		Backbone.history.navigate("albums",{ trigger: true});
	});

	app.vent.on('app:add:photo', function(albumId){
		app.main.show( new PhotoAddView({ albumId: albumId }) );
		app.hideLoader();
	});

	app.vent.on('app:login', function(){
		app.main.show( new LoginView() )
		app.hideLoader();
	});

	app.vent.on('app:show:photo',function(photoId){
		app.showLoader();
		app.header.show( new HeaderView() );
		var url = app.urls.photo;
		var photo = new Photo({id: photoId, urlRoot: url.substring( 0 , url.length - 2 ) + '/' });
		photo.fetch({ success: function(){
			app.main.show( new FullPhotoView({ model: photo }) );
			app.hideLoader();
		} });
	});

	app.vent.on('app:show:album',function(albumId){
		app.showLoader();
		app.header.show( new HeaderView() );
		var photosUrl = albums.url.substring( 0 , albums.url.length - 2 ) + '/' + albumId + '/photos/';
		$.ajax(photosUrl)
			.then(function(json){
				var photos = new Photos(null, { url: app.urls.photo, albumId: albumId });
				var photosArray = Photos.prototype.parse.call(photos, json);
				photos.add(photosArray)
				app.main.show( new PhotosView({ collection: photos }));
				app.hideLoader();
			});

	});

	return window.app = app;
})
