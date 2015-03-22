BellCMS.Views.ModuleCompositeView = Marionette.CompositeView.extend({
  tagName: 'ul',
  className: 'module-view-ul clearfix',
  template: 'exterior_modules/module_composite',
  initialize: function(){
    this.childView = BellCMS.Views.ModuleItemView;
  },

  events: {
    'slideStop .time-input': 'updateCycleDuration'
  },

  onAttach: function(){
    this.configSlider();
  },

  configSlider: function(){
    var max;

    if (this.model.get('video_player_enabled')){
      max = (60 - this.model.get('video_player_duration'));
    } else {
      max = 60;
    }
    if ($('.time-input').length){
      $('.time-input').slider({
        ticks: [5, max],
        min: 5,
        max: max,
        ticks_labels : ['5 MIN', max + ' MIN'],
        handle: 'square'
      });
    }
  },

  updateCycleDuration: function(e){
    var newDuration = e.value;
    this.model.set('cycle_duration', newDuration);
    this.model.save();
  }
});
