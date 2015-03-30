BellCMS.Collections.MediaItems = Backbone.Collection.extend({
  model: BellCMS.Models.MediaItem,
  url: 'api/media_items',

  byFilename: function(str){
   this.filter(function(mediaItem){
      mediaItem.hasInName(str);
   });
  },

  searchedSubset: function(str){
    return new Backbone.VirtualCollection(this, {
      filter: function(mediaItem){
        return mediaItem.hasInFilename(str);
      }
    });
  }


});
