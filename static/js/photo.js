define(['backbone'],function(){
  return Backbone.Model.extend({
    initialize: function(options){
      this.urlRoot = options.urlRoot;
    },
    url: function() {
      return this.urlRoot + this.id + '/'
    },
    parse: function(res){
      res._id = res.id;
      res.id = res.id.substr( res.id.lastIndexOf(':') + 1 );
      return res;
    }
  });
});
