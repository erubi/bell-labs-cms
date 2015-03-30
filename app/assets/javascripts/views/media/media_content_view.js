BellCMS.Views.MediaContentView = Marionette.CompositeView.extend({
  className: 'media-content-ctr',
  template: 'media/content',
  childViewContainer: '#media-item-views-ctr',

  initialize: function(options){
    this.contentType = options.contentType;
    this.childView = BellCMS.Views.MediaItemView;
  },

  onShow: function(){
  },

  modelEvents: {
    'sync' : 'updateView'
  },

  updateView: function(){
    this.render();
  }

});
