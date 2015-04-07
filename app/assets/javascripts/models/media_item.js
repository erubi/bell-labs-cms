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
      return false;
    }
  },

  hasInFilename: function(str){
    var lower = str.toLowerCase();

    if (this.get('filename').indexOf(str) != -1){
      return true;
    } else if (this.get('filename').indexOf(lower) != -1){
      return true;
    } else {
      return false;
    }
  },

  hasInMetadata: function(str){
    var bellLabsPeople = this.get('bell_labs_people') || '';
    var topLevelCategory = this.get('top_level_category') || '';
    var keywords = this.get('keywords') || '';
    var additional = this.get('additional_metadata') || '';
    var description= this.get('description') || '';

    var lower = str.toLowerCase();

    if (bellLabsPeople.indexOf(str) != -1 ||
        topLevelCategory.indexOf(str) != -1 ||
        keywords.indexOf(str) != -1 ||
        additional.indexOf(str) != -1 ||
        description.indexOf(str) != -1) {
          return true;
    } else if (bellLabsPeople.indexOf(lower) != -1 ||
        topLevelCategory.indexOf(lower) != -1 ||
        keywords.indexOf(str) != -1 ||
        additional.indexOf(lower) != -1 ||
        description.indexOf(lower) != -1) {
          return true;
    } else {
      return false;
    }
  }
});
