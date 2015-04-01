BellCMS.Views.EventItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'event-view-li',
  template: 'events/event_item',

  events: {
    'change .end-time-input' : 'updateStartEndTimes',
    'change .start-time-input' : 'updateStartEndTimes',
    'click .delete-event-btn' : 'deleteEvent',
    'change input' : 'updateEvent',
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
    this.configRomeCal();
  },

  configRomeCal: function(){
    var romeEl = this.$el.find('.rome-cal-input')[0];
    this.begunSelecting = false;

    this.romeCal = rome(romeEl, {
      time: false
    });

    this.romeCal.on('data', this.handleRangeClick.bind(this));
    this.highlightRange();
  },

  handleRangeClick: function(event){
    var displayStartMs, eventStartMs, eventEndMs, attr;
    var cal = this.romeCal;

    if (!this.begunSelecting){
      $('.rd-day-body').removeClass('first-range-date middle-range-date last-range-date');
      // get cal moment, convert to ms, set on model
      // should set time to beginning of day
      this.begunSelecting = true;
      this.firstSelected = this.$el.find('.rd-day-selected');
      // this.firstSelectedVal = parseInt(this.firstSelected.text());
      this.firstSelected.addClass('first-range-date');
      attr = {display_start_time_ms: cal.getMoment().startOf('day').valueOf()};
    } else {
      // get cal moment, add start time, set on model
      // need to write function for graying out in between dates
      this.begunSelecting = false;
      this.updateStartEndTimes();
      this.secondSelected = this.$el.find('.rd-day-selected');
      // this.secondSelectedVal = parseInt(this.secondSelected.text());
      this.secondSelected.addClass('last-range-date');
      this.highlightRange();
    }

    this.model.save(attr);
  },

  highlightRange: function(){
    var that = this;
    var startDay = this.model.eventStartDate().date();
    var endDay = this.model.eventEndDate().date();

    var els = this.$el.find('.rd-day-body').filter(function(){
      var $date = $(this);
      var value = parseInt($date.text());
      var isDifMonth = $date.hasClass('rd-day-next-month');
      var inBtwn = (value > startDay) && (value < endDay);
      return !isDifMonth && inBtwn;
    });

    els.addClass('middle-range-date');
  },

  updateStartEndTimes: function(event){
    event.preventDefault();
    event.stopPropagation();

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
