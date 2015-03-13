BellCMS.Models.Module = Backbone.Model.extend({
  urlRoot: 'api/media_modules',

  validate: function(attrs, options){
    if (attrs.weight < 0){
      return "Weight must be a percentage greater than 0."
    }

    // check if values add up to less than 1(100%)
    if(this.collection.weightSum() > 1){
      return "Sum of all weights must be less than 100%.";
    }
  }
});
