BellCMS.Layouts.TabletLayout = Marionette.LayoutView.extend({
  template: 'tablet/layout',

  regions: {
    modulesContainer: "#modules-ctr",
    eventsContainer: "#events-ctr"
  },

  onBeforeShow: function(){
    this.showChildView('modulesContainer', new BellCMS.Views.TabletModuleCompositeView(
        {
          collection: BellCMS.Collections.modules
        }
    ));
  }

});
