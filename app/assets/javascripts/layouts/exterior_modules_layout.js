BellCMS.Layouts.ExteriorModulesLayout = Marionette.LayoutView.extend({
  template: 'exterior_modules/layout',

  regions: {
    modulesContainer: "#modules-ctr",
    eventsContainer: "#events-ctr"
  },

  onBeforeShow: function(){
    var that = this;

    BellCMS.Models.configModel.fetch({
      success: function(){
        that.showChildView('modulesContainer', new BellCMS.Views.ModuleCompositeView(
            {
              collection: BellCMS.Collections.modules.codeTypeSubset(),
              model: BellCMS.Models.configModel
            }
        ));

        that.showChildView('eventsContainer', new BellCMS.Layouts.EventsLayout());

      }
    });


  }

});
