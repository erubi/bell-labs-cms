BellCMS.Views.MediaItemView = Marionette.CompositeView.extend({

  template: 'media/item',

  initialize: function(){
    this.mediaChannel = Backbone.Radio.channel('mediaUpload');
    vex.defaultOptions.className = 'vex-theme-plain';
  },

  events: {
  'click .delete-media-btn': 'destroyModelPrompt',
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

  destroyModelPrompt: function(event){
    event.preventDefault();
    event.stopPropagation();
    var that = this;

    vex.dialog.confirm({
      message: 'Are you sure you want to delete this media?',
      callback: function(val){
        that.destroyModel(val);
      }
    });
  },

  destroyModel: function(confirm){
    if (confirm){
      this.model.destroy();
    }
  }

});
