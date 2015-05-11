BellCMS.Views.EventDisplayFreqView= Marionette.ItemView.extend({
  className: '',
  template: 'events/display_freq',

  initialize: function(options){
    this.listenTo(this.model, 'change:event_freq', this.highlightFreq);
  },

  events: {
    'click .dropdown-menu li' : 'updateFrequency'
  },

  onShow: function(){
    this.highlightFreq();
  },

  updateFrequency: function(event){
    event.preventDefault();

    if(!BellCMS.Models.configModel.get('is_admin')){
      vex.defaultOptions.className = 'vex-theme-plain';
      vex.dialog.alert("Must be admin to update display frequency");
    } else {
      var freq = $(event.currentTarget).data('value');
      this.model.set('event_freq', freq);
      this.model.save();
    }
  },

  highlightFreq: function(){
    var eventFreq = BellCMS.Models.configModel.get('event_freq');

    $('li').removeClass('current-freq');
    $('li[data-value=' + eventFreq + ']').addClass('current-freq');
    $('.current-freq-stick').text(eventFreq + ' minutes');
  }

});
