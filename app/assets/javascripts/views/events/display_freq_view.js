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
    var freq = $(event.currentTarget).data('value');
    this.model.set('event_freq', freq);
    this.model.save();
  },

  highlightFreq: function(){
    $('li').removeClass('current-freq');
    $('li[data-value=' + BellCMS.Models.configModel.get('event_freq') + ']').addClass('current-freq');
  }

});
