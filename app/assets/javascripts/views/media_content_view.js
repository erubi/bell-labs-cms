BellCMS.Views.MediaContentView = Marionette.ItemView.extend({
  className: 'media-content-ctr',
  template: 'media/content',

  onShow: function(){
  },

  templateHelpers: function(){
    return {
      images: this.model.get('images')
    }
  }

});
