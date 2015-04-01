BellCMS.Views.EventNewView = Marionette.ItemView.extend({
  template: 'events/new',
  className: 'events-new-ctr',

  initialize: function(){
    this.model = new BellCMS.Models.Event();
    this.listenTo(this.model, "invalid", this.showError);
  },

  onShow: function(){
    this.configRomeCal();
  },

  events: {
    'click #save-new-event' : 'createEvent',
    'click .dropdown-menu li' : 'updateCountdown',
    'change #end-time-input' : 'updateStartEndTimes',
    'change #start-time-input' : 'updateStartEndTimes'
  },

  configRomeCal: function(){
    var romeEl = this.$el.find('#event-rome-1')[0];
    this.begunSelecting = false;

    this.romeCal = rome(romeEl, {
      time: false
    });

    this.romeCal.on('data', this.handleRangeClick.bind(this));
  },

  handleRangeClick: function(event){
    var displayStartMs, eventStartMs, eventEndMs, attr;
    var cal = this.romeCal;

    if (!this.begunSelecting){
      $('.rd-day-body').removeClass('first-range-date middle-range-date last-range-date');
      // get cal moment, convert to ms, set on model
      // should set time to beginning of day
      this.begunSelecting = true;
      this.firstSelected = $('.rd-day-selected');
      this.firstSelectedVal = parseInt(this.firstSelected.text());
      this.firstSelected.addClass('first-range-date');
      attr = {display_start_time_ms: cal.getMoment().startOf('day').valueOf()};
    } else {
      // get cal moment, add start time, set on model
      // need to write function for graying out in between dates
      this.begunSelecting = false;
      this.updateStartEndTimes();
      this.secondSelected = $('.rd-day-selected');
      this.secondSelectedVal = parseInt(this.secondSelected.text());
      this.secondSelected.addClass('last-range-date');
      this.highlightRange();
    }

    this.model.set(attr);
  },

  highlightRange: function(){
    var that = this;

    var els = $('.rd-day-body').filter(function(){
      var $date = $(this);
      var value = parseInt($date.text());
      var isDifMonth = $date.hasClass('rd-day-next-month');
      var inBtwn = (value > that.firstSelectedVal) && (value < that.secondSelectedVal);
      return !isDifMonth && inBtwn;
    });

    els.addClass('middle-range-date');
  },

  updateStartEndTimes: function(event){
    var cal = this.romeCal;

    var event_start = cal.getMoment().local();
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
          that.configRomeCal();
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
