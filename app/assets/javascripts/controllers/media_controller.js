BellCMS.Controllers.MediaController= {
  media: function(){
    // var mediaLayout = BellCMS.Layouts.mediaLayout = BellCMS.Layouts.mediaLayout || new BellCMS.Layouts.MediaLayout();
    var mediaLayout = BellCMS.Layouts.mediaLayout = new BellCMS.Layouts.MediaLayout();
    BellCMS.rootView.showChildView('contentContainer', mediaLayout);
    this.setUpMediaViews('Media Library', 'video');
  },

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

  setUpMediaViews: function(moduleName, mediaType){
    BellCMS.Collections.modules.fetch({
      success: function(){

        var module = BellCMS.Collections.modules.findWhere({name: moduleName});
        var mediaItems;

        module.fetch({
          success: function(){
            if (mediaType == 'image'){
              mediaItems = module.pageableImageItems();
            } else if (mediaType == 'video'){
              mediaItems = module.pageableVideoItems();
            } else {
              mediaItems = module.pageableMediaItems();
            }

            var mediaLayout = BellCMS.Layouts.mediaLayout = BellCMS.Layouts.mediaLayout || new BellCMS.Layouts.MediaLayout();

            var uploadView = new BellCMS.Views.MediaUploadView({
              model: module,
              mediaType: mediaType
            });

            var contentView = new BellCMS.Views.MediaContentView({
              model: module,
              collection: mediaItems,
              mediaType: mediaType
            });

            BellCMS.rootView.showChildView('contentContainer', mediaLayout);
            mediaLayout.showChildView('mediaUploadContainer', uploadView);
            mediaLayout.showChildView('mediaContentContainer', contentView);

          }
        });
      }
    });
  }
};
