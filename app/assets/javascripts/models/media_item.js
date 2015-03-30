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
    }

    return false;
  }
});
