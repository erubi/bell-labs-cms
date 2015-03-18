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
  },

  todayEvents: function(){
    return this.filter(function(eventObj){
      eventObj.isToday();
    });
  },

  weekEvents: function(){
    return this.filter(function(eventObj){
      return eventObj.isThisWeek();
    });
  },

  monthEvents: function(){
    return this.filter(function(eventObj){
      return eventObj.isThisMonth();
    });
  },

  todaySubset: function(){
    var events = this.todayEvents();
    var subset = new Backbone.Collection(events, {});

    return subset;
  },

  weekSubset: function(){
    var events = this.weekEvents();
    var subset = new Backbone.Collection(events, {});

    return subset;
  },

  monthSubset: function(){
    var events = this.monthEvents();
    var subset = new Backbone.Collection(events, {});

    return subset;
  }


});
