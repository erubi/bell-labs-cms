BellCMS.Models.Event = Backbone.Model.extend({
  urlRoot: 'api/events',

  validate: function(){

  },

  startDate: function(){
    var ms = parseInt(this.get('start_time_ms'));
    return moment(ms);
  },

  endDate: function(){
    var ms = parseInt(this.get('end_time_ms'));
    return moment(ms);
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
  }
});
