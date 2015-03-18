BellCMS.Views.EventItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'event-view-li',
  template: 'events/event_item',

  templateHelpers: function(){
    return {
      startISO: this.model.startISO,
      endISO: this.model.endISO
    }
  }
});
