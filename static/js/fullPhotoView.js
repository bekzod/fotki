define(['marionette'],function(){
  return Marionette.ItemView.extend({
    className:'full-photo-view',
    template: '#full-photo-view-tmpl',
    initialize: function(){
      this.model.set('currentSelectedSize','M');
    },
    ui:{
      image:'img'
    },
    events:{
      'click a.option-btn[data-image-size]': 'onImageSizeSelected',
      'click a.delete-btn': 'onImageDelete'
    },
    onImageDelete: function(){
      var r = confirm("Are you sure want to Delete Image " + this.model.get('title') );
      if (r) {
        app.vent.trigger('app:destroy:photo', this.model.id);
      }
    },
    onRender : function () {
      this.$('img').one('load', _.bind(this.onImageLoad, this));
    },
    onImageLoad:function(){
      this.ui.image.fadeIn();
    },
    onImageSizeSelected: function(e){
      var imgSize = $(e.target).data('image-size');
      this.model.set('currentSelectedSize',imgSize);
      this.render();
    }
  });
});
