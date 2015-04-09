BellCMS.Layouts.MediaLayout = Marionette.LayoutView.extend({
  id: 'media-layout-ctr',
  template: 'media/layout',

  initialize: function(){
    this.appNavChannel = Backbone.Radio.channel('appNavChannel');
  },

  regions: {
    mediaNavContainer : '#media-nav-ctr',
    mediaUploadContainer : '#media-upload-ctr',
    mediaContentContainer : '#media-content-ctr'
  },

  onBeforeShow: function(){
    var that = this;
    this.showChildView('mediaNavContainer', new BellCMS.Views.MediaNavView());
    this.appNavChannel.command('updateActiveNav', 'mediaGallery');
  }

});
