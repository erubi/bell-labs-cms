BellCMS.Collections.MediaItems = Backbone.PageableCollection.extend({
  model: BellCMS.Models.MediaItem,
  url: 'api/media_items',

  mode: 'client',

  state: {
    pageSize: 20
  },

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
