BellCMS.Controllers.AppController= {
  root: function(){
    // debugger
    // BellCMS.rootView.render();
  },

  exteriorModules: function(){
    BellCMS.rootView.showChildView('contentContainer', new BellCMS.Layouts.ExteriorModulesLayout());
  },

  presentationModes: function(){
  },

  media: function(){
  },

  tablet: function(){
    BellCMS.rootView.showChildView('contentContainer', new BellCMS.Layouts.TabletLayout());
  }
};
