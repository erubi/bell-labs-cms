BellCMS.Views.MediaItemView = Marionette.CompositeView.extend({

  template: 'media/item',

  initialize: function(){
  },

  events: {
  'click .delete-media-btn': 'destroyModel'
  },

  templateHelpers: function(){
    return {
      isImage: this.model.isImage(),
      isVideo: this.model.isVideo()
    }
  },

  destroyModel: function(event){
    event.preventDefault();
    this.model.destroy();
  }

});
