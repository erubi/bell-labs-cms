BellCMS.Views.MediaContentView = Marionette.ItemView.extend({
  className: 'media-content-ctr',
  template: 'media/content',

  initialize: function(options){
    this.contentType = options.contentType;
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
    if (this.contentType == 'image'){
      return {
        images: this.model.images(),
        videos: []
      };
    } else if (this.contentType == 'video'){
      return {
        videos: this.model.videos(),
        images: []
      };
    } else{
      return {
        images: this.model.images(),
        videos: this.model.videos()
      };
    }
  }

});
