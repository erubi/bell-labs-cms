BellCMS.Models.Event = Backbone.Model.extend({
  urlRoot: 'api/events',

  validate: function(attrs, options){
    if (attrs.event_text.length < 1){
      return "Event must have event text.";
    }

    if (attrs.display_start_time_ms == ""){
      return "Event must have a display start time.";
    }

    if (attrs.event_end_time_ms == ""){
      return "Event must have an event end time.";
    }

    if (attrs.event_start_time_ms == ""){
      return "Event must have an event start time.";
    }

    if (attrs.countdown_hours < 0 ){
      return "Countdown must be positive number.";
    }

    if (attrs.event_start_time_ms >= attrs.end_time_ms){
      return "Event start date must be before event end date."
    }
  },

  convertIsoToMs: function(isoString){
    var time = moment(isoString);
    var offset = time.local().utcOffset();
    time.add(offset, 'minutes');
    var ms = time.valueOf();
    return parseInt(ms);
  },

  displayStartDate: function(){
    var ms = parseInt(this.get('display_start_time_ms'));
    return moment(ms);
  },

  eventEndDate: function(){
    var ms = parseInt(this.get('event_end_time_ms'));
    return moment(ms);
  },

  eventStartDate: function(){
    var ms = parseInt(this.get('event_start_time_ms'));
    return moment(ms);
  },

  countdownDate: function(){
    var ms = parseInt(this.get('count_down_ms'));
    return moment(ms);
  },

  displayStartISO: function(){
    var str = this.displayStartDate().toISOString();
    return str.substring(0, str.length - 1);
  },

  eventEndISO: function(){
    var str = this.eventEndDate().toISOString();
    return str.substring(0, str.length - 1);
  },

  eventStartISO: function(){
    var str = this.eventStartDate().toISOString();
    return str.substring(0, str.length - 1);
  },

  eventStartTime: function(){
    return this.eventStartDate().format('HH:mm');
  },

  eventEndTime: function(){
    return this.eventEndDate().format('HH:mm');
  },

  displayStartTime: function(){
    return this.displayStartDate().format('HH:mm');
  },

  isToday: function(){
    var today = moment();
    var start = this.eventStartDate();
    var end = this.eventEndDate();

    if (today.isBetween(start, end)){
      return true;
    } else if (today.isSame(start, 'day')){
      return true;
    } else if (today.isSame(end, 'day')){
      return true;
    }

    return false;
  },

  isThisWeek: function(){
    var currentWeek = moment().week();
    var startWeek = this.eventStartDate().week();
    var endWeek = this.eventEndDate().week();

    if (this.isToday()){
      return false;
    }

    if (startWeek == currentWeek){
      return true;
    } else if (endWeek == currentWeek){
      return true;
    } else if ((currentWeek > startWeek) && (currentWeek < endWeek)){
      return true;
    }

    return false;
  },

  isThisMonth: function(){
    var currentMonth = moment().month();
    var startMonth = this.eventStartDate().month();
    var endMonth = this.eventEndDate().month();

    if (this.isToday() || this.isThisWeek()){
      return false;
    }

    if (startMonth == currentMonth){
      return true;
    } else if (endMonth == currentMonth){
      return true;
    } else if ((currentMonth > startMonth) && (currentMonth < endMonth)){
      return true;
    }

    return false;
  }

});
