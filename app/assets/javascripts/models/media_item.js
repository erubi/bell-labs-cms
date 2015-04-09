BellCMS.Models.MediaItem = Backbone.Model.extend({
  urlRoot: 'api/media_items',

  validate: function(attr, options){
    if(!BellCMS.Models.configModel.get('is_admin')){
      vex.defaultOptions.className = 'vex-theme-plain';
      vex.dialog.alert("Must be admin to update media");
    }
  },

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

    if (bellLabsPeople.toLowerCase().indexOf(lower) != -1 ||
        topLevelCategory.toLowerCase().indexOf(lower) != -1 ||
        keywords.toLowerCase().indexOf(lower) != -1 ||
        additional.toLowerCase().indexOf(lower) != -1 ||
        description.toLowerCase().indexOf(lower) != -1) {
      return true;
    } else {
      return false;
    }
  }
});
