BellCMS.Controllers.MediaController= {
  imageLibrary: function(){
    // var mediaLayout = BellCMS.Layouts.mediaLayout = BellCMS.Layouts.mediaLayout || new BellCMS.Layouts.MediaLayout();
    var mediaLayout = new BellCMS.Layouts.MediaLayout();
    BellCMS.rootView.showChildView('contentContainer', mediaLayout);

    mediaLayout.showImageView();
  },

  mediaLibrary: function(){
    var mediaLayout = new BellCMS.Layouts.MediaLayout();
    BellCMS.rootView.showChildView('contentContainer', mediaLayout);

  }
};
