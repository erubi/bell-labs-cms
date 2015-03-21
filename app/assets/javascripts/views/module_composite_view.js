BellCMS.Views.ModuleCompositeView = Marionette.CompositeView.extend({
  tagName: 'ul',
  className: 'module-view-ul',
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
    if ($('.time-input').length){
      $('.time-input').slider({
        ticks: [5, 60],
        min: 5,
        max: 60,
        ticks_labels : ['5 MIN', '60 MIN'],
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
