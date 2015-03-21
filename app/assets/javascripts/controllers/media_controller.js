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

  nobelGhostsMedia: function(){

    BellCMS.Collections.modules.fetch({
      success: function(){
        var mediaLayout = new BellCMS.Layouts.MediaLayout();
        var nobelGhostsModule = BellCMS.Collections.modules.findWhere({name: 'nobel_ghosts'});

        var nobelGhostsUploadView = new BellCMS.Views.MediaUploadView({
          model: nobelGhostsModule
        });

        var nobelGhostsContentView = new BellCMS.Views.MediaContentView({
          model: nobelGhostsModule
        });

        BellCMS.rootView.showChildView('contentContainer', mediaLayout);
        mediaLayout.showChildView('mediaUploadContainer', nobelGhostsUploadView);
        mediaLayout.showChildView('mediaContentContainer', nobelGhostsContentView);
      }
    })

  },

  bellHeroesMedia: function(){
    var mediaLayout = new BellCMS.Layouts.MediaLayout();
    var bellHeroesModule = BellCMS.Collections.modules.findWhere({name: 'bell_labs_heroes'});

    var bellHeroesUploadView = new BellCMS.Views.MediaUploadView({
      model: bellHeroesModule
    });

    BellCMS.rootView.showChildView('contentContainer', mediaLayout);

    mediaLayout.showChildView('mediaUploadContainer', bellHeroesUploadView);
    // mediaLayout.showChildView('mediaContentContainer', );
  }


};
