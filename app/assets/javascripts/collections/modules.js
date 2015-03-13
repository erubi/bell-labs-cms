BellCMS.Collections.Modules = Backbone.Collection.extend({
  model: BellCMS.Models.Module,

  url: 'api/media_modules',

  comparator: 'name',

  getOrFetch: function(id){
    var modules = this;

    var module;
    if (module = this.get(id)){
      module.fetch();
    } else {
      module = new BellCMS.Models.Module({id: id});
      module.fetch({
        success: function() { modules.add(item) }
      });
    }

    return module;
  },

  weightSum: function(){
    var weights = this.pluck('weight');
    var total = weights.reduce(function(a, b){
      return a + b;
    });

    return total;
  }
});
