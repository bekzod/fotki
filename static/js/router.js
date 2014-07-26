define(['utils', 'marionette'], function(Utils){
	return Marionette.AppRouter.extend({
		routes:{
			'login': 'showLogin',
			'albums': 'showAlbums',
			'album/:albumId': 'showAlbum',
			'add/album': 'addAlbum',
			'album/:albumId/add/photo': 'addPhoto',
			'photo/:photoId': 'showPhoto',
			'*notFound': 'notFound'
		},
		notFound: function(){
			if( !app.isAuthoirized ) return this.navigate("login", {trigger: true});;
			this.navigate("albums", {trigger: true});
		},
		showAlbums: function(){
			if( !app.isAuthoirized ) return this.navigate("login", {trigger: true});;
			window.app.vent.trigger('app:show:albums');
		},

		showAlbum: function( albumId ){
			if( !app.isAuthoirized ) return this.navigate("login", {trigger: true});;
			window.app.vent.trigger('app:show:album', albumId);
		},

		addAlbum: function( albumId ){
			if( !app.isAuthoirized ) return this.navigate("login", {trigger: true});;
			window.app.vent.trigger('app:add:album', albumId);
		},

		addPhoto: function(albumId){
			if( !app.isAuthoirized ) return this.navigate("login", {trigger: true});;
			window.app.vent.trigger('app:add:photo',albumId);
		},

		showPhoto: function( photoId ){
			if( !app.isAuthoirized ) return this.navigate("login", {trigger: true});;
			window.app.vent.trigger('app:show:photo',photoId);
		},

		showLogin: function(){
			if( app.isAuthoirized ) {
				this.navigate("albums", {trigger: true});
			} else {
				window.app.vent.trigger('app:login');
			}
		},

		showLogout: function(){
			window.app.vent.trigger('app:logout');
		}
	});
});
