BellCMS.Models.Event = Backbone.Model.extend({
  urlRoot: 'api/events',

  validate: function(attrs, options){
    if (attrs.name.length < 1){
      return "Event must have event text.";
    }

    if (attrs.start_time_ms == ""){
      return "Event must have a start time.";
    }

    if (attrs.end_time_ms == ""){
      return "Event must have an end time.";
    }

    if (attrs.countdown_hours < 0 ){
      return "Countdown must be positive number.";
    }
  },

  startDate: function(){
    var ms = parseInt(this.get('start_time_ms'));
    return moment(ms);
  },

  endDate: function(){
    var ms = parseInt(this.get('end_time_ms'));
    return moment(ms);
  },

  countdownDate: function(){
    var ms = parseInt(this.get('count_down_ms'));
    return moment(ms);
  },

  startISO: function(){
    var str = this.startDate().toISOString();
    return str.substring(0, str.length - 1);
  },

  endISO: function(){
    var str = this.endDate().toISOString();
    return str.substring(0, str.length - 1);
  },

  isToday: function(){
    var today = moment();
    var start = this.startDate();
    var end = this.endDate();

    if (today.isBetween(start, end)){
      return true;
    } else if (today.isSame(start)){
      return true;
    } else if (today.isSame(end)){
      return true;
    }

    return false;
  },

  isThisWeek: function(){
    var currentWeek = moment().week();
    var startWeek = this.startDate().week();
    var endWeek = this.endDate().week();

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
    var startMonth = this.startDate().month();
    var endMonth = this.endDate().month();

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
