BellCMS.Views.ModuleCompositeView = Marionette.CompositeView.extend({
  tagName: 'ul',
  className: 'module-view-ul clearfix',
  template: 'exterior_modules/module_composite',

  initialize: function(){
    this.childView = BellCMS.Views.ModuleItemView;
    this.listenTo(BellCMS.Models.configModel, 'sync', this.handleConfigUpdate);
  },

  events: {
    'slideStop .time-input': 'updateCycleDuration',
    'click #module-randomize-btn': 'randomizeModuleWeights',
    'click #module-reset-btn': 'resetModuleWeights'
  },

  onAttach: function(){
    this.configSlider();
  },

  handleConfigUpdate: function(event){
    this.render();
  },

  onRender: function(){
    this.configSlider();
  },

  randomizeModuleWeights: function(event){
    event.preventDefault();
    BellCMS.Collections.modules.randomizeWeights();
  },

  resetModuleWeights: function(event){
    event.preventDefault();
    BellCMS.Collections.modules.resetWeights();
  },

  configSlider: function(max){
    var max = 60;

    if ($('.time-input').length){
      $('.time-input').slider({
        ticks: [5, max],
        min: 5,
        max: max,
        ticks_labels : ['5 MIN', max + ' MIN'],
        handle: 'custom'
      });
    }
  },

  updateCycleDuration: function(e){
    if(!BellCMS.Models.configModel.get('is_admin')){
      vex.defaultOptions.className = 'vex-theme-plain';
      vex.dialog.alert("Must be admin to update cycle duration");
    } else {
      var newDuration = e.value;
      this.model.set('cycle_duration', newDuration);
      this.model.save();
    }
  }
});
