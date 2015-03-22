BellCMS.Controllers.AppController= {
  root: function(){
  },

  exteriorModules: function(){
    BellCMS.rootView.showChildView('contentContainer', new BellCMS.Layouts.ExteriorModulesLayout());
  },

  media: function(){
    // var mediaLayout = BellCMS.Layouts.mediaLayout = BellCMS.Layouts.mediaLayout || new BellCMS.Layouts.MediaLayout();
    var mediaLayout = new BellCMS.Layouts.MediaLayout();
    BellCMS.rootView.showChildView('contentContainer', mediaLayout);
  },

  tablet: function(){
    BellCMS.rootView.showChildView('contentContainer', new BellCMS.Layouts.TabletLayout());
  }
};
