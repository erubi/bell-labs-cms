BellCMS.Views.EventCompositeView = Marionette.CompositeView.extend({
  tagName: 'ul',
  className: 'event-view-ul',
  template: 'events/event_composite',

  viewOptions: ['type'],

  initialize: function(options){
    this.mergeOptions(options, this.viewOptions);
    this.childView = BellCMS.Views.EventItemView;
    this.listenTo(this.collection, 'change', this.render);
  },

  templateHelpers: function(){
    return {
      type: this.type
    }
  }
});
