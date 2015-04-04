BellCMS.Views.MediaItemView = Marionette.CompositeView.extend({

  template: 'media/item',

  initialize: function(){
    this.mediaChannel = Backbone.Radio.channel('mediaUpload');
  },

  events: {
  'click .delete-media-btn': 'destroyModel',
  'click .media-box': 'showMetadata'
  },

  showMetadata: function(){
    this.mediaChannel.command('showMetadata', this.model.id);
  },

  templateHelpers: function(){
    return {
      isImage: this.model.isImage(),
      isVideo: this.model.isVideo()
    }
  },

  destroyModel: function(event){
    event.preventDefault();
    event.stopPropagation();
    this.model.destroy();
  }

});
