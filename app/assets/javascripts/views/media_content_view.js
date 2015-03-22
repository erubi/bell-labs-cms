BellCMS.Views.MediaContentView = Marionette.ItemView.extend({
  className: 'media-content-ctr',
  template: 'media/content',

  initalize: function(){

  },

  onShow: function(){
  },

  modelEvents: {
    'sync' : 'updateView'
  },

  updateView: function(){
    this.render();
  },

  templateHelpers: function(){
    return {
      images: this.model.get('images'),
      videos: this.model.get('videos')
    }
  }

});
