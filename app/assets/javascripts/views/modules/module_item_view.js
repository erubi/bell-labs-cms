BellCMS.Views.ModuleItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'module-view-li clearfix',
  template: 'exterior_modules/module_item',

  initialize: function(){
    this.listenTo(this.model, "invalid", this.showError);
    this.listenTo(this.model, "change:weight", this.render);
  },

  onDomRefresh: function(){
    if ($('.weight-input').length){
      $('.weight-input').slider({
        ticks: [0, 100],
        ticks_labels : ['0%', '100%'],
        handle: 'custom',
        formatter: function(value){
          return (value + '%');
        }
      });
    }
  },

  templateHelpers: function(){
    return {
      videoPlayerOn: BellCMS.Models.configModel.get('video_player_enabled')
    }
  },

  events: {
    'slideStop .weight-input' : 'updateModelWeight',
    'click .video-player-on' : 'toggleVideoPlayer',
    'click .video-player-off' : 'toggleVideoPlayer'
  },

  toggleVideoPlayer: function(event){
    event.preventDefault()
    var configModel = BellCMS.Models.configModel;
    var state = !configModel.get('video_player_enabled');

    configModel.set('video_player_enabled', state);
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
