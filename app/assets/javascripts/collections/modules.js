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

  codeTypeSubset: function(){
    var subset = new Backbone.VirtualCollection(this, {
      filter: function(module){
        return (module.get('scene_type') == 'code');
      }
    });

    return subset;
  },

  weightSum: function(){
    var weights = this.pluck('weight');
    var total = weights.reduce(function(a, b){
      return a + b;
    });

    return total;
  },

  getInactive: function(activeId){
    return this.filter(function(module){
      return module.id != activeId;
    });
  },

  setRestInactive: function(activeId){
    var inactiveModels = this.getInactive(activeId);
    inactiveModels.forEach(function(model, index){
      model.set('active', false);
    });
  }

});
