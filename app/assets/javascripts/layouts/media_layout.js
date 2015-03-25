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
  }

});
