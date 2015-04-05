BellCMS.Models.MediaItem = Backbone.Model.extend({
  urlRoot: 'api/media_items',

  isVideo: function(){
    if (this.get('media_type') == 'video'){
      return true;
    }

    return false;
  },

  isImage: function(){
    if (this.get('media_type') == 'image'){
      return true;
    } else {
      console.log('false');
      return false;
    }
  },

  hasInFilename: function(str){
    if (this.get('filename').indexOf(str) != -1){
    }

    return this.get('filename').indexOf(str) != -1;
  }
});
