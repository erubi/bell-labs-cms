BellCMS.Views.TabletEventItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'tablet-event-view-li',
  template: 'tablet/event_item',

  initialize: function(){
  },

  templateHelpers: function(){
    return {
      eventStartDate: this.eventDate(),
      eventStartTime: this.eventStartTime(),
      eventEndTime: this.eventEndTime()
    };
  },

  eventDate: function(){
    return this.model.eventStartDate().format('M/DD/YY');
  },

  eventStartTime: function(){
    return this.model.eventStartDate().format('h:mm A');
  },

  eventEndTime: function(){
    return this.model.eventEndDate().format('h:mm A');
  }
});
