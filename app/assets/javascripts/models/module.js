BellCMS.Models.Module = Backbone.Model.extend({
  urlRoot: 'api/media_modules',

  validate: function(attrs, options){
    if (attrs.weight < 0){
      return "Weight must be a percentage greater than 0.";
    }

    // check if values add up to less than 1(100%)
    if(this.collection.weightSum() > 1){
      return "Sum of all weights must be less than 100%.";
    }
  },

  mediaItems: function(){
    this._mediaItems = this._mediaItems ||
      new BellCMS.Collections.MediaItems([], { module: this });

    return this._mediaItems;
  },

  videos: function(){
    return new Backbone.VirtualCollection(this.mediaItems(), {
      filter: function(mediaItem){
        return mediaItem.isVideo()
      }
    });
  },

  images: function(){
    var mediaItems = this.mediaItems();
    mediaItems.fullCollection =  new Backbone.VirtualCollection(this.mediaItems(), {
      filter: function(mediaItem){
        return mediaItem.isImage()
      }
    });

    return mediaItems;
  },

  parse: function(payload){
    if (payload.media_items){
      this.mediaItems().set(payload.media_items);
      delete payload.media_items;
    }

    return payload;
  }

});
