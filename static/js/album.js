define(['backbone'],function(){
  return Backbone.Model.extend({
    initialize: function(options){
      this.urlRoot = options.urlRoot;
    },

    //adding trailing slash as yandex api is too strict
    url: function() {
      return this.urlRoot + this.id + '/';
    },

    sync: function( method, model, options ){
      if( 'create' == method ){
        options.url = this.collection.url;
      }

      Backbone.sync.call(this, method, model, options);
    }
  });
});
