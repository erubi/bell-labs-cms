BellCMS.Collections.Modules = Backbone.Collection.extend({
  model: BellCMS.Models.Module,

  url: 'api/media_modules',

  getOrFetch: function(id){
    var items = this;

    var item;
    if (item = this.get(id)){
      item.fetch();
    } else {
      item = new Pinventory.Models.Item({id: id});
      item.fetch({
        success: function() { items.add(item) }
      });
    }

    return item;
  }
});
