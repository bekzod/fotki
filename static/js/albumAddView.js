define(['marionette'], function(){
	return Marionette.ItemView.extend({
		template:'#album-add-view-tmpl',
		ui:{
			form: 'form'
		},
		events:{
			'submit': 'onSubmit'
		},
		onSubmit: function(){
			var params = _.object(_.map(this.ui.form.serializeArray(), function(x){return [x.name, x.value]}));
			window.app.showLoader();
			this.collection.create(params, { wait: true, success: this.onModelSave });
			return false;
		},
		onModelSave: function(){
			app.vent.trigger('app:created:album');
		}
	});
})
