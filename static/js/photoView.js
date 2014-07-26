define(['marionette'],function(){
  return Marionette.ItemView.extend({
    template: '#photo-view-tmpl',
    className:'photo-view',
    ui:{
      'photoInfo':'.photo-info',
      'title':'.title'
    },
    events:{
      'mouseover':'onMouseover',
      'mouseout':'onMouseout'
    },
    onMouseover: function(){
      this.ui.photoInfo.stop(true).fadeIn();
      this.ui.title.stop(true).fadeOut();
    },
    onMouseout: function(){
      this.ui.photoInfo.stop(true).fadeOut();
      this.ui.title.stop(true).fadeIn();
    },
    onRender: function () {
      this.$('img').one('load', _.bind(this.onImageLoad, this));
    },
    onImageLoad: function(){
      this.$('img').fadeIn();
    },
    templateHelpers: {
      image: function(){
        return ( this.img && this.img.S ) || {} ;
      },
      getTags: function(){
        return _.keys(this.tags).join(', ');
      },
      getPublishedDate: function(){
        var publishedDate = new Date(this.published);
        return [
          publishedDate.getDate(),
          publishedDate.getMonth(),
          publishedDate.getFullYear(),
        ].join('-')
        return '';
      }
    }
  });
});
