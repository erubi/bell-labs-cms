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
        var module = BellCMS.Collections.modules.findWhere({name: moduleName});
        var mediaItems;

        if (contentType && (contentType == "video")){
          mediaItems = module.videos();
        } else if (contentType && (contentType == "image")){
          mediaItems = module.images();
        } else{
          mediaItems = module.mediaItems();
        }

        mediaItems = mediaItems.getFirstPage();

        var mediaLayout = BellCMS.Layouts.mediaLayout = BellCMS.Layouts.mediaLayout || new BellCMS.Layouts.MediaLayout();

        var uploadView = new BellCMS.Views.MediaUploadView({
          model: module
        });

        var contentView = new BellCMS.Views.MediaContentView({
          model: module,
          collection: mediaItems
        });

        BellCMS.rootView.showChildView('contentContainer', mediaLayout);
        mediaLayout.showChildView('mediaUploadContainer', uploadView);
        mediaLayout.showChildView('mediaContentContainer', contentView);
      }
    });
  }
};
