define(['photo'],function(Photo){
  return Backbone.Collection.extend({
    model: Photo,
    initialize: function(models,args){
      this.url = args.url;
      this.albumId = args.albumId;
    },
    parse: function(res){
      var url = this.url;
      res.entries.map(function(el){
        el._id = el.id;
        el.id = el.id.substr( el.id.lastIndexOf(':') + 1 );
        el.urlRoot = url.substring( 0 , url.length - 2 ) + '/';
      });
      return res.entries;
    }
  });

});
