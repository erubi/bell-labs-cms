BellCMS.Views.MediaItemView = Marionette.CompositeView.extend({

  template: 'media/item',

  initialize: function(){
    var that = this;
    this.mediaChannel = Backbone.Radio.channel('mediaUpload');

    vex.defaultOptions.className = 'vex-theme-plain';

    this.mediaChannel.comply('updateMetadata' + that.model.id, function(id, data){
      if (that.model.id == id){
        that.model.save(data);
      } else {
        return;
      }
    });
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

    if(!BellCMS.Models.configModel.get('is_admin')){
      vex.defaultOptions.className = 'vex-theme-plain';
      vex.dialog.alert("Must be admin to update media");
    } else {
      vex.dialog.confirm({
        message: 'Are you sure you want to delete this media?',
        callback: function(val){
          that.destroyModel(val);
        }
      });
    }
  },

  destroyModel: function(confirm){
    if (confirm){
      this.model.destroy();
    }
  }

});
