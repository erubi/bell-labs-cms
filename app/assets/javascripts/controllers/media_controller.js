BellCMS.Controllers.MediaController= {
  imageLibrary: function(){
    // var mediaLayout = BellCMS.Layouts.mediaLayout = BellCMS.Layouts.mediaLayout || new BellCMS.Layouts.MediaLayout();
    var mediaLayout = new BellCMS.Layouts.MediaLayout();
    BellCMS.rootView.showChildView('contentContainer', mediaLayout);
  },

  mediaLibrary: function(){
    var mediaLayout = new BellCMS.Layouts.MediaLayout();
    BellCMS.rootView.showChildView('contentContainer', mediaLayout);
  },

  videoPlayerMedia: function(){
    BellCMS.Collections.modules.fetch({
      success: function(){
        var mediaLayout = new BellCMS.Layouts.MediaLayout();
        var videoPlayerModule = BellCMS.Collections.modules.findWhere({name: 'Video Player'});

        var videoPlayerUploadView = new BellCMS.Views.MediaUploadView({
          model: videoPlayerModule
        });

        var videoPlayerContentView = new BellCMS.Views.MediaContentView({
          model: videoPlayerModule
        });

        BellCMS.rootView.showChildView('contentContainer', mediaLayout);
        mediaLayout.showChildView('mediaUploadContainer', videoPlayerUploadView);
        mediaLayout.showChildView('mediaContentContainer', videoPlayerContentView);
      }
    })

  },

  bellHeroesMedia: function(){
    BellCMS.Collections.modules.fetch({
      success: function(){
        var mediaLayout = new BellCMS.Layouts.MediaLayout();
        var bellHeroesModule = BellCMS.Collections.modules.findWhere({name: 'Bell Labs Heroes'});

        var bellHeroesUploadView = new BellCMS.Views.MediaUploadView({
          model: bellHeroesModule
        });

        var bellHeroesContentView = new BellCMS.Views.MediaContentView({
          model: bellHeroesModule
        });

        BellCMS.rootView.showChildView('contentContainer', mediaLayout);
        mediaLayout.showChildView('mediaUploadContainer', bellHeroesUploadView);
        mediaLayout.showChildView('mediaContentContainer', bellHeroesContentView);
      }
    });
  }
};
