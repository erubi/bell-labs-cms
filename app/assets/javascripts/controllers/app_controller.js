BellCMS.Controllers.AppController= {
  root: function(){
    // debugger
    // BellCMS.rootView.render();
  },

  exteriorModules: function(){
    BellCMS.rootView.showChildView('contentContainer', new BellCMS.Layouts.ExteriorModulesLayout());
  },

  announcements: function(){
    BellCMS.rootView.showChildView('contentContainer', new BellCMS.Layouts.EventsLayout());
  },

  presentationModes: function(){
  },

  media: function(){
    BellCMS.rootView.showChildView('contentContainer', new BellCMS.Layouts.MediaLayout());
  },

  tablet: function(){
    BellCMS.rootView.showChildView('contentContainer', new BellCMS.Layouts.TabletLayout());
  }
};
