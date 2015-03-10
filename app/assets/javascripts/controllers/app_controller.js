BellCMS.Controllers.AppController= {
  root: function(){
    // debugger
    // console.log("Root fn called!");
    // BellCMS.rootView.render();
  },

  exteriorModules: function(){
    BellCMS.rootView.showChildView('contentContainer', new BellCMS.Layouts.ExteriorModulesLayout());
  },

  presentationModes: function(){
  },

  media: function(){
  }
};
