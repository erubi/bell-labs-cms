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
    var subset = new Backbone.VirtualCollection(this, {
      filter: function (eventObj) {
        return eventObj.isToday();
      }
    });

    return subset;
  },

  weekSubset: function(){
    var subset = new Backbone.VirtualCollection(this, {
      filter: function (eventObj) {
        return eventObj.isThisWeek();
      }
    });

    return subset;
  },

  monthSubset: function(){
    var subset = new Backbone.VirtualCollection(this, {
      filter: function (eventObj) {
        return eventObj.isThisMonth();
      }
    });

    return subset;
  },

  allSubset: function(){
    var subset = new Backbone.VirtualCollection(this, {
      filter: function (eventObj) {
        return (!eventObj.isToday() && !eventObj.isThisWeek());
      }
    });

    return subset;
  }

});
