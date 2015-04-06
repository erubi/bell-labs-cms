BellCMS.Collections.MediaItems = Backbone.Collection.extend({
  model: BellCMS.Models.MediaItem,
  url: 'api/media_items',

  getOrFetch: function(id){
    var mediaItems = this;

    var mediaItem;
    if (mediaItem = this.get(id)){
      mediaItem.fetch();
    } else {
      mediaItem = new BellCMS.Models.MediaItem({id: id});
      mediaItem.fetch({
        success: function() { mediaItems.add(mediaItem) }
      });
    }

    return mediaItem;
  },

  byFilename: function(str){
   this.filter(function(mediaItem){
      mediaItem.hasInName(str);
   });
  }

});
