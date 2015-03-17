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
    this.showChildView('newEventContainer', new BellCMS.Views.EventNewView());

    this.showChildView('todayEventsContainer', new BellCMS.Views.EventCompositeView({
      // collection: BellCMS.Collections.events.todayEvents()
    }));

    // this.showChildView('weekEventsContainer', new BellCMS.Views.EventCompositeView({
    //   collection: BellCMS.Collections.events.weekEvents()
    // });

    // this.showChildView('monthEventsContainer', new BellCMS.Views.EventCompositeView({
    //   collection: BellCMS.Collections.events.montEvents()
    // });
    //
  }

});
