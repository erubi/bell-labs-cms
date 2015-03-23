BellCMS.Views.TabletEventItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'tablet-event-view-li',
  template: 'tablet/event_item',

  initialize: function(){
  },

  templateHelpers: function(){
    return {
      startISO: this.model.startISO(),
      endISO: this.model.endISO(),
      eventISO: this.model.eventISO()
    }
  },
});
