BellCMS.Collections.MediaItems = Backbone.PageableCollection.extend({
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

  mode: 'client',

  state: {
    pageSize: 12
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
