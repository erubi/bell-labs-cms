BellCMS.Controllers.MediaController= {
  imageLibrary: function(){
    this.setUpMediaViews('Media Library', 'image');
  },

  videoLibrary: function(){
    this.setUpMediaViews('Media Library', 'video');
  },

  videoPlayerMedia: function(){
    this.setUpMediaViews('Video Player');
  },

  bellHeroesMedia: function(){
    this.setUpMediaViews('Bell Labs Heroes');
  },

  setUpMediaViews: function(moduleName, contentType){
    BellCMS.Collections.modules.fetch({
      success: function(){
        var mediaLayout = BellCMS.Layouts.mediaLayout = BellCMS.Layouts.mediaLayout || new BellCMS.Layouts.MediaLayout();
        var module = BellCMS.Collections.modules.findWhere({name: moduleName});

        var uploadView = new BellCMS.Views.MediaUploadView({
          model: module
        });

        var contentView = new BellCMS.Views.MediaContentView({
          model: module,
          contentType: contentType
        });

        BellCMS.rootView.showChildView('contentContainer', mediaLayout);
        mediaLayout.showChildView('mediaUploadContainer', uploadView);
        mediaLayout.showChildView('mediaContentContainer', contentView);
      }
    });
  }
};
