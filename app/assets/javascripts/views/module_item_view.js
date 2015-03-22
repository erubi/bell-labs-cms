BellCMS.Views.ModuleItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'module-view-li clearfix',
  template: 'exterior_modules/module_item',

  initialize: function(){
    this.listenTo(this.model, "invalid", this.showError);
    // this.listenTo(this.model, "sync", this.render);
  },

  onDomRefresh: function(){
    if ($('.weight-input').length){
      $('.weight-input').slider({
        ticks: [0, 25, 50, 75, 100],
        ticks_labels : ['0%', '25%', '', '', '100%'],
        handle: 'square'
      });
    }

    if($('.on-off-switch').length){
      $('.on-off-switch').bootstrapSwitch({
        state: BellCMS.Models.configModel.get('video_player_enabled')
      });
    }
  },

  events: {
    'slideStop .weight-input' : 'updateModelWeight',
    'switchChange.bootstrapSwitch .on-off-switch' : 'toggleVideoPlayer'
  },

  toggleVideoPlayer: function(event, state){
    var videoPlayerStatus = state;
    var configModel = BellCMS.Models.configModel;
    configModel.set('video_player_enabled', videoPlayerStatus);
    configModel.save();
  },

  updateModelWeight: function(event){
    var weight = event.value / 100;
    this.model.set('weight', weight);

    if (this.model.isValid()){
      this.removeError();
      this.model.save();
    }
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
