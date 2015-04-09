BellCMS.Models.Module = Backbone.Model.extend({
  urlRoot: 'api/media_modules',

  validate: function(attrs, options){
    if(!BellCMS.Models.configModel.get('is_admin')){
      return "Must be admin to update modules";
    }

    // if(!BellCMS.Models.configModel.get('is_admin')){
    //   vex.defaultOptions.className = 'vex-theme-plain';
    //   vex.dialog.alert("Must be admin to update media");
    //   return;
    // }

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

  pageableMediaItems: function(){
    var mediaItems = this.mediaItems();

    return new Backbone.PageableCollection(mediaItems.models, {
      mode: 'client',
      state: {
        pageSize: 12
      }
    });
  },


  pageableVideoItems: function(){
    var filtered  =  new Backbone.VirtualCollection(this.mediaItems(), {
      filter: function(mediaItem){
        return mediaItem.isVideo()
      }
    });

    return new Backbone.PageableCollection(filtered.models, {
      mode: 'client',
      state: {
        pageSize: 12
      }
    });
  },

  pageableImageItems: function(){
    var filtered =  new Backbone.VirtualCollection(this.mediaItems(), {
      filter: function(mediaItem){
        return mediaItem.isImage()
      }
    });

    return new Backbone.PageableCollection(filtered.models, {
      mode: 'client',
      state: {
        pageSize: 12
      }
    });
  },

  parse: function(payload){
    if (payload.media_items){
      this.mediaItems().set(payload.media_items);
      delete payload.media_items;
    }

    return payload;
  }

});
