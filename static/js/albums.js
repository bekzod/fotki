define(['album'],function(Album){
	return Backbone.Collection.extend({
    model: Album,
    initialize: function(models,args){
			this.url = args.url;
		},

    parse: function(res){
      var url = this.url;
      res.entries.map(function(el){
        el._id = el.id;
        el.id = el.id.substr( el.id.lastIndexOf(':') + 1 );
        el.urlRoot = url.substring( 0 , url.length - 2 ) + '/';
      });
      return res.entries;
    },

    sync: function( method, model, options){
      if(method == 'read'){
        if(options.filter){
          options.url =
            this.url +
            options.filter.order +
            ( options.filter.shift ? ';' + options.filter.shift : options.filter.shift ) +
            ( options.filter.shiftId ? ',' + options.filter.shiftId : options.filter.shiftId ) +
            '/';
        }
      }
     return Backbone.sync.call(this, method, model, options);
    }

	});

});
