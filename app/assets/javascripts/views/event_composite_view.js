BellCMS.Views.EventCompositeView = Marionette.CompositeView.extend({
  tagName: 'ul',
  className: 'event-view-ul',
  template: 'events/event_composite',
  childView: BellCMS.Views.EventItemView,

  viewOptions: ['type'],

  initialize: function(options){
    this.mergeOptions(options, this.viewOptions);
  },

  templateHelpers: function(){
    return { type: this.type }
  }
});
