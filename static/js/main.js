require.config({
	shim:{
		marionette:[ 'backbone' ],
		backbone:['jquery', 'underscore']
	},
	paths:{
		jquery: '../vendor/jquery.min',
		backbone: '../vendor/backbone',
		underscore: '../vendor/underscore',
		marionette: '../vendor/backbone.marionette.min',
	}

});

require(['app','router'],function(app, Router){
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  if (Backbone.history) {
    $(document).on("click","a", function(e) {
      var href = $(this).attr("href");
      if( href.charAt(0) !== '#' ) return;
      var protocol = this.protocol + "//";
      if (href.slice(protocol.length) !== protocol) {
        e.preventDefault();
        Backbone.history.navigate(href, {trigger:true});
      }
    });
  }

  app.vent.on('app:initialized', function( isAuthoirized ){
    app.isAuthoirized = isAuthoirized;
    new Router();
    Backbone.history.start( { pushState:true } );
  });


  app.start();
});
