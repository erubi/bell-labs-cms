BellCMS.Collections.Modules = Backbone.Collection.extend({
  model: BellCMS.Models.Module,

  url: 'api/media_modules',

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
  }
});
