BellCMS.Layouts.ExteriorModulesLayout = Marionette.LayoutView.extend({
  template: 'exterior_modules/layout',

  regions: {
    modulesContainer: "#modules-ctr",
    eventsContainer: "#events-ctr"
  },

  onBeforeShow: function(){
    this.showChildView('modulesContainer', new BellCMS.Views.ModuleLayoutView(
        {
          collection: BellCMS.Collections.modules
        }
    ));
  }

});
