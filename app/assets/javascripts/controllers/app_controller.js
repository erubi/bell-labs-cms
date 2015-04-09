BellCMS.Controllers.AppController= {
  root: function(){
    BellCMS.rootView.showChildView('contentContainer', new BellCMS.Layouts.ExteriorModulesLayout());
  },

  exteriorModules: function(){
    BellCMS.rootView.showChildView('contentContainer', new BellCMS.Layouts.ExteriorModulesLayout());
  },

  tablet: function(){
    BellCMS.rootView.showChildView('appNav', new BellCMS.Views.TabletNavView());
    BellCMS.rootView.showChildView('contentContainer', new BellCMS.Layouts.TabletLayout());
  }
};
