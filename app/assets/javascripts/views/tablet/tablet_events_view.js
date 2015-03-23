BellCMS.Views.TabletEventCompositeView = Marionette.CompositeView.extend({
  tagName: 'ul',
  className: 'event-view-ul',
  template: 'tablet/event_composite',

  viewOptions: ['type'],

  initialize: function(options){
    this.mergeOptions(options, this.viewOptions);
    this.childView = BellCMS.Views.TabletEventItemView;
  },

  templateHelpers: function(){
    return {
      type: this.type
    }
  }
});
