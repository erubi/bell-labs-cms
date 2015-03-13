BellCMS.Layouts.ExteriorModulesLayout = Marionette.LayoutView.extend({
  template: 'exterior_modules/layout',

  regions: {
    modulesContainer: "#modules-ctr",
    eventsContainer: "#events-ctr"
  },

  onBeforeShow: function(){
    this.showChildView('modulesContainer', new BellCMS.Views.ModuleCompositeView(
        {
          collection: BellCMS.Collections.modules
        }
    ));
  }

});
