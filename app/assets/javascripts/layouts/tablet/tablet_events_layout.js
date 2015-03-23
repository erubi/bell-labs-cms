BellCMS.Layouts.TabletEventsLayout = Marionette.LayoutView.extend({
  id: 'tablet-events-ctr',
  template: 'tablet/events_layout',
  className: 'tablet-events-layout-ctr',

  regions: {
    todayEventsContainer : '#today-events-ctr',
    weekEventsContainer : '#week-events-ctr',
    monthEventsContainer : '#month-events-ctr'
  },

  events: {
  },

  templateHelper: function(){
    return {
    };
  },

  onBeforeShow: function(){
    var that = this;
    var events = BellCMS.Collections.events;

    events.fetch({
      success: function(){
        that.createChildViews();
      }
    })
  },

  createChildViews: function(){
    var events = BellCMS.Collections.events;

    this.showChildView('todayEventsContainer', new BellCMS.Views.TabletEventCompositeView({
      collection: events.todaySubset(),
      type: 'Today'
    }));

    this.showChildView('weekEventsContainer', new BellCMS.Views.TabletEventCompositeView({
      collection: events.weekSubset(),
      type: 'This Week'
    }));

    this.showChildView('monthEventsContainer', new BellCMS.Views.TabletEventCompositeView({
      collection: events.monthSubset(),
      type: 'This Month'
    }));
  }

});
