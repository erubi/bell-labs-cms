BellCMS.Layouts.ExteriorModulesLayout = Marionette.LayoutView.extend({
  template: 'exterior_modules/layout',

  regions: {
    modulesContainer: "#modules-ctr"
  },

  onBeforeShow: function(){
    this.showChildView('modulesContainer', new BellCMS.Views.ModuleCompositeView(
        {
          collection: BellCMS.Collections.modules.codeTypeSubset()
        }
    ));
  }

});
