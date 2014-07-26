define(['albumView'], function(AlbumView){
  return Marionette.CompositeView.extend({
    childView: AlbumView,
    className:'columns fifteen',
    template: '#albums-view-tmpl',
    childViewContainer:'#albums-container'
  });
});
