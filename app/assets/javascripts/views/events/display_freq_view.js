BellCMS.Views.EventDisplayFreqView= Marionette.ItemView.extend({
  className: 'display-freq-ctr',
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
    BellCMS.Models.configModel.set('event_freq', freq);
    BellCMS.Models.configModel.save();
  },

  templateHelpers: function(){
    return {
    }
  },

  highlightFreq: function(){
    $('li').removeClass('current-freq');
    $('li[data-value=' + BellCMS.Models.configModel.get('event_freq') + ']').addClass('current-freq');
  }

});
