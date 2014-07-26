define(['marionette'], function(){
	return Marionette.ItemView.extend({
		template:'#photo-add-view-tmpl',
		ui:{
			form: 'form'
		},
		events:{
			'submit': 'onSubmit'
		},
		initialize: function(opts){
			this.albumId = opts.albumId;
			_.bindAll(this,'onSuccessPhotoSubmit','onFailPhotoSubmit');
		},
		serializeData: function(){
			return { albumId: this.albumId }
		},
		onSuccessPhotoSubmit: function(){
			app.vent.trigger('app:created:photo', this.albumId);
		},
		onFailPhotoSubmit: function(){
		},
		onSubmit: function(){
			var formData = new FormData(this.ui.form[0]);
			$.ajax({
				url: app.urls.photo,
				type: "POST",
				data: formData,
				cache: false,
				contentType: false,
				processData: false
			}).then( this.onSuccessPhotoSubmit, this.onFailPhotoSubmit);

			window.app.showLoader();
			return false;
		}
	});
})
