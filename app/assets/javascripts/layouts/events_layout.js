BellCMS.Layouts.EventsLayout = Marionette.LayoutView.extend({
  id: 'events-ctr',
  template: 'events/layout',

  regions: {
    newEventContainer : '#new-event-ctr',
    todayEventsContainer : '#today-events-ctr',
    weekEventsContainer : '#week-events-ctr',
    monthEventsContainer : '#month-events-ctr'
  },

  onBeforeShow: function(){
    var eventSubset = Backbone.Subset.extend({});
    var todayEvents = new eventSubset(BellCMS.Collections.events.todayEvents(), { parentCollection: BellCMS.Collections.events });
    var weekEvents = new eventSubset(BellCMS.Collections.events.weekEvents(), { parentCollection: BellCMS.Collections.events });
    var monthEvents = new eventSubset(BellCMS.Collections.events.monthEvents(), { parentCollection: BellCMS.Collections.events });

    this.showChildView('newEventContainer', new BellCMS.Views.EventNewView());

    this.showChildView('todayEventsContainer', new BellCMS.Views.EventCompositeView({
      // collection: BellCMS.Collections.events.todayEvents(),
      collection: todayEvents,
      type: 'Today'
    }));

    this.showChildView('weekEventsContainer', new BellCMS.Views.EventCompositeView({
      // collection: BellCMS.Collections.events.weekEvents()
      collection: weekEvents,
      type: 'This Week'
    }));

    this.showChildView('monthEventsContainer', new BellCMS.Views.EventCompositeView({
      collection: BellCMS.Collections.events,
      type: 'All'
    }));
  }

});
