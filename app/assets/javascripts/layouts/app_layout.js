BellCMS.Layouts.AppLayoutView = Marionette.LayoutView.extend({
  el: BellCMS.Container,

  template: 'app/layout',

  regions: {
    appNav: "#app-nav",
    contentContainer: "#content-container"
  },

  onBeforeShow:  function(){
    // sugar for layoutView.getRegion('menu').show(new MenuView());
    this.showChildView('appNav', new BellCMS.Views.AppNavView());
    // might want to show first tab view here by default
  }
});
