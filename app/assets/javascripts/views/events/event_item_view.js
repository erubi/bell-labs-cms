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
    'click .visible-event-btn' : 'updateVisibility'
  },

  modelEvents: {
    'destroy' : 'modelDestroyed',
    'invalid' : 'showError'
  },

  initialize: function(){
  },

  templateHelpers: function(){
    return {
      eventStartISO: this.model.eventStartISO(),
      eventStartTime: this.model.eventStartTime(),
      eventEndTime: this.model.eventEndTime()
    }
  },

  onShow: function(){
    this.initCal();
  },

  initCal: function(){
  },

  updateStartEndTimes: function(event){
    var cal = this.romeCal;

    var event_start = cal.getMoment().local();
    var event_end = event_start.clone();

    var start_time = moment(this.$el.find('.start-time-input').val(), 'h:m');
    event_start.hour(start_time.hour());
    event_start.minute(start_time.minute());

    var end_time = moment(this.$el.find('.end-time-input').val(), 'h:m');
    event_end.hour(end_time.hour());
    event_end.minute(end_time.minute());

    attr = {
      event_start_time_ms: event_start.valueOf(),
      event_end_time_ms: event_end.valueOf()
    };

    this.model.set(attr);
  },

  updateVisibility: function(event){
    event.preventDefault();
    $('.eye-icon').toggleClass('glyphicon-eye-open').toggleClass('glyphicon-eye-close');
    this.model.set('visible', !this.model.get('visible'));
    this.model.save();
  },

  updateCountdown: function(event){
    event.preventDefault();
    var hours = $(event.currentTarget).data('value');
    this.model.set('countdown_hours', hours);
    $('.countdown-text').text(hours + ' hours');
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
