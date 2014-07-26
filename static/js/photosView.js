define(['photoView'], function(PhotoView){
  return Marionette.CompositeView.extend({
    childView: PhotoView,
    template: '#photos-view-tmpl',
    className:'columns fifteen',
    childViewContainer:'#photos-container',
    serializeData:function(){
      var json = {
        albumId: this.collection.albumId
      };
      return json;
    },
  });
});
