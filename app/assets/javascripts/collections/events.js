BellCMS.Collections.Events = Backbone.Collection.extend({
  model: BellCMS.Models.Event,

  url: 'api/events',


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
