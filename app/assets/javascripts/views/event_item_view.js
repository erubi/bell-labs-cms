BellCMS.Views.EventItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'event-view-li',
  template: 'events/event_item',

  templateHelpers: function(){
    return {
      startISO: this.model.startISO(),
      endISO: this.model.endISO()
    }
  },

  events: {
    'click .delete-event-btn' : 'deleteEvent'
  },

  modelEvents: {
    'destroy' : 'modelDestroyed'
  },

  modelDestroyed: function(){
    this.destroy();
  },

  deleteEvent: function(event){
    event.preventDefault();
    this.model.destroy();
  }
});
