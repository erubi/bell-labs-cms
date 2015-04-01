BellCMS.Views.EventNewView = Marionette.ItemView.extend({
  template: 'events/new',
  className: 'events-new-ctr',

  initialize: function(){
    this.model = new BellCMS.Models.Event();
    this.listenTo(this.model, "invalid", this.showError);
  },

  onShow: function(){
    this.initCal();
  },

  ui: {
    calendar: '#new-event-calendar'
  },

  events: {
    'click #save-new-event' : 'createEvent',
    'click .dropdown-menu li' : 'updateCountdown',
    'change #end-time-input' : 'updateStartEndTimes',
    'change #start-time-input' : 'updateStartEndTimes'
  },

  initCal: function(){
    var that = this;

    this.ui.calendar.pickmeup({
      flat: true,
      format  : 'Y-m-d',
      mode: 'range',
      change: that.updateStartEndDates.bind(that)
    });

  },

  updateStartEndDates: function(e, data){
    var display_start = moment(data[0]);
    var event_start = moment(data[1]);
    var event_end = event_start.clone();

    attr = {
      display_start_time_ms: display_start.valueOf(),
      event_start_time_ms: event_start.valueOf(),
      event_end_time_ms: event_end.valueOf()
    };

    this.model.set(attr);
  },


  updateStartEndTimes: function(e, data){
    var event_start = moment(this.model.eventStartDate());
    var event_end = event_start.clone();

    var start_time = moment(this.$el.find('#start-time-input').val(), 'h:m');
    event_start.hour(start_time.hour());
    event_start.minute(start_time.minute());

    var end_time = moment(this.$el.find('#end-time-input').val(), 'h:m');
    event_end.hour(end_time.hour());
    event_end.minute(end_time.minute());

    attr = {
      event_start_time_ms: event_start.valueOf(),
      event_end_time_ms: event_end.valueOf()
    };

    this.model.set(attr);
  },

  updateCountdown: function(event){
    event.preventDefault();
    var hours = $(event.currentTarget).data('value');
    this.model.set('countdown_hours', hours);
    $('#countdown-text').text(' ' + hours + ' hours');
  },

  createEvent: function(event){
    event.preventDefault();
    var that = this;

    var attrs = this.$el.find('form').serializeJSON();
    delete attrs['event-start-time'];
    delete attrs['event-end-time'];

    this.model.save(attrs, {
      success: function(){
          that.removeError();
          BellCMS.Collections.events.unshift(that.model);
          that.model = new BellCMS.Models.Event();
          that.render();
          that.initCal();
      }
    });
  },

  showError: function(event){
    var error = this.model.validationError;
    this.removeError();
    this.$el.prepend('<div class="alert alert-warning">'+error+'</div>');
  },

  removeError: function(){
    this.$el.find('.alert').remove();
  }


});
