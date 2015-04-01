BellCMS.Views.TabletEventItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'tablet-event-view-li',
  template: 'tablet/event_item',

  initialize: function(){
  },

  templateHelpers: function(){
    return {
      eventStartDate: this.eventDate()
    };
  },

  eventDate: function(){
    return this.model.eventStartDate().format('M/D/YY');
  }
});
