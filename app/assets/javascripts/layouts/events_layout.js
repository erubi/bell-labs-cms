BellCMS.Layouts.EventsLayout = Marionette.LayoutView.extend({
  id: 'events-ctr',
  template: 'events/layout',
  className: 'events-layout-ctr',

  regions: {
    newEventContainer : '#new-event-ctr',
    todayEventsContainer : '#today-events-ctr',
    weekEventsContainer : '#week-events-ctr',
    monthEventsContainer : '#month-events-ctr',
    displayFreqContainer: '#display-freq-ctr'
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

    this.showChildView('displayFreqContainer', new BellCMS.Views.EventDisplayFreqView({
      model: BellCMS.Models.configModel
    }));

    this.showChildView('newEventContainer', new BellCMS.Views.EventNewView());

    this.showChildView('todayEventsContainer', new BellCMS.Views.EventCompositeView({
      collection: events.todaySubset(),
      type: 'Today'
    }));

    this.showChildView('weekEventsContainer', new BellCMS.Views.EventCompositeView({
      collection: events.weekSubset(),
      type: 'This Week'
    }));

    this.showChildView('monthEventsContainer', new BellCMS.Views.EventCompositeView({
      collection: events.monthSubset(),
      type: 'This Month'
    }));
  }

});
