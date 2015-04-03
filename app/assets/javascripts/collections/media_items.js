BellCMS.Collections.MediaItems = Backbone.PageableCollection.extend({
  model: BellCMS.Models.MediaItem,
  url: 'api/media_items',

  mode: 'client',

  state: {
    pageSize: 10
  },

  byFilename: function(str){
   this.filter(function(mediaItem){
      mediaItem.hasInName(str);
   });
  },

  // onlyImages: function(){
  //   filtered = this.filter(function(m) {
  //     return m.isImage()
  //   });
  //   return new BellCMS.Collections.MediaItems(filtered);
  // },

  searchedSubset: function(str){
    return new Backbone.VirtualCollection(this, {
      filter: function(mediaItem){
        return mediaItem.hasInFilename(str);
      }
    });
  }


});
