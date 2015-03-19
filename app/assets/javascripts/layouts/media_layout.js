BellCMS.Layouts.MediaLayout = Marionette.LayoutView.extend({
  id: 'media-layout-ctr',
  template: 'media/layout',

  regions: {
    mediaNavContainer : '#media-nav-ctr',
    mediaUploadContainer : '#media-upload-ctr',
    mediaContentContainer : '#media-content-ctr'
  },

  onBeforeShow: function(){
    var that = this;
    this.showChildView('mediaNavContainer', new BellCMS.Views.MediaNavView());
  },

  events: {
    'click #media-nav-image' : 'showImageView'
    // 'click #media-nav-video' : 'showVideoView'
  },

  showImageView: function(){
    this.showChildView('mediaUploadContainer', new BellCMS.Views.ImageUploadView());
    this.showChildView('mediaContentContainer', new BellCMS.Views.ImageContentView());
  }

});
