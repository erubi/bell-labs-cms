BellCMS.Layouts.ExteriorModulesLayout = Marionette.LayoutView.extend({
  template: 'exterior_modules/layout',

  regions: {
    modulesContainer: "#modules-ctr",
    eventsContainer: "#events-ctr"
  },

  initialize: function(){
    this.appNavChannel = Backbone.Radio.channel('appNavChannel');
  },

  onBeforeShow: function(){
    var that = this;

    that.appNavChannel.command('updateActiveNav', 'exteriorModules');

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
