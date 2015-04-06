BellCMS.Views.EventItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'event-view-li',
  template: 'events/event_item',

  events: {
    'change .end-time-input' : 'updateStartEndTimes',
    'change .start-time-input' : 'updateStartEndTimes',
    'click .delete-event-btn' : 'deleteEvent',
    'change input[type="text"]' : 'updateEvent',
    'click .dropdown-menu li' : 'updateCountdown',
    'click .eye-icon' : 'updateVisibility'
  },

  modelEvents: {
    'destroy' : 'modelDestroyed',
    'invalid' : 'showError'
  },

  ui: {
    calendar: '.event-calendar',
    startTimeInput: '.start-time-input',
    endTimeInput: '.end-time-input'
  },

  templateHelpers: function(){
    return {
      eventStartISO: this.model.eventStartISO(),
      eventStartTime: this.model.eventStartTime(),
      eventEndTime: this.model.eventEndTime(),
      eventStartInfo: this.eventStartInfo()
    }
  },

  eventStartInfo: function(){
    return this.model.eventStartDate().format('MM/DD/YY');
  },

  onShow: function(){
    // this.initCal();
  },

  initCal: function(){
    var that = this;

    this.ui.calendar.pickmeup({
      format  : 'Y-m-d',
      mode: 'range',
      date: [
        that.model.displayStartDate().toDate(),
        that.model.eventStartDate().toDate()
      ],
      hide: that.updateStartEndDates.bind(that)
    });
  },

  updateStartEndDates: function(){
    var data = this.ui.calendar.pickmeup('get_date', false);

    var display_start = moment(data[0]);
    var event_start = moment(data[1]);
    var event_end = event_start.clone();

    attr = {
      display_start_time_ms: display_start.valueOf(),
      event_start_time_ms: event_start.valueOf(),
      event_end_time_ms: event_end.valueOf()
    };

    this.model.save(attr);
  },


  updateStartEndTimes: function(e, data){
    var event_start = moment(this.model.eventStartDate());
    var event_end = event_start.clone();

    var start_time = moment(this.ui.startTimeInput.val(), 'h:m');
    event_start.hour(start_time.hour());
    event_start.minute(start_time.minute());

    var end_time = moment(this.ui.endTimeInput.val(), 'h:m');
    event_end.hour(end_time.hour());
    event_end.minute(end_time.minute());

    attr = {
      event_start_time_ms: event_start.valueOf(),
      event_end_time_ms: event_end.valueOf()
    };

    this.model.save(attr);
  },

  updateVisibility: function(event){
    event.preventDefault();
    this.$el.find('.eye-icon').toggleClass('glyphicon-eye-open').toggleClass('glyphicon-eye-close');
    this.model.set('visible', !this.model.get('visible'));
    this.model.save();
  },

  updateCountdown: function(event){
    event.preventDefault();
    var hours = $(event.currentTarget).data('value');
    this.model.set('countdown_hours', hours);
    this.$el.find('.countdown-text').text(hours + ' hrs');
    this.model.save();
  },

  modelDestroyed: function(){
    this.destroy();
  },

  deleteEvent: function(event){
    event.preventDefault();
    this.model.destroy();
  },

  updateEvent: function(event){
    event.preventDefault();
    var that = this;

    var attrs = this.$el.find('form').serializeJSON();
    this.model.set(attrs);

    if (this.model.isValid()){
      this.removeError();
      this.model.save();
    }
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
