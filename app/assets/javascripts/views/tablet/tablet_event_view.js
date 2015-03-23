BellCMS.Views.TabletEventItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'tablet-event-view-li',
  template: 'tablet/event_item',

  initialize: function(){
  },

  templateHelpers: function(){
    return {
      eventDate: this.eventDate()
    };
  },

  eventDate: function(){
    return this.model.startDate().format('M/D/YY');
  }
});
