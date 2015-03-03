BellCMS.Collections.Events = Backbone.Collection.extend({
  model: BellCMS.Models.Event,

  url: 'api/events',


  getOrFetch: function(id){
    var events = this;

    var eventModel;
    if (eventModel = this.get(id)){
      eventModel.fetch();
    } else {
      eventModel = new BellCMS.Models.Event({id: id});
      eventModel.fetch({
        success: function() { events.add(eventModel) }
      });
    }

    return eventModel;
  }

});
